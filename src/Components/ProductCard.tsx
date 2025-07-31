import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  image: string;
  description: string;
  moq: number;
}

interface ProductCardProps {
  item: Product;
  navigation: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0); // Start with 0 to show not in cart
  const [isInCart, setIsInCart] = useState(false);

  const handleAddToCart = () => {
    const newQuantity = 1;
    setQuantity(newQuantity);
    setIsInCart(true);
    dispatch(addToCart({ ...item, quantity: newQuantity }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
    setIsInCart(false);
    setQuantity(0);
  };

  const handleQuantityIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    } else {
      // Remove from cart if quantity becomes 0
      handleRemoveFromCart();
    }
  };

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

      {/* Cart Controls */}
      <View style={styles.cartControlsContainer}>
        {!isInCart ? (
          // Show full "Add to cart" button when not in cart
          <TouchableOpacity
            style={styles.fullAddToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.fullAddToCartText}>Add to cart</Text>
          </TouchableOpacity>
        ) : (
          // Show quantity controls when item is in cart
          <View style={styles.quantityControlsRow}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleRemoveFromCart}
            >
              <Ionicons name="trash-outline" size={18} color="#8B7355" />
            </TouchableOpacity>

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleQuantityDecrease}
              >
                <Ionicons name="remove" size={16} color="#666" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleQuantityIncrease}
              >
                <Ionicons name="add" size={16} color="#666" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.addMoreButton}
              onPress={handleQuantityIncrease}
            >
              <Ionicons name="add" size={18} color="#fff" />
            </TouchableOpacity>

            <View style={styles.inCartIndicator}>
              <Text style={styles.inCartText}>In Cart</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: {
    width: '48%',
    height: 280,
    marginVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
   
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
  cartControlsContainer: {
    marginTop: 'auto',
  },
  fullAddToCartButton: {
    backgroundColor: '#e8f3ef',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullAddToCartText: {
    color: '#33926c',
    fontSize: 14,
    fontWeight: '600',
  },
  quantityControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F3F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  },
  quantityButton: {
    width: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  addMoreButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#33926c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inCartIndicator: {
    flex: 1,
    backgroundColor: '#e8f3ef',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inCartText: {
    color: '#33926c',
    fontSize: 14,
    fontWeight: '600',
  },
});