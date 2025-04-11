import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert ,ScrollView} from 'react-native';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSignUp = () => {
    if (validatePassword()) {
      Alert.alert('Success', 'Account created successfully!');
      // Here you would typically call your signup API
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Sign up</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter an Email'
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Mobile Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter a phone number'
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter a password'
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (confirmPassword) validatePassword();
          }}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity 
          style={styles.toggleButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.toggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={[styles.input, passwordError ? styles.errorInput : null]}
          value={confirmPassword}
          placeholder='Confirm your password'
          onChangeText={(text) => {
            setConfirmPassword(text);
            validatePassword();
          }}
          secureTextEntry={!showPassword}
          onBlur={validatePassword}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Sign Up Button */}
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={handleSignUp}
      >
        <Text style={styles.primaryButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Footer Links */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() =>{
            router.push("/Login");
        }}>
          <Text style={styles.footerLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    color: '#000000',
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666666',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  toggleButton: {
    position: 'absolute',
    right: 16,
    top: 40,
  },
  toggleText: {
    color: '#007AFF',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#eeeeee',
    marginVertical: 24,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
    marginRight: 4,
  },
  footerLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default SignUpScreen;