import * as Index from '../../index/index';
import {NameInput, PasswordInput, SubmitButton} from '../../lib/molecules';
import {initialValues} from '../const/LoginConst';
import {useDispatch} from 'react-redux';
import {setIsActive} from '../../slices/LoginSlice';
import Styles from './Style';
import Toast from 'react-native-toast-message';
import {useSignInMutation} from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const {View, Text, useState, ActivityIndicator, Image } = Index;

export default function Login() {
  // statements
  const [signUp, {isLoading}] = useSignInMutation();
  const [credentials, setCredentials] = useState(initialValues);
  const dispatch = useDispatch();

  // functions
  const handleSubmit = async () => {
    try {
      const response = await signUp(credentials).unwrap();
  

      await AsyncStorage.setItem('TOKEN', response.token || 'token');
    

      //despues cambiar a nokmbre porque ahi ponen el usuario
     await AsyncStorage.setItem('USER', response.datos.usuario || '');
      await AsyncStorage.setItem('SUCURSAL', response.datos.sucursal_movil || '');
      await AsyncStorage.setItem('PERMISO', String(response.datos.permisos.app_movilidad || '0'));


      // Guardar el token en AsyncStorage
      dispatch(setIsActive(true));

      Toast.show({
        type: 'success',
        text1: 'Bienvenido',
        text2: 'Te haz logueado correctamente 👋',
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Credenciales incorrectas👋',
      });
    }
  };

  return (
    <LinearGradient
      colors={['#f9665a', '#ee4a12']}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}>
    <View style={Styles.logo}>
      <Image
        source={require('../../assets/lafin_logo.png')}
        style={{ marginTop:50 }}
      />
    </View>

      <View style={Styles.container}>
        <Text
          style={{
            fontSize: 30,
            marginBottom: 20,
            fontWeight: 600,
            alignSelf: 'center',
            marginTop: 20,
            color:'black'
          }}>
          Bienvenido
        </Text>

        <NameInput
          value={credentials.name}
          onChangeText={(text: string) =>
            setCredentials({...credentials, name: text})
          }
          placeholder="Ingrese su usuario"
        />
        <PasswordInput
          value={credentials.pwd}
          onChangeText={(text: string) =>
            setCredentials({...credentials, pwd: text})
          }
        />

        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <SubmitButton onPress={handleSubmit} title="Iniciar sesión" />
          )}
        </View>
        
      </View>
    </LinearGradient>
  );
}
