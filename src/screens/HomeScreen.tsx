import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const HomeScreen = ({navigation}: any) => {
  const categories = [
    {id: 1, name: 'Zapatos', icon: '👟', color: '#FF6B6B'},
    {id: 2, name: 'Ropa', icon: '👕', color: '#4ECDC4'},
    {id: 3, name: 'Accesorios', icon: '👜', color: '#45B7D1'},
    {id: 4, name: 'Calcetines', icon: '🧦', color: '#96CEB4'},
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Zapatos Deportivos Nike',
      price: 89.99,
      image: '👟',
      isNew: true,
    },
    {
      id: 2,
      name: 'Camiseta Básica',
      price: 19.99,
      image: '👕',
      isRecommended: true,
    },
    {
      id: 3,
      name: 'Bolso de Cuero',
      price: 129.99,
      image: '👜',
      isPromotional: true,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛍️ Haitian Fashion</Text>
        <Text style={styles.headerSubtitle}>Tu tienda de moda en Las Palmas</Text>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Bienvenido a Haitian Fashion</Text>
        <Text style={styles.heroSubtitle}>Descubre las últimas tendencias en moda</Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('Products')}>
          <Text style={styles.ctaButtonText}>Ver Productos</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categorías Destacadas</Text>
        <View style={styles.categoriesGrid}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, {backgroundColor: category.color}]}
              onPress={() => navigation.navigate('Products')}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Productos Destacados</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredProducts.map(product => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              <View style={styles.productImage}>
                <Text style={styles.productEmoji}>{product.image}</Text>
              </View>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price} €</Text>
              {product.isNew && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Nuevo</Text>
                </View>
              )}
              {product.isRecommended && (
                <View style={[styles.badge, {backgroundColor: '#FFD700'}]}>
                  <Text style={styles.badgeText}>Recomendado</Text>
                </View>
              )}
              {product.isPromotional && (
                <View style={[styles.badge, {backgroundColor: '#FF4444'}]}>
                  <Text style={styles.badgeText}>Oferta</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#000',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ccc',
  },
  hero: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  productCard: {
    backgroundColor: '#fff',
    width: 150,
    marginRight: 15,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    height: 100,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  productEmoji: {
    fontSize: 40,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default HomeScreen;