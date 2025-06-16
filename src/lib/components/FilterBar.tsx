import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native';

export function FilterBar({ filter }: { filter: React.ReactNode[] }) {
 
  return (
    <ScrollView
     
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      
    >
      {filter.map((child, index) => (
        <View key={index} style={styles.item}>
          {child}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
  content: {
    flexDirection: 'row',
    
  },
  item: { 
    paddingVertical: 10,
    borderRadius: 10,
  },
});
