import * as Index from '../../index/index';
import ProfileTarget from '../../lib/molecules/ProfileTarget';
import {SearchComponent, FilterBar} from '../../lib/components';
import {
  StartDate,
  EndDate,
  Status,
  Category,
  All,
} from '../../lib/components/Filters/index';
import Style from './Style';
import {Principal} from '../../style/principal';
import {useHomeController} from './homeController';

const {View, Text, ScrollView, Ionicons, TouchableOpacity, wp, hp, ActivityIndicator} = Index;

export default function Home() {
  const {filteredDataSource, searchFilterFunction, isLoading} = useHomeController();
  const [showFilters, setShowFilters] = Index.useState(false);

  return (
    <View style={{flex: 1}}>
      {/* ENCABEZADO FIJO */}
      <View style={{paddingTop: hp(2), paddingBottom: hp(2), backgroundColor: '#fff'}}>
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

        {showFilters && (
          <FilterBar
            filter={[<All />, <StartDate />, <EndDate />, <Status />, <Category />]}
          />
        )}
      </View>

      {/* SCROLL SOLO PARA TARJETAS */}
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 10,
          paddingBottom: hp(20),
          paddingTop: hp(2),
        }}
        showsVerticalScrollIndicator={false}
      >


       { isLoading? (
       
       <View  style={{alignContent: 'center' ,  alignItems:'center',  flex: 1 , justifyContent:'center'
       }}  > 
        <ActivityIndicator  size={'large'} color={'orange'} />
      </View>
      
      ) : (filteredDataSource.map((customer, index) => (
          <ProfileTarget key={index} Customer={customer} />
        ))
  )}


      </ScrollView>
    </View>
  );
}
