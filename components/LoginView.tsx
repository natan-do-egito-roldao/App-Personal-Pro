import { Dumbbell } from 'lucide-react-native';
import React, { useState, useEffect  } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { styles } from '../utils/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginViewProps {
  onLogin: (email: string, password: string) => void;
}

const saveAcess = async (email, password) => {
  try{
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);
    console.log(await AsyncStorage.getAllKeys())
  } catch (error) {
    console.log("Error", error)
  }
}



export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

    useEffect(() => {
    const loadSavedAccess = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("email");
        const savedPassword = await AsyncStorage.getItem("password");

        if (savedEmail) setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);

      } catch (error) {
        console.log("Erro ao carregar dados salvos", error);
      }
    };

    loadSavedAccess();
  }, []);

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Dumbbell color="#000" size={32} strokeWidth={2.5} />
          </View>
          <Text style={styles.logoText}>Personal Pro</Text>
          <Text style={styles.logoSubtext}>Sua jornada começa aqui.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder={"exemplo@email.com"}
              placeholderTextColor="#52525b"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput 
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#52525b"
              secureTextEntry
            />
          </View>
          <View style={styles.SaveContainer}>
            <Text style={styles.loginButtonTextSave}>Salvar acesso</Text>
            <TouchableOpacity 
              style={[styles.loginButtonSave, isActive && { backgroundColor: "#22c55e" }]} 
              onPress={() => {saveAcess(email, password); setIsActive(!isActive);}}
            >
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => onLogin(email, password)}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
