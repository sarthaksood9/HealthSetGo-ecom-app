import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListingScreen from './src/Screens/ProductScreen';
import ProductDescriptionScreen from './src/Screens/ProductDescriptionScreen';
import CartScreen from './src/Screens/CartScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Products">
        <Stack.Screen options={{ headerShown: false }} name="Products" component={ProductListingScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ProductDescription" component={ProductDescriptionScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
