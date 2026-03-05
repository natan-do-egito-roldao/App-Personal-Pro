import { Activity, Home as HomeIcon, LogOut } from 'lucide-react-native';
import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { HomeView } from './components/HomeView';
import { LoginView } from './components/LoginView';
import { WorkoutProgressView } from './components/WorkoutProgressView';
import { MOCK_WORKOUT } from './utils/mockData';
import { styles } from './utils/styles';
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function App() {
  // initial view state (string can be 'login', 'home' or 'workout')
  const [view, setView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    LoggedIn();

    // aqui você pode carregar dados
  }, []);

  
  const LoggedIn = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn == "true"){
        setIsLoggedIn(true);
        setView('home');
      };
    } catch (err) {
      console.log(err)
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      await AsyncStorage.setItem("accesstoken", response.data.accesstoken);
      await AsyncStorage.setItem("refreshToken", response.data.RefreshToken);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      setView('home');
    } catch (error) { 
      console.log("ERRO COMPLETO:", error); 
    }

  };

  const handleLogout = async () => {
    try{
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const response = await axios.post(`${API_URL}/auth/logout`, {
        refreshToken : "Bearer " + refreshToken
      });
      await AsyncStorage.removeItem("accesstoken");
      await AsyncStorage.removeItem("RefreshToken");
      await AsyncStorage.setItem('isLoggedIn', 'false');
      if (response.status == 200) {
        setIsLoggedIn(false);
        setView('login');
      }
    } catch (error){
      console.log("ERRO COMPLETO:", error); 
    }
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaProvider>
        <LoginView onLogin={handleLogin} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView  style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        {view === 'home' ? (
          <HomeView workout={MOCK_WORKOUT} onStartWorkout={() => setView('workout')} />
        ) : (
          <WorkoutProgressView workout={MOCK_WORKOUT} onFinish={() => setView('home')} />
        )}
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setView('home')}
        >
          <HomeIcon color={view === 'home' ? '#10b981' : '#52525b'} size={24} />
          <Text style={[styles.navText, view === 'home' && styles.navTextActive]}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setView('workout')}
        >
          <Activity color={view === 'workout' ? '#10b981' : '#52525b'} size={24} />
          <Text style={[styles.navText, view === 'workout' && styles.navTextActive]}>Treino</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
          <LogOut color="#52525b" size={24} />
          <Text style={styles.navText}>Sair</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView >
    </SafeAreaProvider>
  );
}