import { useSurvey2Mutation } from '../services/clients';
import {useCallback} from 'react';
import {SurveyRequest2} from '../services/utils';
import Toast from 'react-native-toast-message';

export const useSurvey2 = () => {
  const [survey, {isLoading, isError}] = useSurvey2Mutation();

  const handleSolicitud = useCallback(async (params: SurveyRequest2) => {
    try {

      const response = await survey(params).unwrap();

      Toast.show({
              type: 'success',
              text1: 'Registrado',
              text2: 'se ha registrado correctamente',
            });

            

      return response

    } catch (err) {
       
      Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Error al registrar encuesta',
            });
      
      console.log(err)
      console.log ( params)

      throw err;
    }
  }, []);

  return {
    handleSolicitud,
    isLoading,
    isError,
  };
};
