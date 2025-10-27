import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CART_STORAGE_KEY = '@cart_items';

export const cartService = {
  // Get cart items
  async getCartItems(): Promise<CartItem[]> {
    try {
      const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error getting cart items:', error);
      return [];
    }
  },

  // Add item to cart
  async addToCart(product: any): Promise<void> {
    try {
      const cartItems = await this.getCartItems();
      const existingItem = cartItems.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }

      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Update item quantity
  async updateQuantity(productId: string, quantity: number): Promise<void> {
    try {
      const cartItems = await this.getCartItems();
      const itemIndex = cartItems.findIndex(item => item.id === productId);

      if (itemIndex !== -1) {
        if (quantity <= 0) {
          cartItems.splice(itemIndex, 1);
        } else {
          cartItems[itemIndex].quantity = quantity;
        }
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  },

  // Remove item from cart
  async removeFromCart(productId: string): Promise<void> {
    try {
      const cartItems = await this.getCartItems();
      const filteredItems = cartItems.filter(item => item.id !== productId);
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(filteredItems));
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Clear cart
  async clearCart(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Get cart total
  async getCartTotal(): Promise<number> {
    try {
      const cartItems = await this.getCartItems();
      return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    } catch (error) {
      console.error('Error calculating cart total:', error);
      return 0;
    }
  }
};
