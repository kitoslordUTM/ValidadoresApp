import * as Index from '../../../index/index';
import {
  interviewProps,
  initialValues,
  casa,
  domicilio,
  dependientes,
  incomeData,
  INE,
  referencies,
  ObjectPicker,
  InitialValuesPicker
} from './utils';
import Checbox from './Checbox';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useImageUpload } from '../../../hooks/useImageUpload';
import { useSurvey2 } from '../../../hooks/useSurvey2';
import { Image, Modal } from 'react-native';
import { useEffect } from 'react';
import { Customer } from '../../../models/User';
import { NameInput } from '../../molecules';
import { useGetImageTypesQuery } from '../../../services/image';
import { useImageCreditByUserIdQuery } from '../../../services/image';
 


const { ScrollView, useState, StyleSheet, hp, View, Text, TouchableOpacity } = Index;


const EvidenceImageBlock = ({
  label,
  imageUri,
  onPreview,
  matched,
  onDelete,
  onSelectImage,
}: {
  label: string;
  imageUri: string;
  matched?: any;
  onPreview: () => void;
  onDelete: () => void;
  onSelectImage: () => void;
}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.imageButton} onPress={onSelectImage}>
        <Text style={styles.buttonText}>Seleccionar {label}</Text>
      </TouchableOpacity>
      {imageUri && (
        <View style={[styles.imagePreviewContainer]}>
          <TouchableOpacity onPress={onPreview}>
            <Image source={{uri: imageUri}} style={styles.imagePreview} />
          </TouchableOpacity>
          <TouchableOpacity onPress={matched ? onDelete : onSelectImage}>
            <Ionicons
              name={matched ? 'trash-outline' : 'camera-outline'}
              size={24}
              color={matched ? '#c00' : '#333'}
              style={{marginTop: 8}}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default function SecondInterview({ customer }: interviewProps) {

  // Older request Body
  const [request, setRequest] = useState(initialValues);

  // Picker states
  const [house, setHouse] = useState<ObjectPicker>(InitialValuesPicker);
  const [depend, setDepend] = useState<ObjectPicker>(InitialValuesPicker);
  const [domicile, setDomicile] = useState<ObjectPicker>(InitialValuesPicker);
  const [ine, setIne] = useState<ObjectPicker>(InitialValuesPicker);
  const [ref, setRef] = useState<ObjectPicker>(InitialValuesPicker);
  const [incomeVal, setIncomeVal] = useState<ObjectPicker>(InitialValuesPicker);
  const [additionalVal, setAdditionalVal] = useState<ObjectPicker>(InitialValuesPicker);
  

  // Values derived
  const [calif, setCalif] = useState<number>(0);
  const [calart, setCalart] = useState<number>(0);
  
  // Amounts
  const [monthIncome, setMonthIncome] = useState<number>(0);
  const [additionalMonthIncome, setAdditionalMonthIncome] = useState<number>(0);
  
  // State Control
  const [preview, setPreview] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);


  const { handleSolicitud } = useSurvey2();
  const { data: types } = useGetImageTypesQuery();
  const { data, refetch } = useImageCreditByUserIdQuery(customer?.id!);
  const credits = data?.data || [];
  const { addImage, modalDelete } = useImageUpload({ customer: customer!, refetch });

  // Calculate note and calif
  useEffect(() => {
    const { refri, lavadora, aire, television, horno, estereo } = request;
    const note = Math.round((refri + lavadora + aire + television + horno + estereo) / 2);
    setCalart(note);

    const sum =
      house.value +
      depend.value+
      domicile.value+
      ine.value +
      incomeVal.value +
      additionalVal.value +
      note +
      ref.value;
    setCalif(sum);
    console.log( house, sum)
  }, [request, house, depend, domicile, ine, incomeVal, additionalVal, ref]);

  const imageLinks = types
    ?.filter(i => i.id === 16 || i.id === 17)
    .map(i => {
      const m = credits.find(c => c.id_imagen === i.id);
      const uri = m ? `https://mzfinan.dyndns.org${m.urlImg}` : 'https://mzfinan.dyndns.org/UMmexico/unamed.jpg';
      return { url: uri, id: i.id };
    }) || [];
  const evid1 = imageLinks.find(i => i.id === 16);
  const evid2 = imageLinks.find(i => i.id === 17);

  const handlePost = () => {
    handleSolicitud({
      ...request,
      usuario: customer?.usuario || '',
      id: customer?.id || 0,
      cal_ap: calart,
      calif,
      ingreso_mensual: monthIncome,
      ing_mensual_adic: additionalMonthIncome,
      comp_ingreso_adic: additionalVal.id,
      antiguedad_ine: ine.id,
      calf_referencias: ref.id,
      comp_ingreso: incomeVal.id,
    });
    setIsVisible(false);
  };

  if (!customer) return null;

const correctedIncomeData = incomeData.map(obj => ({
  ...obj,
  value: Math.min(obj.value, 1),  
}));


  return (
    <ScrollView style={styles.container}>
      {/* Casa */}
      <Text style={styles.label}>Tipo de Casa</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={house} onValueChange={(H: ObjectPicker) => { setHouse(H); setRequest(prev => ({...prev, casa: H.id}));}}>
          {casa.map(o => <Picker.Item key={o.id} label={o.label} value={o}  style={{color:'black'}}/>)}
        </Picker>
      </View>

      {/* Dependientes */}
      <Text style={styles.label}>Dependientes</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={depend} onValueChange={(D: ObjectPicker) => { setDepend(D); setRequest(prev => ({...prev, depen: D.id}));}}>
          {dependientes.map(o => <Picker.Item key={o.id} label={o.label} value={o}  style={{color:'black'}}/>)}
        </Picker>
      </View>

      {/* Domicilio */}
      <Text style={styles.label}>Personas en el domicilio</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={domicile} onValueChange={(D: ObjectPicker) => { setDomicile(D); setRequest(prev => ({...prev, depen: D.id}));}}>
          {domicilio.map(o => <Picker.Item key={o.id} label={o.label} value={o} style={{color:'black'}} />)}
        </Picker>
      </View>

      {/* Checboxes */}
      <Checbox label="Refrigerador" handleAction={() => setRequest({ ...request, refri: 1 })} handleAction2={() => setRequest({ ...request, refri: 0 })} />
      <Checbox label="Comedor" handleAction={() => setRequest({ ...request, television: 1 })} handleAction2={() => setRequest({ ...request, television: 0 })} />
      <Checbox label="Horno" handleAction={() => setRequest({ ...request, horno: 1 })} handleAction2={() => setRequest({ ...request, horno: 0 })} />
      <Checbox label="Aire Acondicionado" handleAction={() => setRequest({ ...request, aire: 1 })} handleAction2={() => setRequest({ ...request, aire: 0 })} />
      <Checbox label="Lavadora" handleAction={() => setRequest({ ...request, lavadora: 1 })} handleAction2={() => setRequest({ ...request, lavadora: 0 })} />
      <Checbox label="Juego de sala" handleAction={() => setRequest({ ...request, estereo: 1 })} handleAction2={() => setRequest({ ...request, estereo: 0 })} />

      {/* Ingresos */}
      <Text style={styles.label}>Comprobante de ingresos</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={incomeVal}
          onValueChange={ (I: ObjectPicker) =>  { setIncomeVal(I) }}>
          {incomeData.map(o => <Picker.Item key={o.id} label={o.label} value={o}  style={{color:'black'}}/>)}
        </Picker>
      </View>

      {/* Evidencia 1 */}
      <EvidenceImageBlock
        label="Evidencia 1"
        imageUri={evid1?.url || ''}
        matched={credits.find(c => c.id_imagen === 16)}
        onPreview={() => setPreview(evid1?.url!)}
        onDelete={() => modalDelete(credits.find(c => c.id_imagen === 16)!.id_solicitud_credito, 16)}
        onSelectImage={() => launchImageLibrary({ mediaType: 'photo' }, r => r.assets?.[0] && addImage(r.assets[0], 16))}
      />

      {/* Ingreso mensual */}
      <Text style={styles.label}>Ingreso mensual</Text>
      <NameInput Type='numeric' value={monthIncome} onChangeNumber={v => setMonthIncome(v)} placeholder="Ingreso mensual" />

      {/* Ingresos adicionales */}
      <Text style={styles.label}>Ingresos adicionales</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={additionalVal}
          onValueChange={(IA:ObjectPicker) => {
             setAdditionalVal(IA)
       }}>
          {correctedIncomeData.map(o => <Picker.Item key={o.id} label={o.label} value={o}  style={{color:'black'}}/>)}
        </Picker>
      </View>

      {/* Evidencia 2 */}
      <EvidenceImageBlock
        label="Evidencia 2"
        imageUri={evid2?.url || ''}
        matched={credits.find(c => c.id_imagen === 17)}
        onPreview={() => setPreview(evid2?.url!)}
        onDelete={() => modalDelete(credits.find(c => c.id_imagen === 17)!.id_solicitud_credito, 17)}
        onSelectImage={() => launchImageLibrary({ mediaType: 'photo' }, r => r.assets?.[0] && addImage(r.assets[0], 17))}
      />

      <Text style={styles.label}>Ingreso mensual adicional</Text>
      <NameInput Type='numeric' value={additionalMonthIncome} onChangeNumber={v => setAdditionalMonthIncome(v)} placeholder="Ingreso mensual" />

      {/* Antiguedad INE */}
      <Text style={styles.label}>Antigüedad de INE</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={ine}
          onValueChange={ (IN: ObjectPicker) => { setIne(IN);}}>
          {INE.map(o => <Picker.Item key={o.id} label={o.label} value={o} style={{color:'black'}} />)}
        </Picker>
      </View>

      {/* Referencias */}
      <Text style={styles.label}>Referencias</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={ref}
          onValueChange={(R:ObjectPicker) => {setRef(R)}}>
          {referencies.map(o => <Picker.Item key={o.id} label={o.label} value={o}  style={{color:'black'}}/>)}
        </Picker>
      </View>

      {/* Calificación final */}
      <View style={styles.califBox}>
        <Text style={styles.label}>Calificación final:</Text>
        <Text style={styles.califText}>{calif}</Text>
      </View>

      {/* Publicar encuesta */}
      <TouchableOpacity style={styles.publishButton} onPress={() => setIsVisible(true)}>
        <Text style={styles.publishText}>Publicar encuesta</Text>
      </TouchableOpacity>

      {/* Modal confirmar */}
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

      {/* Modal preview */}
      <Modal visible={!!preview} transparent>
        <>
          <ImageViewer imageUrls={imageLinks} index={imageLinks.findIndex(i => i.url === preview)} enableSwipeDown onSwipeDown={() => setPreview(null)} />
          <TouchableOpacity onPress={() => setPreview(null)} style={styles.closeBtn}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 20 },
  label: { fontSize: 16, color: '#111827', marginVertical: 8 },
  pickerWrapper: { borderWidth: 1, borderColor: '#FB923C', borderRadius: 20, marginBottom: 12 },
  califBox: { marginVertical: 20, padding: 17, backgroundColor: '#FFF7ED', borderRadius: 20, alignItems: 'center', borderColor: '#FB923C', borderWidth: 1 },
  califText: { fontSize: 20, color: '#FB923C', fontWeight: 'bold' },
  publishButton: { backgroundColor: '#FB923C', padding: 17, borderRadius: 20, alignItems: 'center', marginVertical: 30, marginBottom: hp('30%') },
  publishText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalBackground: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)', padding: 30 },
  modalContainer: { backgroundColor: '#fff', padding: 25, borderRadius: 20, alignItems: 'center' },
  modalTitle: { fontSize: 16, marginBottom: 20, textAlign: 'center', color: '#111827' },
  modalButtons: { flexDirection: 'row', gap: 20, marginTop: 10 },
  cancelButton: { backgroundColor: 'gray', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  confirmButton: { backgroundColor: '#FB923C', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  buttonText: { color: 'white', fontWeight: '600' },
  imageButton: { backgroundColor: '#FB923C', padding: 10, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  imagePreviewContainer: { alignItems: 'center', marginBottom: 20 },
  imagePreview: { width: 200, height: 200, borderRadius: 10, borderWidth: 1, borderColor: '#ccc' },
  closeBtn: { position: 'absolute', top: 40, right: 20, zIndex: 10 },
});
