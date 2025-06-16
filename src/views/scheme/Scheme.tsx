import React from 'react';
import {View, Image, Text, ActivityIndicator} from 'react-native';
import styles from './Style';
import {SchemeProps} from './utils';
import { useScheme } from './SchemeController';
import {Tab} from '../../lib/components/Tab'
import {
  Galery,
  Credit,
  Information,
  Interview,
} from '../../lib/components/Screens/index';

export default function Scheme({route}: SchemeProps) {
  const customer = route?.params?.Customer;
  const {activeTab, FullData, isLoading, handleTabChange} = useScheme(customer!);

  const renderContent = () => {
    if (isLoading || !FullData) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      );
    }

    switch (activeTab) {
      case 'info':
        return <Information customer={FullData} />;
      case 'galery':
        return <Galery customer={customer!} />;
      case 'credit':
        return <Credit customer={FullData} />;
      case 'interview':
        return <Interview customer={customer} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://mzfinan.dyndns.org' + customer?.perfil || '',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{customer?.nombres || 'Nombre'}</Text>
        <View style={{flexDirection:'row', gap:7}}>
        <Text style={styles.email}>{customer?.apm || 'Correo'}</Text>
        <Text style={styles.email}>{customer?.app|| 'Correo'}</Text>
        </View>
      </View>

      <View> 
      <Tab activeTab={activeTab} onTabChange={handleTabChange} customer={customer!} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.content}>{renderContent()}</View>
      </View>
    </View>
  );
}
