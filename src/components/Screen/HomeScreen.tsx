import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {create, PREDEF_RES} from 'react-native-pixel-perfect';

const perfectSize = create(PREDEF_RES.iphoneX.width);

const HomeScreen = ({navigation}: {navigation: any}) => {
  const image = require('../../assets/1.png');

  const [fadeAnim] = useState(new Animated.Value(1));
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const quoteArray = [
    'Where every story is a bridge to another soul.',
    'Where every journey begins with a step towards discovery.',
    'Where every voice echoes through the hearts of others.',
    'Where every moment holds promise of a new adventure.',
    'Where every connection weaves a thread of understanding.',
  ];

  useEffect(() => {
    const fadeInOut = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % quoteArray.length);
      });
    };

    const intervalId = setInterval(fadeInOut, 5000);

    return () => clearInterval(intervalId);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={perfectSize(24)} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Storvii</Text>
        <TouchableOpacity>
          <Icon name="account-circle" size={perfectSize(24)} color="black" />
        </TouchableOpacity>
      </View>

      {/* Quote Display */}
      <View style={styles.quoteContainer}>
        <Animated.View style={[styles.slide, {opacity: fadeAnim}]}>
          <Text style={styles.quoteText}>{quoteArray[currentQuoteIndex]}</Text>
        </Animated.View>
      </View>

      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateRoom')}>
        <Icon name="add" size={perfectSize(30)} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E8D8',
  },
  header: {
    height: perfectSize(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: perfectSize(16),
  },
  headerTitle: {
    fontSize: perfectSize(20),
    color: 'black',
    fontWeight: 'bold',
  },
  quoteContainer: {
    marginVertical: perfectSize(50),
    marginHorizontal: perfectSize(20),
    height: perfectSize(150),
    width: '80%',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: perfectSize(32),
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  imageContainer: {
    paddingHorizontal: perfectSize(3),
  },
  image: {
    width: '100%',
    height: perfectSize(200),
    resizeMode: 'cover',
  },
  fab: {
    position: 'absolute',
    left: '50%',
    bottom: '2%',
    transform: [{translateX: perfectSize(-30)}],
    width: perfectSize(60),
    height: perfectSize(60),
    borderRadius: perfectSize(30),
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  tabBarLabel: {
    fontSize: perfectSize(20),
    color: 'black',
  },
  tabLabelContainer: {
    alignItems: 'center',
  },
  tabLabelText: {
    fontSize: perfectSize(20),
    fontFamily: 'outfit',
    fontWeight: 'bold',
  },
  tabLabelUnderline: {
    height: perfectSize(2),
    width: perfectSize(50),
    backgroundColor: 'black',
    marginTop: perfectSize(4),
  },
  tabBar: {
    backgroundColor: '#F5E8D8',
    borderTopWidth: 0,
    height: perfectSize(80),
  },
});

export default HomeScreen;
