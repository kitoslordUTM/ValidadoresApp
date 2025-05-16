import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../views/home/Home';
import Config from '../views/config/Config';
import Login from '../views/login/Login';
import TabBar from '../lib/components/TabBar'




const Tab = createBottomTabNavigator();
const isLoggedIn = true; 

export default function MainNavigator() {
  return (
    isLoggedIn ? (
      <AppNavigation />
    ) : (
      <AuthNavigation />
    )
  );
}

function AuthNavigation (){
    return(
        <NavigationContainer>
            <Login />
        </NavigationContainer>
    )
}

function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="config" component={Config} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}