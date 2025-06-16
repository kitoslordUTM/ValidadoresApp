import * as Index from '../../../index/index'
import { useDispatch} from 'react-redux';
import { setCategory } from '../../../slices/filterSlice';
import { categoryList } from '../../../storage/categoryList';
import {RootState} from '../../../store/store';
import {useSelector} from 'react-redux';
import { Principal } from '../../../style/principal';

const { TouchableOpacity, Text, ScrollView, StyleSheet, View, hp, wp, Modal, useState} = Index

export  function Category() {
  const [modalVisible, setModalVisible] = useState(false);
   const category = useSelector(
        (state: RootState) => (state.Filter as any).category,
      );
  const selected = category !== 'Todos'
  const dispatch = useDispatch();
  const [label, setLabel] = useState('Tipo');

  const handleConfirm = (selectedCategory: string | number) => {
      setModalVisible(false);
      dispatch(setCategory(selectedCategory));
    };

  const handleCancel = () => {
      setModalVisible(false);
      dispatch(setCategory('Todos')); // Reset status to empty string or default value
    };

  return (
    <>
    
    <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible} // This should be controlled by state
          onRequestClose={() => {
            setModalVisible(false);
          }}
          presentationStyle="overFullScreen"
        >
          <View style={styles.filterItem}>
            <View style={{ width: '80%', backgroundColor: 'white', padding: 15, borderRadius: 25 , height: hp('40%'),   }}>
              <View style={{alignSelf:'center'}}> 
              <Text style={Principal.subtitle}>Selecciona una categoría </Text>
              </View>
              {/* Aquí puedes agregar botones o elementos para seleccionar el estatus */}
              <ScrollView style={{ maxHeight: '50%' }} 
                showsVerticalScrollIndicator={false}
              >
                {categoryList.map((status, index) => (
                  <TouchableOpacity onPress={()=> {handleConfirm( status.value) ; setLabel(status.label)    }} key={index} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}  >
                    <Text style={{alignSelf: 'center'}}>{status.label}</Text>
                  </TouchableOpacity>
                ))}
    
              </ScrollView>
    
              <TouchableOpacity onPress={ ()=>  handleCancel()  } style={{ marginTop: 60, borderBlockColor: '#e46d29', borderWidth: 1, padding: 10, borderRadius: 20, backgroundColor: '#e46d29', alignItems: 'center' , }}>
                <Text style={Principal.targetTex}>Cancelar</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </Modal>

   <TouchableOpacity onPress={()=> setModalVisible(true)} style={{ 
    marginLeft: wp('2%'),
    paddingHorizontal: hp('6%'),
    paddingVertical: wp('5%') ,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: selected ? '#e46d29' : 'white'
    }}>
      {selected ? (
        <Text style={Principal.targetTex}>{label}</Text>
      ) : (
        <Text style={Principal.paragraph}>Categoria</Text>
      )}
    </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
     filterItem: {
       flex: 1,
       justifyContent: "center",
       alignItems: "center",
       backgroundColor: "rgba(0, 0, 0, 0.5)", 
       // Fondo negro semi-transparente
  }
});