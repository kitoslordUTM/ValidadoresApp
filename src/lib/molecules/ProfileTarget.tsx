import {Customer} from '../../models/User';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import * as Index from '../../index/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';
import { Principal } from '../../style/principal';

const {View, StyleSheet, wp, hp, Text, TouchableOpacity,React } = Index;

type ProfileTargetProps = {
  Customer: Customer;

};

type RootStackParamList = {
  Scheme: { Customer: Customer };
};

export default function ProfileTarget({Customer}: ProfileTargetProps) {
 
  // Definición de la navegación y parametros
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Scheme'>>();
 

  const handlePress = () =>{
    navigation.navigate('Scheme', { Customer }); // pasa props como parámetro
  }

  const formatedDate = new Date(Customer.f_update!).toLocaleDateString('en-US', {
       year: 'numeric',
       month: '2-digit',
       day: '2-digit'
     });

  return (
    <View style={styles.container}>
      {/* Foto de perfil */}
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={{
            uri:  'https://mzfinan.dyndns.org' + Customer.perfil || 'https://www.gravatar.com/avatar/'
          }}
          style={styles.avatar}
        />

        <View style={{display: 'flex', flexDirection: 'column', marginLeft: wp('2%')}}>
            <Text style={styles.name}>{Customer.nombres}</Text>
            <Text style={styles.name}>{Customer.app}</Text>
        </View>
        
      </View>

      {/* Información */}
      <View style={styles.infoContainer}>
      
        <Text style={Principal.paragraph}>{Customer.estatus}</Text>
        <Text style={Principal.paragraph}>{formatedDate}</Text>
        <Text style={Principal.paragraph}>{Customer.grupo}</Text>
      </View>

      {/* Monto y botón */}
      <View style={styles.footer}>
        <View>
          <Text style={Principal.subtitle}>
            ${Customer.credito?.toLocaleString()}
          </Text>
        </View>

        <TouchableOpacity style={styles.circleButton}  onPress={handlePress}>
            <Ionicons name="chevron-forward-outline" size={wp('5%')} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('45%'),
    padding: wp('4%'),
    backgroundColor: '#fefefe',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: {
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('8%'),
    alignSelf: 'center',
    marginBottom: hp('1%'),
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: hp('1.5%'),
  },
  name: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#333',
  },
  subtext: {
    fontSize: wp('3.2%'),
    color: '#777',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#000',
  },
  footerText: {
    fontSize: wp('3%'),
    color: '#999',
  },
  circleButton: {
  width: wp('12%'),
  height: wp('12%'),
  borderRadius: wp('7%'), // hace que sea perfectamente circular
  backgroundColor: '#e46d29', // color de fondo claro
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 3, // para sombra (Android)
  shadowColor: '#000', // para sombra (iOS)
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
},

});
