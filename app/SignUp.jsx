import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { signUpUser } from '../auth/signUp';
import styles from '../styles/stylesAuth';

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

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !mobile) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email.');
      return;
    }

    if (!validatePassword()) return;

    const { user, error } = await signUpUser(email, password);
    if (user) {
      Alert.alert('Success', 'Account created successfully!');
      router.replace('./login');
    } else {
      let message = 'Something went wrong.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already registered.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      }
      Alert.alert('Sign Up Failed', message);
    }
  };

    return (
        <ScrollView style={styles.containerSigUp}>
            <Text style={styles.title}>Sign up</Text>

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
                    router.push("/login");
                }}>
                    <Text style={styles.footerLink}>Log In</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SignUpScreen;
