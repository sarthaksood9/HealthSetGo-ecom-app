import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface ProductDescriptionScreenProps {
  navigation: any;
  route: {
    params: {
      product: {
        id: string;
        name: string;
        sku: string;
        price: number;
        image: string;
        description: string;
        moq: number;
      };
    };
  };
}

const ProductDescriptionScreen: React.FC<ProductDescriptionScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const product = route?.params?.product;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    Alert.alert(
      'Added to Cart',
      `${product.name} has been added to your cart`,
      [{ text: 'OK' }]
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.name}</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productSku}>SKU: {product.sku}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
            <Text style={styles.moq}>MOQ: {product.moq} units</Text>
          </View>
        </View>

        <View style={styles.openSection}>
          <Text style={styles.openSectionTitle}>PRODUCT DESCRIPTION</Text>
          <View style={styles.sectionContent}>
            <View style={styles.descriptionCard}>
              <Text style={styles.descriptionText}>{product.description}</Text>
            </View>
          </View>
        </View>

        {/* Add some bottom padding for the fixed button */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.addToCartContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 2,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 30,
    alignItems: 'center',
  },
  productImage: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: 8,
  },
  productInfo: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 8,
    borderBottomColor: '#f8f9fa',
  },
  productSku: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    lineHeight: 32,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  moq: {
    fontSize: 15,
    color: '#666',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#33926c',
  },
  openSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  openSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  sectionContent: {
    paddingBottom: 20,
  },
  descriptionCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 1,
  },
  descriptionText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
  },
  bottomPadding: {
    height: 100,
  },
  addToCartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 8,
  },
  addToCartButton: {
    backgroundColor: '#33926c',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  
});

export default ProductDescriptionScreen;

;