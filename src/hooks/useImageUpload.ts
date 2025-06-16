import {useState} from 'react';
import {Alert} from 'react-native';
import {useUploadImageMutation} from '../services/image';
import { useDeleteImageMutation } from '../services/image';
import {Asset} from 'react-native-image-picker';
import {Customer} from '../models/User';
import Toast from 'react-native-toast-message';

type useImageProps = {
  customer: Customer;
  refetch: () => void;
};

export const useImageUpload = ({customer, refetch}: useImageProps) => {
  const [selectedImages, setSelectedImages] = useState<{[key: number]: Asset}>(
    {},
  );
  const [uploadImage] = useUploadImageMutation();
  const[deleteImage]= useDeleteImageMutation()


  const addImage = (image: Asset, id_imagen: number) => {
    Alert.alert(
      '¿Deseas subir esta imagen?',
      '',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Subir',
          onPress: () => {
            setSelectedImages(prev => ({...prev, [id_imagen]: image}));
            handleUpload(image, id_imagen);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleUpload = async (image: Asset, id_imagen: number) => {
    const formData = new FormData();
    formData.append('id', customer.id!.toString());
    formData.append('id_imagen', id_imagen.toString());
    formData.append('imagen', {
      uri: image.uri!,
      name: image.fileName || 'image.jpg',
      type: image.type || 'image/jpeg',
    } as any);

    try {
       await uploadImage(formData).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Registrado',
        text2: `registrado correctamente`,
      })

      refetch();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error al subir imagen',
      });
    }
  };

  const imageDelete = async (id: number, id_imagen: number) => {
    try {

      const res = await deleteImage({id, id_imagen})

      Toast.show({
        type: 'success',
        text1: 'Borrado',
        text2: `Borrado correctamente`,
      })

     refetch();
      
    } catch (error) {
       Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error al borrar imagen',
      });
      
    }
  }



  return {selectedImages, addImage, imageDelete};
};
