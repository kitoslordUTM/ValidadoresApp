import React from 'react';
import * as Index from '../../index/index'
const { TextInput, View, StyleSheet, hp, wp, } = Index
import type { KeyboardTypeOptions } from 'react-native';


interface NameInputProps {
  value: string | number;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  Icon?: React.ReactNode;
  Type?: KeyboardTypeOptions; 
  onChangeNumber ?: ( number: number) => void
  max ?:number
  isSearch?: boolean
}

export const NameInput: React.FC<NameInputProps> = ({
  value,
  onChangeText,
  placeholder,
  Icon,
  Type,
  onChangeNumber,
  max,
  isSearch
}) => {
  const handleChange = (text: string) => {
    if (onChangeNumber && (Type === 'numeric' || Type === 'number-pad' || Type === 'decimal-pad')) {
      const parsed = parseFloat(text);
      if (!isNaN(parsed)) {
        onChangeNumber(parsed);
      } else {
        onChangeNumber(0); // o puedes ignorar si no es número
      }
    } else if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View style={{ 
    marginBottom: 12,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'gray',
    width: isSearch? wp('75%') : wp('80%'),
    borderRadius: 30,
    alignSelf: 'center',
   }}>
      <TextInput
        style={styles.input}
        value={String(value)}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={'black'}
        keyboardType={Type || 'default'}
        maxLength={max || 20}
      />
      {Icon && (
        <View style={{ position: 'absolute', right: wp(3), top: hp(1.6) }}>
          {Icon}
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
   
  
  input: {
    height: hp('7%'), // 70% of height device screen
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default NameInput;
