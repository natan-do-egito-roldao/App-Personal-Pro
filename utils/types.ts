export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  completed: boolean;
}

export interface Workout {
  id: string;
  title: string;
  duration: string;
  calories: string;
  exercises: Exercise[];
}

export type ViewType = 'login' | 'home' | 'workout';
