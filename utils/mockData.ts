import { Workout } from './types';

export const MOCK_WORKOUT: Workout = {
  id: '1',
  title: 'Treino A - Peito e Tríceps',
  duration: '45 min',
  calories: '320 kcal',
  exercises: [
    { id: 'e1', name: 'Supino Reto', sets: 4, reps: '12', weight: '60kg', completed: false },
    { id: 'e2', name: 'Supino Inclinado Halteres', sets: 3, reps: '10', weight: '22kg', completed: false },
    { id: 'e3', name: 'Crucifixo Máquina', sets: 3, reps: '15', weight: '45kg', completed: false },
    { id: 'e4', name: 'Tríceps Pulley', sets: 4, reps: '12', weight: '30kg', completed: false },
    { id: 'e5', name: 'Tríceps Corda', sets: 3, reps: '15', weight: '20kg', completed: false },
  ]
};
