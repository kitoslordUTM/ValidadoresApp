import React from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import styles from '../../views/scheme/Style';
import { Customer } from '../../models/User';

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  customer: Customer
};

const tabs = [
  {label: 'Información', key: 'info'},
  {label: 'Galería', key: 'galery'},
  {label: 'Crédito', key: 'credit'},
  {label: 'Entrevista', key: 'interview'},
];

export function Tab({activeTab, onTabChange, customer}: Props) {

  const tabsSlice = customer.estatus === 'Cita Agendada'? tabs : tabs.slice(0,3)

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
     
      contentContainerStyle={styles.tabContainer}>
      {tabsSlice.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tabButton, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabChange(tab.key)}>
          <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
