import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView, 
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Trash2, Save, Calendar } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from '../utils/styles.training';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const AdminCreateWorkout = ({ onFinish }: { onFinish: () => void }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    descricao: '', // Descrição do GRUPO
    tipo: 'familia',
    fotoGrupo: 'https://placeholder.com/600',
    videoUrl: '',
    Treinos: [
      {
        diaSemana: 1,
        nome: '',
        descricao: '', // ESTA É A DESCRIÇÃO QUE ESTAVA FALTANDO (Dia)
        videoUrl: '',
        fotoTreino: '',
        nivelTreino: [
          {
            nivel: 1,
            descricao: '', // Descrição do Nível
            duracao: 60,
            videoUrl: '',
            dicas: [],
            fasesDoNivel: [
              {
                titulo: '',
                repeticao: 12,
                serie: 4,
                posicao: 1,
                videoUrl: '',
                dicas: [],
                dropSet: []
              }
            ]
          }
        ]
      }
    ]
  });

  // Adicionar um novo dia de treino (Dia 1, 2, 3...)
  const addTreinoDia = () => {
    const nextDay = formData.Treinos.length + 1;
    setFormData({
      ...formData,
      Treinos: [
        ...formData.Treinos,
        {
          diaSemana: nextDay,
          nome: '',
          descricao: '',
          videoUrl: '',
          fotoTreino: '',
          nivelTreino: [
            {
              nivel: 1,
              descricao: '',
              duracao: 60,
              videoUrl: '',
              dicas: [],
              fasesDoNivel: [{ titulo: '', repeticao: 10, serie: 3, posicao: 1, videoUrl: '', dicas: [], dropSet: [] }]
            }
          ]
        }
      ]
    });
  };

  const addNivel = (treinoIndex: number) => {
    const newTreinos = [...formData.Treinos];
    const novoNivelNum = newTreinos[treinoIndex].nivelTreino.length + 1;
    newTreinos[treinoIndex].nivelTreino.push({
      nivel: novoNivelNum,
      descricao: '',
      duracao: 60,
      videoUrl: '',
      dicas: [],
      fasesDoNivel: [{ titulo: '', repeticao: 10, serie: 3, posicao: 1, videoUrl: '', dicas: [], dropSet: [] }]
    });
    setFormData({ ...formData, Treinos: newTreinos });
  };

  const addFase = (treinoIndex: number, nivelIndex: number) => {
    const newTreinos = [...formData.Treinos];
    const fases = newTreinos[treinoIndex].nivelTreino[nivelIndex].fasesDoNivel;
    fases.push({
      titulo: '',
      repeticao: 10,
      serie: 3,
      posicao: fases.length + 1,
      videoUrl: '',
      dicas: [],
      dropSet: []
    });
    setFormData({ ...formData, Treinos: newTreinos });
  };

  const handleSave = async () => {
    if (!formData.descricao) return Alert.alert("Erro", "Preencha a descrição do grupo.");
    
    setLoading(true);
    try {
      const accesstoken = await AsyncStorage.getItem('accesstoken');
      await axios.post(`${API_URL}/traning/`, formData, {
        headers: { Authorization: `Bearer ${accesstoken}` }
      });
      Alert.alert("Sucesso", "Treino cadastrado com sucesso!", [{ text: "OK", onPress: onFinish }]);
    } catch (error) {
      console.log(error.response?.data || error);
      Alert.alert("Erro de Validação", "Verifique se todos os campos de descrição foram preenchidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingBottom: '25%' }}>
          <View style={styles.headerRow}>
            <Text style={styles.mainTitle}>Novo Grupo</Text>
            <TouchableOpacity onPress={onFinish}><Text style={{color: '#ef4444'}}>Cancelar</Text></TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Informações do Grupo</Text>
            <TextInput 
              placeholder="Descrição do Grupo (ex: Treino Natan)" 
              style={styles.input} 
              placeholderTextColor="#71717a"
              onChangeText={(txt) => setFormData({...formData, descricao: txt})}
            />
          </View>

          {formData.Treinos.map((treino, tIdx) => (
            <View key={tIdx} style={styles.workoutBox}>
              <Text style={styles.label}>CONFIGURAÇÃO DO DIA {treino.diaSemana}</Text>
              
              <TextInput 
                placeholder="Nome do Treino (ex: Quadríceps)" 
                style={styles.input} 
                placeholderTextColor="#71717a"
                onChangeText={(txt) => {
                    const nt = [...formData.Treinos];
                    nt[tIdx].nome = txt;
                    setFormData({...formData, Treinos: nt});
                }}
              />

              {/* NOVO CAMPO: DESCRIÇÃO DO TREINO DO DIA */}
              <TextInput 
                placeholder="Descrição do Dia (ex: Foco em força)" 
                style={[styles.input, { borderColor: '#10b981' }]} 
                placeholderTextColor="#71717a"
                onChangeText={(txt) => {
                    const nt = [...formData.Treinos];
                    nt[tIdx].descricao = txt;
                    setFormData({...formData, Treinos: nt});
                }}
              />

              {treino.nivelTreino.map((nivel, nIdx) => (
                <View key={nIdx} style={styles.nivelBox}>
                  <View style={styles.row}>
                    <Text style={styles.subLabel}>Nível {nivel.nivel}</Text>
                    <TouchableOpacity onPress={() => addFase(tIdx, nIdx)} style={styles.miniBtn}>
                      <Plus size={14} color="#fff" /><Text style={styles.btnText}>Exercício</Text>
                    </TouchableOpacity>
                  </View>

                  <TextInput 
                    placeholder="Descrição do Nível (Iniciante/Avançado...)" 
                    style={styles.input}
                    placeholderTextColor="#71717a"
                    onChangeText={(txt) => {
                        const nt = [...formData.Treinos];
                        nt[tIdx].nivelTreino[nIdx].descricao = txt;
                        setFormData({...formData, Treinos: nt});
                    }}
                  />

                  {nivel.fasesDoNivel.map((fase, fIdx) => (
                    <View key={fIdx} style={styles.faseBox}>
                      <TextInput 
                        placeholder="Nome do Exercício" 
                        style={styles.inputDark}
                        placeholderTextColor="#71717a"
                        onChangeText={(txt) => {
                            const nt = [...formData.Treinos];
                            nt[tIdx].nivelTreino[nIdx].fasesDoNivel[fIdx].titulo = txt;
                            setFormData({...formData, Treinos: nt});
                        }}
                      />
                      <View style={styles.row}>
                        <TextInput placeholder="Séries" keyboardType="numeric" style={[styles.inputDark, {flex: 0.4}]} onChangeText={(v)=> {
                            const nt = [...formData.Treinos];
                            nt[tIdx].nivelTreino[nIdx].fasesDoNivel[fIdx].serie = Number(v);
                            setFormData({...formData, Treinos: nt});
                        }}/>
                        <TextInput placeholder="Reps" keyboardType="numeric" style={[styles.inputDark, {flex: 0.4}]} onChangeText={(v)=> {
                            const nt = [...formData.Treinos];
                            nt[tIdx].nivelTreino[nIdx].fasesDoNivel[fIdx].repeticao = Number(v);
                            setFormData({...formData, Treinos: nt});
                        }}/>
                      </View>
                    </View>
                  ))}
                  <TouchableOpacity onPress={() => addNivel(tIdx)} style={styles.addNivelBtn}>
                    <Plus size={16} color="#10b981" /><Text style={styles.addNivelText}>Novo Nível</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}

          <TouchableOpacity onPress={addTreinoDia} style={[styles.addNivelBtn, {borderColor: '#fff', marginBottom: 20}]}>
              <Calendar size={20} color="#fff" />
              <Text style={{color: '#fff', marginLeft: 10}}>Adicionar Outro Dia (Dia {formData.Treinos.length + 1})</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : (
              <><Save size={20} color="#fff" /><Text style={styles.saveBtnText}>Salvar Tudo</Text></>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};