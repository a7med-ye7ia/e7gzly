import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../auth/login';
import styles from '../styles/stylesAuth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        router.replace('./flight-destinations');
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill out both fields');
      return;
    }

    setLoading(true);

    const { user, error } = await loginUser(email, password);

    if (user) {
      Alert.alert('Success', 'Login successful');
      await AsyncStorage.setItem('isLoggedIn', 'true');
      router.replace('./flight-destinations');
    } else {
      setLoading(false);
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid Email', 'The email address is not valid');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('User Not Found', 'No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Wrong Password', 'The password is incorrect');
      } else {
        Alert.alert('Login Failed', error.message);
      }
    }
  };

  return (
      <ScrollView style={styles.containerLogin}>
        <Text style={styles.title}>Log In</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>E-mail</Text>
          <TextInput
              style={styles.input}
              placeholder='Enter your Email'
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
              keyboardType='email-address'
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
              style={styles.input}
              placeholder='Enter your password'
              value={password}
              onChangeText={setPassword}
              secureTextEntry
          />
        </View>

        {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
        ) : (
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
        )}

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => router.push('./login/ForgetPassword')}>
            <Text style={styles.footerLink}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('./login/SignUp')}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  );
}
