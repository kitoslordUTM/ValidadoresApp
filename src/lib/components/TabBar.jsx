import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
 

export function TabBar({ state, descriptors, navigation, onLogoutPress }) {
  const icons = {
    Inicio: (props) => <Ionicons name="home-outline" size={24} {...props} />,
    Salir: (props) => <Ionicons name="log-out" size={24} {...props} />,
  };

  const tabOrder = ['Inicio', 'Salir'];

  return (
    <View style={styles.tabbar}>
      {tabOrder.map((routeName) => {
        const route = state.routes.find((r) => r.name === routeName);
        if (!route) return null;

        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;

        const isFocused = state.index === state.routes.findIndex((r) => r.name === routeName);

        const onPress = () => {
          if (routeName === 'Salir') {
            {/* esto significa que si no es undefined entonces ejecuta la funcion  */}
            onLogoutPress?.();
            return;
          }

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
              <IconComponent color={isFocused ? '#e46d29' : '#8fa691'} />
            ) : (
              <Text>❓</Text>
            )}
            <Text style={[styles.label, { color: isFocused ? '#e46d29' : '#8fa691' }]}>
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
    position: 'absolute',
    left:'10%',
    bottom: 0,
    paddingVertical: 10,
    shadowOpacity: 0.1,
    borderRadius: 30,
    shadowOffset: { width: 0, height: -3 },
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth:0.3
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
