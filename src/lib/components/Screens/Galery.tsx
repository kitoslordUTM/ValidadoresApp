import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useImageUpload} from '../../../hooks/useImageUpload';
import {useLocationUpload} from '../../../hooks/useLocationUpload';
import {Customer} from '../../../models/User';
import {
  useGetImageTypesQuery,
  useImageCreditByUserIdQuery,
} from '../../../services/image';

import ImageViewer from 'react-native-image-zoom-viewer';

const {width} = Dimensions.get('window');
const SMALL_WIDTH = width * 0.37;
const LARGE_WIDTH = width * 0.5;
const IMAGE_HEIGHT = 200;

export const Galery = ({customer}: {customer: Customer}) => {
  const {data: types, isLoading, error} = useGetImageTypesQuery();
  const {
    data,
    isLoading: charging,
    refetch,
  } = useImageCreditByUserIdQuery(customer.id!);
  const {addImage, modalDelete} = useImageUpload({customer, refetch});
  const {saveLocation} = useLocationUpload();
  const [preview, setPreview] = useState<string | null>(null);

  if (isLoading)
    return (
      <ActivityIndicator style={styles.center} size="large" color="#FF4500" />
    );
  if (error)
    return <Text style={styles.center}>Error cargando tipos de imagen</Text>;

  const credits = data?.data || [];

  const imageLinks = types!.map(item => {
    const matched = credits.find(c => c.id_imagen === item.id);
    const uri = matched
  ? `https://mzfinan.dyndns.org${matched.urlImg}`
  : 'https://mzfinan.dyndns.org/UMmexico/unamed.jpg';

    return {url: uri};
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        onPress={() => saveLocation(customer.id!, customer.usuario!)}
        style={styles.locBtn}>
        <Text style={styles.locTxt}>Guardar ubicación</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        {types!.map((item, idx) => {
          const matched = credits.find(c => c.id_imagen === item.id);
          const uri = matched
            ? `https://mzfinan.dyndns.org${matched.urlImg}`
            : 'https://mzfinan.dyndns.org/UMmexico/unamed.jpg';

          const isEvenRow = Math.floor(idx / 2) % 2 === 0;
          const isLeft = idx % 2 === 0;
          let w = SMALL_WIDTH;
          if ((isEvenRow && !isLeft) || (!isEvenRow && isLeft)) w = LARGE_WIDTH;

          return (
            <View key={item.id} style={[styles.block, {width: w}]}>
              <TouchableOpacity
                onPress={() => matched && setPreview(uri)}
                activeOpacity={0.8}>
                <Image
                  source={{uri}}
                  style={[styles.image, {width: w, height: IMAGE_HEIGHT}]}
                />
              </TouchableOpacity>

              <View style={styles.card}>
                <Text style={styles.label}>{item.nombre}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() =>
                      matched
                        ? modalDelete(
                            matched.id_solicitud_credito,
                            matched.id_imagen,
                          )
                        : launchImageLibrary({mediaType: 'photo'}, resp => {
                            const asset = resp.assets?.[0];
                            asset && addImage(asset, item.id);
                          })
                    }>
                    <Ionicons
                      name={matched ? 'trash-outline' : 'camera-outline'}
                      size={20}
                      color={matched ? '#c00' : '#333'}
                      style={{marginHorizontal: 8}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* VISOR DE IMÁGENES */}
      <Modal visible={!!preview} transparent>
        <>
          <ImageViewer
            imageUrls={imageLinks}
            index={imageLinks.findIndex(img => img.url === preview)}
            enableSwipeDown
            onSwipeDown={() => setPreview(null)}
          />
          <TouchableOpacity
            onPress={() => setPreview(null)}
            style={styles.closeBtn}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </>
      </Modal>

      {charging && (
        <ActivityIndicator
          style={styles.centerOverlay}
          size="large"
          color="#FF4500"
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  center: {
    marginTop: 50,
    textAlign: 'center',
  },
  locBtn: {
    backgroundColor: '#e46d29',
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
  },
  locTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
  },
  block: {
    marginBottom: 12,
  },
  image: {
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: 4,
    elevation: 2,
  },
  label: {
    flex: 1,
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
  },
  closeBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#00000088',
    padding: 8,
    borderRadius: 20,
  },
  centerOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});
