import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Firebase Auth instance
  const auth = getAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill out both fields');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      Alert.alert('Success', 'Login successful');
      // Redirect to the main app screen after successful login
      router.replace('./index');  // Adjust this route to where you want to go after login
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid Email', 'The email address is not valid');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('User Not Found', 'No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Wrong Password', 'The password is incorrect');
      } else {
        console.error('Login error:', error.message);
        Alert.alert('Login Failed', error.message);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter your Email'
          value={email}
          onChangeText={setEmail}
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

      <View style={styles.divider} />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('./SignUp')}>
          <Text style={styles.footerLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Keep the same StyleSheet from previous example
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 25,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  footerLink: {
    color: '#007AFF',
    fontSize: 14,
  },
});
