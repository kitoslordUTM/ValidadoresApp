import { creditProps } from './utils';
import * as Index from '../../../index/index';

const { ScrollView, Text, View, StyleSheet } = Index;

export function Credit({ customer }: creditProps) {
  return (
    <ScrollView style={styles.container}  showsVerticalScrollIndicator={false}  >

      <View style={styles.card}>
        <Text style={styles.label}>Tipo Cliente</Text>
        <Text style={styles.value}>{customer?.tipo_cliente || ''}</Text>

        <Text style={styles.label}>Tipo de Moto</Text>
        <Text style={styles.value}>{customer?.tipo_moto2 || ''}</Text>
        

        <Text style={styles.label}>Motocicleta</Text>
        <Text style={styles.value}>
          {customer?.moto}
        </Text>

        <Text style={styles.label}>Plan de Financiamiento</Text>
        <Text style={styles.status}>
          {customer?.financiamiento || 'Pagos al día'}
        </Text>
        <Text style={styles.label}>Frecuencia de pago</Text>
        <Text style={styles.value}>
          {customer?.tipo|| 'Mensual'}
        </Text>
        <Text style={styles.label}>Precio</Text>
        <Text style={styles.value}>
          ${customer?.precio || '15,000.00'}
        </Text>
        <Text style={styles.label}>Plazo</Text>
        <Text style={styles.value}>
          {customer?.plazo || '12 meses'}
        </Text>
        <Text style={styles.label}>Enganche</Text> 
        <Text style={styles.value}>
          ${customer?.enganche || '2,500.00'}
        </Text>
        <Text style={styles.label}>¿Financiar 50% de enganche?</Text>
        <Text style={styles.value}>
          {customer?.financiamiento }
        </Text>
        <Text style={styles.label}>Monto del Residuo</Text>
        <Text style={styles.value}>
          ${customer?.recidual || '5,000.00'}
        </Text>




      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
   
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    paddingBottom: 300
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  status: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
  },
  container: {
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    paddingBottom: 400,
  },
});
