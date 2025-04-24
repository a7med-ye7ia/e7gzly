import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const admin = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Panel</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="people" size={32} color="#4A90E2" />
          <Text style={styles.cardTitle}>Manage Users</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="airplane" size={32} color="#4A90E2" />
          <Text style={styles.cardTitle}>Manage Flights</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="stats-chart" size={32} color="#4A90E2" />
          <Text style={styles.cardTitle}>Analytics</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="settings" size={32} color="#4A90E2" />
          <Text style={styles.cardTitle}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  logoutButton: {
    padding: 10,
  },
  logoutText: {
    color: '#4A90E2',
    fontSize: 16,
  },
  content: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  }
});

export default admin;

