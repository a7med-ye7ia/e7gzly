
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/stylesAuth'; const debugAsyncStorage = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const userName = await AsyncStorage.getItem('userName');
      const userEmail = await AsyncStorage.getItem('userEmail');
      
      console.log('AsyncStorage Debug:', {
        isLoggedIn,
        userName,
        userEmail
      });
      
      Alert.alert(
        'AsyncStorage Contents',
        `isLoggedIn: ${isLoggedIn}\nuserName: ${userName}\nuserEmail: ${userEmail}`
      );
    } catch (e) {
      console.error('Debug error:', e);
    }
  };
  
  // Add a debug button in development
  {__DEV__ && (
    <TouchableOpacity 
      style={[styles.button, {marginTop: 10, backgroundColor: '#555'}]} 
      onPress={debugAsyncStorage}
    >
      <Text style={styles.buttonText}>Debug Storage</Text>
    </TouchableOpacity>
  )}