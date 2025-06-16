// views/home/Home.tsx
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

const {View, Text, ScrollView, Ionicons, TouchableOpacity, wp} = Index;

export default function Home() {
  const {filteredDataSource, searchFilterFunction} = useHomeController();
  const [showFilters, setShowFilters] = Index.useState(false);

  return (
    <View >
      <View style={Style.header}>
        <Text style={Principal.tittle}>Solicitud de crédito</Text>
      </View>

      <View style={{flexDirection:'row', gap:15, alignItems:'center', alignContent:'center',  marginLeft:wp(5)}}>
        <SearchComponent onSearch={searchFilterFunction} />
        {showFilters !== true ? (
          <TouchableOpacity onPress={() => setShowFilters(true)}>
        
            <Ionicons name="funnel" size={24}/>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            
            <Ionicons size={24} name="funnel-outline" />
          </TouchableOpacity>
        )}
      </View>
      {showFilters === true ? (
        <FilterBar
          filter={[
            <All />,
            <StartDate />,
            <EndDate />,
            <Status />,
            <Category />,
          ]}
        />
      ) : null}

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'center',
          justifyContent: 'center',
          gap: 10,
        }}>
        {filteredDataSource.map((customer, index) => (
          <ProfileTarget key={index} Customer={customer} />
        ))}
      </View>
    </View>
  );
}
