import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

const ProductsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    {id: 'all', name: 'Todos'},
    {id: 'zapatos', name: 'Zapatos'},
    {id: 'ropa', name: 'Ropa'},
    {id: 'accesorios', name: 'Accesorios'},
    {id: 'calcetines', name: 'Calcetines'},
  ];

  const products = [
    {
      id: 1,
      name: 'Zapatos Deportivos Nike',
      description: 'Zapatos cómodos para el día a día',
      price: 89.99,
      category: 'zapatos',
      sizes: ['38', '39', '40', '41', '42'],
      image: '👟',
      isNew: true,
      isRecommended: false,
      isPromotional: false,
    },
    {
      id: 2,
      name: 'Camiseta Básica',
      description: 'Camiseta de algodón 100%',
      price: 19.99,
      category: 'ropa',
      sizes: ['S', 'M', 'L', 'XL'],
      image: '👕',
      isNew: false,
      isRecommended: true,
      isPromotional: false,
    },
    {
      id: 3,
      name: 'Bolso de Cuero',
      description: 'Bolso elegante para ocasiones especiales',
      price: 129.99,
      category: 'accesorios',
      sizes: ['Único'],
      image: '👜',
      isNew: false,
      isRecommended: false,
      isPromotional: true,
    },
    {
      id: 4,
      name: 'Calcetines Deportivos',
      description: 'Calcetines cómodos para deporte',
      price: 12.99,
      category: 'calcetines',
      sizes: ['36-38', '39-41', '42-44'],
      image: '🧦',
      isNew: true,
      isRecommended: true,
      isPromotional: false,
    },
    {
      id: 5,
      name: 'Zapatillas Converse',
      description: 'Zapatillas clásicas y atemporales',
      price: 65.99,
      category: 'zapatos',
      sizes: ['37', '38', '39', '40', '41', '42'],
      image: '👟',
      isNew: false,
      isRecommended: true,
      isPromotional: true,
    },
    {
      id: 6,
      name: 'Pantalón Vaquero',
      description: 'Pantalón de mezclilla clásico',
      price: 49.99,
      category: 'ropa',
      sizes: ['28', '30', '32', '34', '36'],
      image: '👖',
      isNew: false,
      isRecommended: false,
      isPromotional: false,
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: any) => {
    Alert.alert('Carrito', `${product.name} añadido al carrito`);
  };

  const renderProduct = ({item}: {item: any}) => (
    <View style={styles.productCard}>
      <View style={styles.productImage}>
        <Text style={styles.productEmoji}>{item.image}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>{item.price} €</Text>
        <View style={styles.sizesContainer}>
          {item.sizes.map((size: string, index: number) => (
            <Text key={index} style={styles.sizeTag}>{size}</Text>
          ))}
        </View>
        <View style={styles.badgesContainer}>
          {item.isNew && <Text style={[styles.badge, styles.newBadge]}>Nuevo</Text>}
          {item.isRecommended && <Text style={[styles.badge, styles.recommendedBadge]}>Recomendado</Text>}
          {item.isPromotional && <Text style={[styles.badge, styles.promotionalBadge]}>Oferta</Text>}
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => addToCart(item)}>
          <Text style={styles.addToCartText}>Añadir al Carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Productos</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar productos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category.id)}>
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category.id && styles.selectedCategoryButtonText,
              ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  },
  searchContainer: {
    padding: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCategoryButton: {
    backgroundColor: '#000',
  },
  categoryButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  productsList: {
    padding: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 5,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    height: 120,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productEmoji: {
    fontSize: 40,
  },
  productInfo: {
    padding: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  sizesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  sizeTag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 10,
    color: '#666',
    marginRight: 5,
    marginBottom: 5,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 5,
    marginBottom: 5,
  },
  newBadge: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  recommendedBadge: {
    backgroundColor: '#FFD700',
    color: '#000',
  },
  promotionalBadge: {
    backgroundColor: '#FF4444',
    color: '#fff',
  },
  addToCartButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductsScreen;
