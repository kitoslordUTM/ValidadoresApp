import {View} from 'react-native';
import {TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Principal} from '../../../style/principal';
import { useState } from 'react';

type ChecboxProps = {
  
  handleAction?: () => void;
  handleAction2?: ()=> void;
  label?: string;
};

export default function Checbox({
  handleAction2,
  handleAction,
  label,
}: ChecboxProps) {
  const [ isChecked, setIsChecked] = useState(false)



  return (
    <View style={{flexDirection: 'row', gap: 10, alignContent:'center', alignItems:'center'}}>
      { isChecked === true? (
         <TouchableOpacity onPress={()=>{ handleAction2?.(); setIsChecked(false) }} style={{padding: 10}}>
        <Ionicons
          name= 'checkbox-outline'
          size={24}
          color={'black'}
        />
      </TouchableOpacity>
      ):(
        <TouchableOpacity onPress={()=>{  handleAction?.(); setIsChecked(true) }} style={{padding: 10}}>
          <Ionicons
            name= 'square-outline'
            size={24}
            color={'black'}
          />
        </TouchableOpacity>
      )
      }
      <Text style={Principal.paragraph}>{label}</Text>
    </View>
  );
}
