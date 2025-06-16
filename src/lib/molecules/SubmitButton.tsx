import React from 'react';
import { GestureResponderEvent } from 'react-native';
import * as Index from '../../index/index'
const { TouchableOpacity, Text, StyleSheet, hp, wp} = Index


interface SubmitButtonProps {
  onPress: () => void;
  title?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF4500', 
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'gray',
    height: hp('7%'), // 70% of height device screen
    width: wp('80%'),
    justifyContent: 'center',

  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubmitButton;
