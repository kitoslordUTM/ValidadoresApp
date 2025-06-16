import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import MainNavigator from './src/router/AppRouter';
import { NavigationContainer } from '@react-navigation/native';
// App.jsx
import Toast, { BaseToast } from 'react-native-toast-message';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' , backgroundColor: 'black', borderRadius: 15 }}
      contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: 'black', borderRadius: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '600', 
        color: 'white'
      }}

      text2Style={{ fontSize: 16,   fontWeight: '500', color: 'white' }}

    />
  ),

  error: (props)=> (
      <BaseToast
      {...props}
      style={{ borderLeftColor: 'red' , backgroundColor: 'black', borderRadius: 15 }}
      contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: 'black', borderRadius: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '600', 
        color: 'white'
      }}

      text2Style={{ fontSize: 16,   fontWeight: '500', color: 'white' }}

    />
  )
}

export default function App() {
  return (
        <Provider store={store}>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
            <Toast config={toastConfig} />
        </Provider>
  );
}

