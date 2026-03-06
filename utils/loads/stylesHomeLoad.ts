import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },

  // Login Styles
  loginContainer: {
    backgroundColor: '#09090b',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginContent: {
    width: W,
    maxWidth: W * 0.98,
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#fdfdfd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: -1,
  },
  logoSubtext: {
    fontSize: 14,
    color: '#a1a1aa',
    marginTop: 4,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#a1a1aa',
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#8d8d8d',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#09090b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  SaveContainer: {
    paddingTop: H * 0.01,
    flexDirection: 'row',
    justifyContent:'flex-end',
    gap: W * 0.03
  },
  loginButtonSave: {
    backgroundColor: '#b4b4b4',
    borderRadius: 5,
    padding: 0,
    height: H * 0.03,
    width: W * 0.06,
    alignSelf:'center'
  },
  loginButtonTextSave: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf:'center'
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
    color: '#a1a1aa',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#27272a',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Stats Grid Styles
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#18181b',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#52525b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  // Section Styles
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },

  // Workout Card Styles
  workoutCard: {
    backgroundColor: '#18181b',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#27272a',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  workoutCardContent: {
    flex: 1,
    zIndex: 1,
    gap: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  badgeText: {
    color: '#10b981',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  workoutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  workoutSubtext: {
    fontSize: 14,
    color: '#a1a1aa',
  },
  startNow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  startNowText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: 'bold',
  },
  workoutCardIcon: {
    position: 'absolute',
    right: -10,
    top: -10,
    opacity: 0.1,
  },

  // Chart Styles
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
    gap: 8,
  },
  chartBarContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  chartBar: {
    width: '100%',
    backgroundColor: '#27272a',
    borderRadius: 4,
  },
  chartBarActive: {
    backgroundColor: '#10b981',
  },
  chartLabel: {
    fontSize: 10,
    color: '#52525b',
    fontWeight: 'bold',
  },

  // Workout Progress Styles
  finishButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
  progressCard: {
    backgroundColor: '#18181b',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    marginBottom: 24,
    gap: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 14,
    color: '#a1a1aa',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#27272a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },

  // Rest Card Styles
  restCard: {
    backgroundColor: '#10b981',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  restInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  restLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#09090b',
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  restTimer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#09090b',
    fontFamily: 'monospace',
  },
  skipButton: {
    backgroundColor: '#09090b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Exercise List Styles
  exerciseList: {
    gap: 12,
  },
  exerciseCard: {
    backgroundColor: '#18181b',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseCardCompleted: {
    opacity: 0.5,
    borderColor: 'transparent',
  },
  exerciseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3f3f46',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  exerciseNameCompleted: {
    textDecorationLine: 'line-through',
    color: '#71717a',
  },
  exerciseDetails: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 2,
  },

  // Navigation Bar Styles
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(9, 9, 11, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingBottom: 24,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#52525b',
    textTransform: 'uppercase',
  },
  navTextActive: {
    color: '#10b981',
  },
});
