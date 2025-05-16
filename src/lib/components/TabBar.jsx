import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
 

export default function TabBar({ state, descriptors, navigation }) {
  const icons = {
    home: (props) => < Ionicons name="home-outline"  size={24} {...props}    />,
    config: (props) => <Ionicons name="settings-outline" size={24} {...props} />,
  };

  const tabOrder = ["home", "config"];

  return (
    <View style={styles.tabbar}>
      {tabOrder.map((routeName) => {
        const route = state.routes.find((r) => r.name === routeName);
        if (!route) return null;

        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;

        const isFocused = state.index === state.routes.findIndex((r) => r.name === routeName);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const IconComponent = icons[route.name];

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabbarItem}
            activeOpacity={0.7}
          >
            {IconComponent ? (
              <IconComponent color={isFocused ? '#007AFF' : '#8e8e93'} />
            ) : (
              <Text>❓</Text>
            )}
            <Text style={[styles.label, { color: isFocused ? '#007AFF' : '#8e8e93' }]}>
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 5,
    elevation: 10,
    borderRadius: 20,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  tabbarItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});
