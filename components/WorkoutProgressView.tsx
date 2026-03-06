import { CheckCircle2, Play, Timer as TimerIcon } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { styles } from '../utils/styles';
const API_URL = process.env.EXPO_PUBLIC_API_URL;
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import traningDay from '../scripts/traningDay.js';

interface WorkoutProgressViewProps {
  onFinish: () => void;
}

export const WorkoutProgressView: React.FC<WorkoutProgressViewProps> = ({onFinish }) => {
  const [exercises, setExercises] = useState([]);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [traning, setTraning] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {

        const refreshToken = await AsyncStorage.getItem('refreshToken');

        const responsetraning = await axios.get(
          `${API_URL}/user/treinos/`,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const traningToday = await traningDay(responsetraning.data.resultado);

        setTraning(traningToday);

        const exercisesFromApi = traningToday.treino.fasesDoNivel.map((fase) => ({
          id: fase._id,
          name: fase.titulo,
          sets: fase.serie,
          reps: fase.repeticao,
          weight: null,
          completed: false
        }));

        setExercises(exercisesFromApi);

      } catch (error) {
        console.log(error);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    if (!isResting) return;

    const interval = setInterval(() => {
      setRestTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsResting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isResting]);



  const toggleExercise = (id: string) => {

    setExercises(prev =>
      prev.map(ex => {
        if (ex.id === id && !ex.completed) {

          startRest();

          return {
            ...ex,
            completed: true
          };
        }

        return ex;
      })
    );

  };


  const startRest = () => {
    setRestTime(60);
    setIsResting(true);
  };

  const completedCount = exercises.filter(e => e.completed).length;
  const progress = (completedCount / exercises.length) * 100;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Em Progresso</Text>
          <TouchableOpacity onPress={onFinish}>
            <Text style={styles.finishButtonText}>Finalizar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progresso do Treino</Text>
            <Text style={styles.progressValue}>{Math.round(progress)}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {isResting && (
          <View style={styles.restCard}>
            <View style={styles.restInfo}>
              <TimerIcon color="#09090b" size={24} />
              <View>
                <Text style={styles.restLabel}>Descanso</Text>
                <Text style={styles.restTimer}>00:{restTime.toString().padStart(2, '0')}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.skipButton} onPress={() => setIsResting(false)}>
              <Text style={styles.skipButtonText}>Pular</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.exerciseList}>
          {exercises.map((ex) => (
            <TouchableOpacity 
              key={ex.id} 
              style={[styles.exerciseCard, ex.completed && styles.exerciseCardCompleted]}
              onPress={() => toggleExercise(ex.id)}
            >
              <View style={styles.exerciseInfo}>
                <View style={[styles.checkbox, ex.completed && styles.checkboxChecked]}>
                  {ex.completed && <CheckCircle2 color="#09090b" size={14} />}
                </View>
                <View>
                  <Text style={[styles.exerciseName, ex.completed && styles.exerciseNameCompleted]}>
                    {ex.name}
                  </Text>
                  <Text style={styles.exerciseDetails}>
                    {ex.sets} séries • {ex.reps} reps {ex.weight && `• ${ex.weight}`}
                  </Text>
                </View>
              </View>
              {!ex.completed && <Play color="#10b981" size={16} />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
