import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const ProductCard = ({ item, navigation }: any) => {
  return (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProductDescription', { product: item })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productSku}>{item.sku}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to cart</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard

const styles = StyleSheet.create({
    productCard: {
    width: '48%',
    height:250,
    marginVertical:20
  },
  imageContainer: {
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    marginBottom: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productSku: {
    fontSize: 10,
    color: '#999',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#e8f3ef',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#33926c',
    fontSize: 14,
    fontWeight: '600',
  },

})