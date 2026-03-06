import { ChevronRight, Clock, Dumbbell, Flame, User} from 'lucide-react-native';
import React, { useState, useEffect  } from 'react';
import traningDay from '../scripts/traningDay.js';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator 
} from 'react-native';
import { styles } from '../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import trainingDay from '../scripts/traningDay.js';
const API_URL = process.env.EXPO_PUBLIC_API_URL;
import { useNavigation } from '@react-navigation/native';
import SkeletonHome from './SkeletonHome';

interface HomeViewProps {
  onStartWorkout: () => void;
  onAdm: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({onStartWorkout, onAdm}) => {
  const [user, setUser] = useState(null);
  const [nivel, setNivel] = useState(null);
  const [traning, setTraning] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try{
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const response = await axios.get(
          `${API_URL}/auth/userData`, // body (se não tiver nada, manda objeto vazio)
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        setUser(response.data);
        await AsyncStorage.setItem("nivel", JSON.stringify(response.data.nivel));

        const responsetraning = await axios.get(
          `${API_URL}/user/treinos/`, // body (se não tiver nada, manda objeto vazio)
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const traningToday = await traningDay(responsetraning.data.resultado);
        setTraning(traningToday);

        if (traningToday.treino.nivel === 1){
          setNivel('Iniciante');
        } else {
          setNivel('Avançado');
        }
        
      }catch (error) {
        console.log("error", error)
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  if (loading) {
    return <SkeletonHome />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {user.nome} 👋</Text>
          <Text style={styles.headerTitle}>Pronto para hoje?</Text>
        </View>
        <TouchableOpacity onPress={onAdm}>
          <View style={styles.avatar}>
            <User color="#a1a1aa" size={20} />
          </View>
        </TouchableOpacity>
      </View>

{/*       <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Clock color="#10b981" size={20} />
          <Text style={styles.statLabel}>Tempo Total</Text>
          <Text style={styles.statValue}>12.4h</Text>
        </View>
        <View style={styles.statCard}>
          <Flame color="#f97316" size={20} />
          <Text style={styles.statLabel}>Calorias</Text>
          <Text style={styles.statValue}>4.2k</Text>
        </View>
      </View> */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Treino do Dia</Text>
        <TouchableOpacity style={styles.workoutCard} onPress={onStartWorkout}>
          <View style={styles.workoutCardContent}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{nivel}</Text>
            </View>
            <Text style={styles.workoutTitle}>{traning.nome}</Text>
            <Text style={styles.workoutSubtext}>
              {traning.treino.fasesDoNivel.length} exercícios • {traning.treino.duracao} min
            </Text>
            <View style={styles.startNow}>
              <Text style={styles.startNowText}>Começar agora</Text>
              <ChevronRight color="#10b981" size={18} />
            </View>
          </View>
          <View style={styles.workoutCardIcon}>
            <Dumbbell color="#10b981" size={60} opacity={0.1} />
          </View>
        </TouchableOpacity>
      </View>

{/*       <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progresso Semanal</Text>
        <View style={styles.chartContainer}>
          {[40, 70, 45, 90, 65, 30, 80].map((height, i) => (
            <View key={i} style={styles.chartBarContainer}>
              <View 
                style={[
                  styles.chartBar, 
                  { height: `${height}%` },
                  i === 3 && styles.chartBarActive
                ]} 
              />
              <Text style={styles.chartLabel}>
                {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][i]}
              </Text>
            </View>
          ))}
        </View>
      </View> */}
    </ScrollView>
  );
};
