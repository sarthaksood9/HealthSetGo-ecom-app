
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider, useAuth } from './src/Context/AuthContext';
import LoginScreen from './src/Screens/LoginScreen';
import SignupScreen from './src/Screens/SignupScreen';


function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Home content here */}
      {/* <SignupScreen/> */}
      {/* <LoginScreen/> */}
      <Text>hi</Text>
      <ProductListingScreen/>
      <StatusBar style="auto" />
    </View>
  );
}


import React, { useState } from 'react';
import ProductListingScreen from './src/Screens/ProductScreen';

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
    <AuthProvider>
      <Main />
    </AuthProvider>
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
