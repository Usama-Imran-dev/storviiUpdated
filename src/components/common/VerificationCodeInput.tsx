import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {create, PREDEF_RES} from 'react-native-pixel-perfect';

const perfectSize = create(PREDEF_RES.iphoneX.width);

interface VerificationCodeInputProps {
  onCodeFilled: (code: string) => void;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  onCodeFilled,
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < 5) {
      inputRefs[index + 1].focus();
    }

    if (newCode.every(digit => digit !== '')) {
      onCodeFilled(newCode.join(''));
    }
  };

  const inputRefs: TextInput[] = [];

  return (
    <>
      <Text style={styles.label}>Enter Verification Code</Text>
      <View style={styles.container}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            value={digit}
            onChangeText={text => handleCodeChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            ref={ref => {
              if (ref) inputRefs[index] = ref;
            }}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    fontSize: perfectSize(16),
    marginBottom: perfectSize(10),
    marginTop: perfectSize(50),
  },
  input: {
    width: perfectSize(40),
    height: perfectSize(50),
    borderWidth: 1,
    borderColor: '#FFDBA6',
    borderRadius: perfectSize(8),
    fontSize: perfectSize(24),
    textAlign: 'center',
    backgroundColor: '#FFDBA6',
  },
});

export default VerificationCodeInput;
