import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../Components/ProductCard';

// Sample product data
const sampleProducts = [
  {
    id: '1',
    name: '12 Volt Spotlight',
    sku: '15485CBR331',
    price: 69.52,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
    description: 'Compact and energy-efficient 12V spotlight perfect for outdoor lighting and landscape applications.',
    moq: 10
  },
  {
    id: '2',
    name: 'Variable Lumen Output LED',
    sku: '16024CBR27325',
    price: 295.68,
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&h=300&fit=crop',
    description: 'High-performance LED with adjustable lumen output for flexible lighting requirements.',
    moq: 5
  },
  {
    id: '3',
    name: 'LED Flood Light',
    sku: '18392FLD445',
    price: 124.99,
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&h=300&fit=crop',
    description: 'Durable LED flood light ideal for security, industrial, and large-area illumination.',
    moq: 8
  },
  {
    id: '4',
    name: 'Smart Garden Light',
    sku: '19847GDN221',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=300&fit=crop',
    description: 'Wi-Fi-enabled smart garden light with customizable color and scheduling features.',
    moq: 12
  },
  {
    id: '5',
    name: 'Industrial Track Light',
    sku: '20156TRK889',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    description: 'Heavy-duty track light designed for commercial and industrial interior lighting.',
    moq: 4
  },
  {
    id: '6',
    name: 'Pendant Ceiling Light',
    sku: '21334PND667',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=300&fit=crop',
    description: 'Stylish pendant ceiling light suitable for dining areas, kitchens, or modern interiors.',
    moq: 6
  },
];


const ProductListingScreen = ({ navigation }) => {
  const [products, setProducts] = useState(sampleProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(1);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Keyword, Sku..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          
        </View>
        
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity 
        style={styles.floatingCartButton}
        onPress={() => navigation.navigate('Cart')}
      >
        <Ionicons name="cart" size={24} color="#fff" />
        {cartCount > 0 && (
          <View style={styles.floatingCartBadge}>
            <Text style={styles.floatingCartBadgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
   
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    // marginRight: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  scanButton: {
    padding: 5,
  },
  cartButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#f44336',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productGrid: {
    paddingHorizontal: 15,
    // backgroundColor:"pink"
  },
  productRow: {
    justifyContent: 'space-between',
  },

  floatingCartButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  floatingCartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#f44336',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingCartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ProductListingScreen;