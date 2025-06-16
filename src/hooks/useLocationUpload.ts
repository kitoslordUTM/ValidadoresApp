import { Alert, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { usePutUbicationMutation } from '../services/image';
import Toast from 'react-native-toast-message';

export const useLocationUpload = () => {
  const [putUbication] = usePutUbicationMutation();

  const requestPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permiso de ubicación',
          message: 'La app necesita acceder a tu ubicación',
          buttonNeutral: 'Preguntar después',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  type GeoCoordinates = {
    latitude: number;
    longitude: number;
    altitude?: number | null;
    accuracy?: number | null;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
  };

  const getLocation = (): Promise<GeoCoordinates> =>
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position.coords),
        error => reject(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });

  const saveLocation = async (id: number, usuario: string) => {
    const granted = await requestPermission();
    if (!granted) return;

    try {
      const coords = await getLocation();
      
              await putUbication({
                id,
                usuario,
                latitud: String(coords.latitude),
                longitud: String(coords.longitude),
              }).unwrap();

               Toast.show({
                          type: 'success',
                          text1: 'Registrado',
                          text2: 'se ha registrado correctamente',
                        });
    } catch (error) {

        Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Error al registrar encuesta',
            });
       
    }
  };

  return { saveLocation };
};
