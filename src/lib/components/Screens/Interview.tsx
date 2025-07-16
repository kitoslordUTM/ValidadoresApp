import {
  interviewProps,
  initialValues,
  casa,
  domicilio,
  dependientes,
} from './utils';
import * as Index from '../../../index/index';
import {useSurvey} from '../../../hooks/useSurvey';
import {Picker} from '@react-native-picker/picker';
import {Principal} from '../../../style/principal';
import Checbox from './Checbox';
import {useEffect, useState} from 'react';

const {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  hp
} = Index;

export function Interview({customer}: interviewProps) {
  const [request, setRequest] = useState(initialValues);
  const [selectedHouse, setSelectedHouse] = useState(0);
  const [selectedDomicilary, setSelectedDomicilary] = useState(3);
  const [selectedDependts, setSelectedDependts] = useState(3);
  const [calart, setCalart] = useState(0);
  const [calif, setCalif] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const {handleSolicitud, isLoading} = useSurvey();

  const handlePost = () => {
    const payload = {
      ...request,
      usuario: customer?.usuario || '',
      id: customer?.id || 0,
      cal_ap: calart,
      calif: calif,
    };
    handleSolicitud(payload);
    setIsVisible(false); // cerrar modal tras publicar
  };

  
  useEffect(() => {
    const {refri, lavadora, aire, television, horno, estereo} = request;

    const note = Math.round(
      (refri + lavadora + aire + television + horno + estereo) / 2,
    );

    setCalart(note);

    const finalNote =
      selectedDependts + selectedDomicilary + selectedHouse + note;

    setCalif(finalNote);
  }, [request, selectedDependts, selectedDomicilary, selectedHouse]);

  return (
    <ScrollView style={styles.container}>
    
      <Text style={styles.label}>Tipo de Casa</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedHouse}
          onValueChange={itemValue => setSelectedHouse(itemValue)}
          style={styles.picker}>
          {casa.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value}  style={{color:'black'}} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Dependientes</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedDependts}
          onValueChange={itemValue => setSelectedDependts(itemValue)}
          style={styles.picker}>
          {dependientes.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} style={{color:'black'}} />
          ))}
        </Picker>
      </View>

      <Checbox label="Refrigerador" handleAction={() => setRequest({...request, refri: 1})} handleAction2={() => setRequest({...request, refri: 0})} />
      <Checbox label="Televisión" handleAction={() => setRequest({...request, television: 1})} handleAction2={() => setRequest({...request, television: 0})} />
      <Checbox label="Horno" handleAction={() => setRequest({...request, horno: 1})} handleAction2={() => setRequest({...request, horno: 0})} />
      <Checbox label="Aire Acondicionado" handleAction={() => setRequest({...request, aire: 1})} handleAction2={() => setRequest({...request, aire: 0})} />
      <Checbox label="Lavadora" handleAction={() => setRequest({...request, lavadora: 1})} handleAction2={() => setRequest({...request, lavadora: 0})} />
      <Checbox label="Estéreo" handleAction={() => setRequest({...request, estereo: 1})} handleAction2={() => setRequest({...request, estereo: 0})} />

      <Text style={styles.label}>Personas en el domicilio</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedDomicilary}
          onValueChange={itemValue => setSelectedDomicilary(itemValue)}
          style={styles.picker}>
          {domicilio.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value}  style={{color:'black'}} />
          ))}
        </Picker>
      </View>

      <View style={styles.califBox}>
        <Text style={styles.label}>Calificación final:</Text>
        <Text style={styles.califText}>{calif}</Text>
      </View>

      <TouchableOpacity style={styles.publishButton} onPress={() => setIsVisible(true)}>
        <Text style={styles.publishText}>Publicar encuesta</Text>
      </TouchableOpacity>

      <Modal visible={isVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>¿Seguro que deseas publicar esta encuesta?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handlePost}>
                <Text style={styles.buttonText}>Publicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FB923C',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#111827',
    marginVertical: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#FB923C',
    borderRadius: 20,
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  califBox: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#FFF7ED',
    borderRadius: 20,
    alignItems: 'center',
    borderColor: '#FB923C',
    borderWidth: 1,
  },
  califText: {
    fontSize: 20,
    color: '#FB923C',
    fontWeight: 'bold',
  },
  publishButton: {
    backgroundColor: '#FB923C',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 30,
    marginBottom: hp('30%')
  },
  publishText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 30,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#111827',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  confirmButton: {
    backgroundColor: '#FB923C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
