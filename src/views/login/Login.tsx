import * as Index from '../../index/index';
import {NameInput, PasswordInput, SubmitButton} from '../../lib/molecules';
import {initialValues} from '../const/LoginConst';
import {useDispatch} from 'react-redux';
import {setIsActive} from '../../slices/LoginSlice';
import Styles from './Style';
import Toast from 'react-native-toast-message';
import {useSignInMutation} from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { ImageBackground } from 'react-native';
import {Dimensions} from 'react-native';
import { hp } from '../../index/index';

const windowHeight = Dimensions.get('window').height;
const {View, Text, useState, ActivityIndicator, Image} = Index;

export default function Login() {
  const [signUp, {isLoading}] = useSignInMutation();
  const [credentials, setCredentials] = useState(initialValues);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const response = await signUp(credentials).unwrap();

      await AsyncStorage.setItem('TOKEN', response.token || 'token');

      await AsyncStorage.setItem('USER', response.datos.usuario || '');
      await AsyncStorage.setItem(
        'SUCURSAL',
        response.datos.sucursal_movil || '',
      );
      await AsyncStorage.setItem(
        'PERMISO',
        String(response.datos.permisos.app_movilidad || '0'),
      );

      dispatch(setIsActive(true));

      Toast.show({
        type: 'success',
        text1: 'Bienvenido',
        text2: 'Te haz logueado correctamente 👋',
      });
    } catch (err) {
      let errorMessage = 'Ocurrió un error';
      if (
        err &&
        typeof err === 'object' &&
        'data' in err &&
        err.data &&
        typeof err.data === 'object' &&
        'message' in err.data
      ) {
        errorMessage = String((err as any).data.message);
      }
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    }
  };

 return (
  <View style={{flex: 1}}>
    <ImageBackground
      source={require('../../assets/migliori-marche-accessori-moto.jpg')}
      resizeMode="cover"
      style={{position: 'absolute', width: '100%', height: '100%'}}
    />

    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        minHeight: windowHeight,
        justifyContent: 'center',
        paddingVertical: 30,
      }}>
      <View style={Styles.wrapper}>
       
          <Image
            source={require('../../assets/lafin_logo.png')}
            resizeMode="contain"
            style={{width: 250, height: 250, alignSelf:'center', marginBottom:hp(6)}}
          />
       

        <View style={Styles.container}>
          <Text style={Styles.welcome}>Bienvenido</Text>

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

          <View style={{marginTop: 20}}>
            {isLoading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <SubmitButton onPress={handleSubmit} title="Iniciar sesión" />
            )}
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  </View>
);

 
}
