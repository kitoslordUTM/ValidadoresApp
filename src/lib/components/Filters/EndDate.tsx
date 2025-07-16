import * as Index from '../../../index/index' 
import DatePicker from 'react-native-date-picker'
import {useDispatch } from 'react-redux';
import {RootState} from '../../../store/store';
import {useSelector} from 'react-redux';
import { Principal } from '../../../style/principal';
import {setStartDate, setCategory, setEndDate, setStatus } from '../../../slices/filterSlice';
const { TouchableOpacity, Text, ScrollView, StyleSheet, View, hp, wp , useState, Ionicons} = Index

export function EndDate() {

   const [modalVisible, setModalVisible] = useState(false);
   const [date, setDate] = useState(new Date())
   const endDate = useSelector(
      (state: RootState) => (state.Filter as any).endDate,
    );
   const selected = endDate !== new Date().toLocaleDateString()
   const dispatch = useDispatch();

  

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
               
                dispatch(setEndDate(selectedDate.toLocaleDateString()));
              }}  
              onCancel={() => {
               setModalVisible(false); 
               setDate(new Date())
               const date = new Date()
               dispatch(setEndDate(date.toLocaleDateString()));
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
    backgroundColor: selected ? '#e46d29' : 'white',
       width:'100%'

    }}>
      {selected ? ( <Text style={Principal.targetTex}> { date.toLocaleDateString()}</Text>): (<Text style={Principal.paragraph}> Fecha final </Text>)}
    </TouchableOpacity>

    </>
  )
}

