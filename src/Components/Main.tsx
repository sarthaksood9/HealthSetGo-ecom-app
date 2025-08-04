import React, { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../Context/AuthContext';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import AppNavigator from '../../navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppNavigator />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export function Main() {
  const { user } = useAuth();
  const [authScreen, setAuthScreen] = useState<'login' | 'signup'>('login');

  if (user) return <HomeScreen />;
  if (authScreen === 'login') {
    return <LoginScreen goToSignup={() => setAuthScreen('signup')} />;
  }
  return <SignupScreen goToLogin={() => setAuthScreen('login')} />;
}
