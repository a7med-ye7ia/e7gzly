// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error(`Error storing ${key}:`, e);
      return false;
    }
  },
  
  async getItem(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error(`Error retrieving ${key}:`, e);
      
      return null;
    }
  },
  
  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`Error removing ${key}:`, e);
      return false;
    }
  }
};