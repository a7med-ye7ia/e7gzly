import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { resetPassword } from '../../auth/resetPassword';
import styles from '../../styles/stylesAuth';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert('Missing Email', 'Please enter your email address.');
            return;
        }

        const { success, error } = await resetPassword(email);

        if (success) {
            Alert.alert('Success', 'Password reset email sent!');
        } else {
            Alert.alert('Error', error.message);
        }
    };

  return (
      <View style={styles.containerForgetPass}>
        <Text style={styles.title}>Forgot Password</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
          />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleResetPassword}>
          <Text style={styles.primaryButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
  );
};

export default ForgotPasswordScreen;
