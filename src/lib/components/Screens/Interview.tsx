import {
  interviewProps,
  initialValues,
  casa,
  domicilio,
  dependientes,
} from './utils';
import * as Index from '../../../index/index';
import {useSurvey} from '../../../hooks/useSurvey';
import {NameInput, SubmitButton} from '../../molecules';
import {Picker} from '@react-native-picker/picker';
import {Principal} from '../../../style/principal';
import Checbox from './Checbox';
import {useEffect} from 'react';

const {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  useState,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
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
  };

  useEffect(() => {
    console.log('Nuevo request:', request);

    const {refri, lavadora, aire, television, horno, estereo} = request;

    const note = Math.round(
      (refri + lavadora + aire + television + horno + estereo) / 2,
    );

    setCalart(note);

    const finalNote =
      selectedDependts + selectedDomicilary + selectedHouse + calart;

    setCalif(finalNote);

    console.log('calart:', calart);
    console.log('nota final :', calif);
  }, [request, selectedDependts, selectedDomicilary, selectedHouse]);

  return (
    <ScrollView>
      <Text style={styles.title}>Encuesta</Text>
      <View style={{flexDirection: 'column', gap: 10, paddingBottom: 200}}>
        <Text style={Principal.subtitle}> Casa: </Text>
        <View
          style={{borderColor: 'black', borderWidth: 0.5, borderRadius: 20}}>
          <Picker
            selectedValue={selectedHouse}
            onValueChange={itemValue => setSelectedHouse(itemValue)}
            style={{height: 50, width: '100%'}}>
            {casa.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>

        <Text style={Principal.subtitle}> Dependientes: </Text>
        <View
          style={{borderColor: 'black', borderWidth: 0.5, borderRadius: 20}}>
          <Picker
            selectedValue={selectedDependts}
            onValueChange={itemValue => setSelectedDependts(itemValue)}
            style={{height: 50, width: '100%'}}>
            {dependientes.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>

        <Checbox
          label="Refrigerador"
          handleAction={() => setRequest({...request, refri: 1})}
          handleAction2={() => setRequest({...request, refri: 0})}
        />

        <Checbox
          label="Television"
          handleAction={() => setRequest({...request, television: 1})}
          handleAction2={() => setRequest({...request, television: 0})}
        />

        <Checbox
          label="Horno"
          handleAction={() => setRequest({...request, horno: 1})}
          handleAction2={() => setRequest({...request, horno: 0})}
        />

        <Checbox
          label="Aire"
          handleAction={() => setRequest({...request, aire: 1})}
          handleAction2={() => setRequest({...request, aire: 0})}
        />

        <Checbox
          label="Lavadora"
          handleAction={() => setRequest({...request, lavadora: 1})}
          handleAction2={() => setRequest({...request, lavadora: 0})}
        />

        <Checbox
          label="Estereo"
          handleAction={() => setRequest({...request, estereo: 1})}
          handleAction2={() => setRequest({...request, estereo: 0})}
        />

        <Text style={Principal.subtitle}>
          {' '}
          Personas que viven en el mismo Domicilio:{' '}
        </Text>
        <View
          style={{borderColor: 'black', borderWidth: 0.5, borderRadius: 20}}>
          <Picker
            selectedValue={selectedDomicilary}
            onValueChange={itemValue => setSelectedDomicilary(itemValue)}
            style={{height: 50, width: '100%'}}>
            {domicilio.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>

          <View>
            <Text> calificacion: </Text>
            <Text> {calif} </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Text>Publicar encuesta</Text>
        </TouchableOpacity>

       {/* 
<Modal visible={isVisible} transparent={true}>
  <View>
    <Text>¿Seguro que deseas publicar esta encuesta?</Text>
    <TouchableOpacity onPress={() => setIsVisible(false)}>
      <Text>cancelar</Text>
    </TouchableOpacity>
    ...
  </View>
</Modal>
*/}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    padding: 26,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  question: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 14,
    color: '#111827',
    minHeight: 60,
    textAlignVertical: 'top',
  },
});
