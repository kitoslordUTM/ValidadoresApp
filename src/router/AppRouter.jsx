import React, {useState} from 'react';
import {View, Text, Modal, Button, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/store';
import {TabBar} from '../lib/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setIsActive} from '../slices/LoginSlice';
import Home from '../views/home/Home';
import Login from '../views/login/Login';
import Scheme from '../views/scheme/Scheme';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  const isLoggedIn = useSelector(state => state.LogIn.isActive);
  const { loadToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
  let logoutTimer;

  async function checkToken() {
    const { valid, expiresIn } = await loadToken();

    if (valid && expiresIn) {
      logoutTimer = setTimeout(async () => {
        await AsyncStorage.removeItem('TOKEN');
        dispatch(setToken(null));
        dispatch(setIsActive(false));
      }, expiresIn * 1000);

      dispatch(setIsActive(true));
    } else {
      dispatch(setIsActive(false));
    }

    setLoading(false);
  }

  checkToken();

  return () => {
    if (logoutTimer) clearTimeout(logoutTimer);
  };
}, []);


  if (loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isLoggedIn ? <AppTabs /> : <AuthStack />;
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function DummyScreen() {
  return null;
}

function AppTabs() {
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('TOKEN');
    await AsyncStorage.removeItem('USER');
    await AsyncStorage.removeItem('SUCURSAL');
    await AsyncStorage.removeItem('PERMISO');
    dispatch(setIsActive(false));
  };

  {
    /* con un tabar personalizado  necesitamos personalizar cada evento para realizar, es necesario especificar por props que evento queremos que ocurra   */
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        tabBar={props => (
          <TabBar {...props} onLogoutPress={() => setModalVisible(true)} />
        )}>
        <Tab.Screen name="Inicio" component={HomeStack} />
        <Tab.Screen
          name="Salir"
          component={DummyScreen}
          options={{
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  backgroundColor: '#eee',
                }}>
                <Text>Salir</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>

        <View style={{height:'100%', justifyContent: 'center', alignItems: 'center',  backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 25}}>
            <Text style={{ fontSize: 20, fontWeight: 600, alignSelf:'center'}}>¿Deseas cerrar sesión?</Text>
            <View style={{flexDirection: 'column', gap: 3,  padding: 20,}}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 20,
                  paddingHorizontal:40,
                  backgroundColor: '#e46d29',
                }}
                onPress={handleLogout}>
                <Text style={{color: 'white', fontWeight: 600}}>
                  {' '}
                  Sí, cerrar sesión{' '}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor: '#e46d29',
                  paddingHorizontal:40,
                }}
                onPress={() => setModalVisible(false)}>
                <Text style={{color: 'white', fontWeight: 600, alignSelf:'center'} }>
                  {' '}
                  Cancelar{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="Scheme" component={Scheme} />
    </Stack.Navigator>
  );
}
