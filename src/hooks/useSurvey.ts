import {useSurveyMutation} from '../services/clients';
import {useCallback} from 'react';
import {SurveyRequest} from '../services/utils';
import Toast from 'react-native-toast-message';

export const useSurvey = () => {
  const [survey, {isLoading, isError}] = useSurveyMutation();

  const handleSolicitud = useCallback(async (params: SurveyRequest) => {
    try {

      const response = await survey(params).unwrap();

      Toast.show({
              type: 'success',
              text1: 'Registrado',
              text2: 'se ha registrado correctamente',
            });

            console.log ( params)

      return response

    } catch (err) {
       
      Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Error al registrar encuesta',
            });

      throw err;
    }
  }, []);

  return {
    handleSolicitud,
    isLoading,
    isError,
  };
};
