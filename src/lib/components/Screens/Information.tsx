import {informationProps} from './utils';
import * as Index from '../../../index/index';

const {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} = Index;

export function Information({customer, isLoading}: informationProps) {
  if (!customer) {
    return (
      <View style={{padding: 20}}>
        <Text>Cargando información del cliente...</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Género</Text>
        <Text style={styles.link}>{customer?.sexo}</Text>

        <Text style={styles.label}>Edo. Civil</Text>
        <Text style={styles.link}>{customer?.edocivil || 'No aplica'}</Text>

        <Text style={styles.label}>Nombre del conyugue</Text>
        <Text style={styles.link}>
          {customer?.nombre_conyuge || 'No aplica'}
        </Text>

        <Text style={styles.label}> Telefono</Text>
        <Text style={styles.link}>
          {customer?.telefono || '(123) 456-7890'}
        </Text>

        <Text style={styles.label}>Fecha de naciemiento</Text>
        <Text style={styles.link}>
          {customer?.fn || 'Dato no proporcionado'}
        </Text>

        <Text style={styles.label}>CURP</Text>
        <Text style={styles.link}>
          {customer?.curp || 'Dato no proporcionado'}
        </Text>

        <Text style={styles.label}>Codigo INE</Text>
        <Text style={styles.link}>
          {customer?.numero_ine || 'Dato no proporcionado'}
        </Text>

        <Text style={styles.label}>Numero de seguro Social</Text>
        <Text style={styles.link}>
          {customer?.nsocial || 'Dato no proporcionado'}
        </Text>

        <Text style={styles.label}>Codigo Postal</Text>
        <Text style={styles.link}>
          {customer?.cp || 'Dato no proporcionado'}
        </Text>

        <Text style={styles.label}>Estado</Text>
        <Text style={styles.link}>
          {customer?.estado || 'Dato no proporcionado'}
        </Text>

        <Text style={styles.label}>Municipio</Text>
        <Text style={styles.link}>
          {customer?.municipio || 'Dato no proporcionado'}
        </Text>

        <Text style={styles.label}>Colonia </Text>
        <Text style={styles.link}>
          {customer?.colonia || 'Dato no proporcionado'}
        </Text>

        <Text style={styles.label}>Direccion</Text>
        <Text style={styles.link}>
          {customer?.direccion || 'Dato no proporcionado'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    paddingBottom: 200,
  },
  infoContainer: {
    width: '95%',
 
    borderRadius: 12,
    padding: 20,
    alignSelf: 'center',
   
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9CA3AF', // gris sutil
    marginTop: 16,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  link: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827', // casi negro para mejor contraste
    
    paddingVertical: 8,
    paddingHorizontal: 12,
     textTransform: 'uppercase',
    borderRadius: 8,
  },
  
});
