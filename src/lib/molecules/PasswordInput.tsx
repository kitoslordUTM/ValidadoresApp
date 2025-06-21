import React from 'react';
import * as Index from '../../index/index';
const {
  TextInput,
  View,
  StyleSheet,
  hp,
  wp,
  Ionicons,
  TouchableOpacity,
  useState,
} = Index;

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Ingrese su contraseña',
}) => {
  const [visible, setIsVisible] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholderTextColor={'black'}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={visible === true}
        returnKeyType="done"
      />

      {visible ? (
        <TouchableOpacity
          style={{position: 'absolute', top: hp(1), right: wp(9)}}
          onPress={() => setIsVisible(false)}>
          <Ionicons name="eye-outline" size={40} color={'#FF4500'} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{position: 'absolute', top: hp(1), right: wp(9)}}
          onPress={() => setIsVisible(true)}>
          <Ionicons name="eye-off-outline" size={40} color={'#FF4500'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 0.5,
    alignSelf: 'center',
    borderColor: 'gray',
    height: hp('7%'), // 70% of height device screen
    width: wp('80%'),
    padding: 10,
    borderRadius: 30,
    fontSize: 16,
    color: 'black'
  },
});

export default PasswordInput;
