import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native';

export function FilterBar({ filter }: { filter: React.ReactNode[] }) {
 
  return (
    <ScrollView
    style={{  backgroundColor:'white',  width:'100%' }}
      contentContainerStyle={styles.content}
      
    >
      {filter.map((child, index) => (
        <View key={index}  >
          {child}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
  content: {
    flexDirection: 'column',
    width:'100%',
   
    gap:5
  },

});
