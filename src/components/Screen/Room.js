import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
} from 'react-native-webrtc';
import io from 'socket.io-client';
import 'react-native-get-random-values';
import InCallManager from 'react-native-incall-manager';
import {API} from '@env';

const configuration = {
  iceServers: [
    {urls: 'stun:stun.l.google.com:19302'},
    {urls: 'stun:stun1.l.google.com:19302'},
  ],
};

const Room = ({route, navigation}) => {
  const roomId = route?.params?.roomId || 'default-room';

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState(new Set());
  const [isConnecting, setIsConnecting] = useState(false);

  const socketRef = useRef();
  const peerConnectionsRef = useRef({});
  const localStreamRef = useRef();
  const remoteStreamsRef = useRef({});
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setup();
    return () => {
      mountedRef.current = false;
      cleanup();
    };
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Audio Recording Permission',
            message:
              'This app needs access to your microphone to enable voice chat',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error('Audio permission denied');
        }
        console.log('Audio permissions granted');
        return true;
      } catch (err) {
        console.error('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const initializeStream = async () => {
    try {
      const stream = await mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: false,
      });

      setAudioToSpeaker();

      localStreamRef.current = stream;
      const audioTrack = stream.getAudioTracks()[0];
      setIsMuted(!audioTrack.enabled);
      console.log('Local stream initialized');
    } catch (err) {
      console.error('Stream initialization error:', err);
      throw new Error('Failed to initialize audio stream');
    }
  };

  const setAudioToSpeaker = () => {
    if (Platform.OS === 'ios') {
      InCallManager.setForceSpeakerphoneOn(true);
    } else if (Platform.OS === 'android') {
      InCallManager.setSpeakerphoneOn(true);
    }
  };

  const initializeSocket = async () => {
    try {
      socketRef.current = io(API, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketRef.current.on('connect', () => {
        console.log('Connected to server');
        socketRef.current.emit('join-room', roomId, socketRef.current.id);
      });

      socketRef.current.on('connect_error', error => {
        console.error('Socket connection error:', error);
        Alert.alert('Connection Error', 'Failed to connect to server');
      });

      setupSocketListeners();
    } catch (err) {
      console.error('Socket initialization error:', err);
      throw new Error('Failed to connect to server');
    }
  };

  const setupSocketListeners = () => {
    socketRef.current.on('user-joined', async userId => {
      console.log('User joined:', userId);
      try {
        setConnectedUsers(prev => new Set([...prev, userId]));
        if (!isConnecting) {
          setIsConnecting(true);
          await createPeerConnection(userId, true);
          setIsConnecting(false);
        }
      } catch (err) {
        console.error('Error handling user join:', err);
        setIsConnecting(false);
      }
    });

    socketRef.current.on('user-left', userId => {
      console.log('User left:', userId);
      cleanupPeerConnection(userId);
    });

    socketRef.current.on('receive-message', message => {
      console.log('Received message:', message);
      setMessages(prev => {
        // Check if the message already exists in the array
        const messageExists = prev.some(
          msg =>
            msg.timestamp === message.timestamp &&
            msg.userId === message.userId,
        );

        // Only add the message if it doesn't already exist
        if (!messageExists) {
          return [...prev, message];
        }
        return prev;
      });
    });

    socketRef.current.on('offer', async data => {
      try {
        console.log('Received offer from:', data.userId);
        const pc = await createPeerConnection(data.userId, false);
        await pc.setRemoteDescription(
          new RTCSessionDescription(data.description),
        );
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socketRef.current.emit('answer', {
          targetId: data.userId,
          description: answer,
        });
      } catch (err) {
        console.error('Error handling offer:', err);
      }
    });

    socketRef.current.on('answer', async data => {
      try {
        console.log('Received answer from:', data.userId);
        const pc = peerConnectionsRef.current[data.userId];
        if (pc) {
          await pc.setRemoteDescription(
            new RTCSessionDescription(data.description),
          );
        }
      } catch (err) {
        console.error('Error handling answer:', err);
      }
    });

    socketRef.current.on('ice-candidate', async data => {
      try {
        const pc = peerConnectionsRef.current[data.userId];
        if (pc) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      } catch (err) {
        console.error('Error handling ICE candidate:', err);
      }
    });
  };

  const setup = async () => {
    try {
      const permissionGranted = await requestPermissions();
      if (!permissionGranted) {
        Alert.alert(
          'Permission Denied',
          'Microphone permission is required to use voice chat',
          [
            {
              text: 'OK',
              onPress: () => {
                // Optional: Navigate back or handle permission denial
                navigation.goBack(); // Assuming you have navigation prop
              },
            },
          ],
        );
        return;
      }

      if (mountedRef.current) {
        await initializeStream();
        await initializeSocket();
      }
    } catch (err) {
      console.error('Setup error:', err);
      Alert.alert('Error', 'Failed to initialize voice chat');
    }
  };

  const createPeerConnection = async (userId, isInitiator) => {
    try {
      if (peerConnectionsRef.current[userId]) {
        console.log('Peer connection already exists for:', userId);
        return peerConnectionsRef.current[userId];
      }

      console.log('Creating new peer connection for:', userId);
      const pc = new RTCPeerConnection(configuration);
      peerConnectionsRef.current[userId] = pc;

      pc.onicecandidate = ({candidate}) => {
        if (candidate && socketRef.current) {
          socketRef.current.emit('ice-candidate', {
            targetId: userId,
            candidate,
          });
        }
      };

      pc.onconnectionstatechange = () => {
        console.log(`Connection state for ${userId}:`, pc.connectionState);
      };

      pc.oniceconnectionstatechange = () => {
        console.log(
          `ICE connection state for ${userId}:`,
          pc.iceConnectionState,
        );
      };

      pc.ontrack = async event => {
        console.log('Received remote track');
        const remoteStream = event.streams[0];
        if (remoteStream) {
          setAudioToSpeaker();
          remoteStreamsRef.current[userId] = remoteStream;
          remoteStream.getAudioTracks().forEach(track => {
            track.enabled = true;
          });
        }
      };

      if (localStreamRef.current) {
        const audioTrack = localStreamRef.current.getAudioTracks()[0];
        if (audioTrack) {
          pc.addTrack(audioTrack, localStreamRef.current);
        }
      }

      if (isInitiator) {
        const offer = await pc.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: false,
        });
        await pc.setLocalDescription(offer);
        socketRef.current.emit('offer', {
          targetId: userId,
          description: offer,
        });
      }

      return pc;
    } catch (err) {
      console.error('Error in createPeerConnection:', err);
      delete peerConnectionsRef.current[userId];
      throw err;
    }
  };

  const cleanupPeerConnection = userId => {
    try {
      const pc = peerConnectionsRef.current[userId];
      if (pc) {
        pc.close();
        delete peerConnectionsRef.current[userId];
        delete remoteStreamsRef.current[userId];
      }
      setConnectedUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    } catch (err) {
      console.error('Error cleaning up peer connection:', err);
    }
  };

  const cleanup = () => {
    try {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
        localStreamRef.current = null;
      }

      Object.keys(peerConnectionsRef.current).forEach(cleanupPeerConnection);

      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }

      // Clean up InCallManager
      InCallManager.stop();
    } catch (err) {
      console.error('Cleanup error:', err);
    }
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);

        Object.values(peerConnectionsRef.current).forEach(pc => {
          pc.getSenders().forEach(sender => {
            if (sender.track && sender.track.kind === 'audio') {
              sender.track.enabled = audioTrack.enabled;
            }
          });
        });
      }
    }
  };

  const sendMessage = () => {
    if (messageInput.trim() && socketRef.current) {
      const message = {
        userId: socketRef.current.id,
        message: messageInput.trim(),
        timestamp: Date.now(),
      };

      // Add the message locally for the sender only
      setMessages(prev => [...prev, message]);

      // Emit the message to the server
      socketRef.current.emit('send-message', message);

      // Clear the input field
      setMessageInput('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.voiceControls}>
        <TouchableOpacity
          style={[styles.button, isMuted && styles.buttonMuted]}
          onPress={toggleMute}>
          <Text style={styles.buttonText}>{isMuted ? 'Unmute' : 'Mute'}</Text>
        </TouchableOpacity>
        <Text style={styles.connectedText}>
          Connected Users: {connectedUsers.size}
        </Text>
      </View>

      <FlatList
        style={styles.messageList}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageUser}>
              {item.userId === socketRef.current?.id ? 'You' : item.userId}:
            </Text>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageTimestamp}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageInput}
          onChangeText={setMessageInput}
          placeholder="Type a message..."
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  voiceControls: {
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonMuted: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  connectedText: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  messageList: {
    flex: 1,
    marginVertical: 10,
  },
  messageContainer: {
    padding: 12,
    backgroundColor: '#f8f8f8',
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  messageUser: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#007AFF',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    minWidth: 70,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Room;
