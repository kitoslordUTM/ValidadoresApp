import * as Index from '../../../index/index' 
import DatePicker from 'react-native-date-picker'
import {setStartDate } from '../../../slices/filterSlice';
import {useDispatch } from 'react-redux';
import {RootState} from '../../../store/store';
import {useSelector} from 'react-redux';
import { setSelectedStart } from '../../../slices/filterSlice';
import { Principal } from '../../../style/principal';

const { TouchableOpacity, Text, ScrollView, StyleSheet, View, hp, wp , useState, Ionicons} = Index

export function StartDate() {

   const [modalVisible, setModalVisible] = useState(false);
   const [date, setDate] = useState(new Date())
   const dispatch = useDispatch();
   const isSelected = useSelector(
      (state: RootState) => (state.Filter as any). selectedStart,
    );
  

  return (
    <>
            <DatePicker
              modal
              open={modalVisible}
              date={date}
              onConfirm={(selectedDate) => {
                setModalVisible(false);
                setDate(selectedDate);
                console.log('Fecha seleccionada:', selectedDate.toLocaleDateString());
                dispatch(setSelectedStart(true));
                dispatch(setStartDate(selectedDate.toLocaleDateString()));
              }}  
              onCancel={() => {
               setModalVisible(false); 
               dispatch(setSelectedStart(false));
               setDate(new Date())
               const date = new Date()
               dispatch(setStartDate(date.toLocaleDateString()));
              }}
              mode="date"
              locale="es"
              title="Selecciona una fecha"
              confirmText="Seleccionar"
              cancelText="Cancelar"
            />
      

    <TouchableOpacity onPress={() => setModalVisible(true)} 
    style={{

   marginLeft: wp('2%'),
    paddingHorizontal: hp('6%'),
    paddingVertical: wp('5%') ,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width:'100%',
     
    backgroundColor: isSelected === true ? '#e46d29' : 'white',
    
    }}>
      {isSelected === true ? ( <Text style= {Principal.targetTex}> { date.toLocaleDateString()}</Text>): (<Text style={Principal.paragraph}> Fecha de inicio </Text>)}
    </TouchableOpacity>

    </>
  )
}

 