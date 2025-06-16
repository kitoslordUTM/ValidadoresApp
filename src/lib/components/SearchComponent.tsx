import * as Index from '../../index/index'
import { NameInput } from '../molecules'

const { View, Text, hp , wp , StyleSheet, Ionicons, useState } = Index

type SearchComponentProps = {
  onSearch: (text: string) => void;
};

export  function SearchComponent({ onSearch }: SearchComponentProps) {

    const [searchText, setSearchText] = useState('');

    const handleTextChange = (text: string) => {
      setSearchText(text);
      onSearch(text); // ejecuta la función que viene del padre
    };

  return (
    <View>
      <NameInput
        isSearch={true}
        value={searchText}
        onChangeText={handleTextChange}
        Icon={<Ionicons name="search" size={24} color="black" />}
        placeholder='Buscar por nombre o apellido'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('80%'),
    height: hp('6%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})