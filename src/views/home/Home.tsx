import * as Index from '../../index/index';
import ProfileTarget from '../../lib/molecules/ProfileTarget';
import { SearchComponent, FilterBar } from '../../lib/components';
import {
  StartDate,
  EndDate,
  Status,
  Category,
  All,
} from '../../lib/components/Filters/index';
import Style from './Style';
import { Principal } from '../../style/principal';
import { useHomeController } from './homeController';

const {
  View,
  Text,
  ScrollView,
  Ionicons,
  TouchableOpacity,
  wp,
  hp,
  ActivityIndicator,
} = Index;

export default function Home() {
  const { filteredDataSource, searchFilterFunction, isLoading } = useHomeController();
  const [showFilters, setShowFilters] = Index.useState(false);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      
      {/* ENCABEZADO */}
      <View
        style={{
          paddingTop: hp(2),
          paddingBottom: hp(2),
          backgroundColor: '#fff',
          zIndex: 2,
        }}
      >
        <View style={Style.header}>
          <Text style={Principal.tittle}>Solicitud de crédito</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
            alignContent: 'center',
            marginLeft: wp(5),
          }}
        >
          <SearchComponent onSearch={searchFilterFunction} />
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
            <Ionicons
              name={showFilters ? 'funnel-outline' : 'funnel'}
              size={24}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* SIDEBAR DE FILTROS */}
      {showFilters && (
        <View
          style={{
            position: 'absolute',
            top:hp(6),
            left: 0,
            width: '80%',
            height: '100%',
            backgroundColor: '#fff',
          borderColor: '#ccc',
            zIndex: 999,
            elevation: 10,
            borderTopRightRadius:10,
            paddingVertical:5
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Filtros</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <FilterBar
            filter={[<All />, <StartDate />, <EndDate />, <Status />, <Category />]}
          />
        </View>
      )}

      {/* LISTA DE TARJETAS */}
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 10,
          paddingBottom: hp(20),
          paddingTop: hp(2),
          zIndex: 1, // para que esté detrás del sidebar
        }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              marginTop: hp(10),
            }}
          >
            <ActivityIndicator size="large" color="orange" />
          </View>
        ) : (
          filteredDataSource.map((customer, index) => (
            <ProfileTarget key={index} Customer={customer} />
          ))
        )}
      </ScrollView>
    </View>
  );
}
