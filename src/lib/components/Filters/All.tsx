import * as Index from '../../../index/index'
import {setStartDate, setCategory, setEndDate, setStatus , setSelectedStart} from '../../../slices/filterSlice';
import {useDispatch } from 'react-redux';
import {RootState} from '../../../store/store';
import {useSelector} from 'react-redux';


const { TouchableOpacity, Text, ScrollView, StyleSheet, View, hp, wp} = Index
 
export  function All() {

    const initialDate = useSelector(
      (state: RootState) => (state.Filter as any).startDate,
    );
    const endDate = useSelector(
      (state: RootState) => (state.Filter as any).endDate,
    );
    const category = useSelector(
      (state: RootState) => (state.Filter as any).category,
    );
    const status = useSelector(
      (state: RootState) => (state.Filter as any).status,
    );

    const date = new Date().toLocaleDateString()

 
   const dispatch = useDispatch();

   const handleReset = () => {
    dispatch(setEndDate(date))
    dispatch(setStartDate(date))
    dispatch(setCategory('Todos'))
    dispatch(setStatus('Todos'))
    dispatch(setSelectedStart(false))

   }

   const isAll = initialDate === date && endDate === date && category === 'Todos' && status === 'Todos'



  return (
    <TouchableOpacity 
    style=
    {{
    marginLeft: wp('2%'),
    paddingHorizontal: hp('6%'),
    paddingVertical: wp('5%') ,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: isAll? '#e46d29' : 'white'
  
  }}
    onPress={handleReset}>
        <Text style = { {color : isAll? 'white' : 'black', fontWeight: '500',
        fontSize: 15,   }   } >
            Todos
        </Text>
    </ TouchableOpacity>
  )
}

