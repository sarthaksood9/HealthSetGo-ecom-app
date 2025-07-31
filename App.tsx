
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from './src/Context/AuthContext';
import LoginScreen from './src/Screens/LoginScreen';
import SignupScreen from './src/Screens/SignupScreen';
import AppNavigator from './navigation';
import { store } from './src/store';

function HomeScreen() {
  return (
    <View style={{ flex: 1,backgroundColor: '#fff' }}>
      <AppNavigator />
      <StatusBar style="auto" />
    </View>
  );
}



function Main() {
  const { user } = useAuth();
  const [authScreen, setAuthScreen] = useState<'login' | 'signup'>('login');
  if (user) return <HomeScreen />;
  if (authScreen === 'login') {
    return <LoginScreen goToSignup={() => setAuthScreen('signup')} />;
  }
  return <SignupScreen goToLogin={() => setAuthScreen('login')} />;
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
