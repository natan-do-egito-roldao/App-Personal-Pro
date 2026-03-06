import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b', padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  mainTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  card: { backgroundColor: '#18181b', padding: 15, borderRadius: 12, marginBottom: 20 },
  workoutBox: { backgroundColor: '#18181b', padding: 15, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#10b981' },
  nivelBox: { backgroundColor: '#27272a', padding: 10, borderRadius: 8, marginTop: 10 },
  faseBox: { backgroundColor: '#18181b', padding: 10, borderRadius: 6, marginTop: 8 },
  input: { backgroundColor: '#27272a', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#3f3f46' },
  inputDark: { backgroundColor: '#09090b', color: '#fff', padding: 10, borderRadius: 6, marginBottom: 5 },
  label: { color: '#10b981', fontWeight: 'bold', marginBottom: 10, fontSize: 14, textTransform: 'uppercase' },
  subLabel: { color: '#fff', fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  miniBtn: { flexDirection: 'row', backgroundColor: '#10b981', padding: 6, borderRadius: 4, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 11, marginLeft: 4, fontWeight: 'bold' },
  addNivelBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15, borderStyle: 'dashed', borderWidth: 1, borderColor: '#10b981', padding: 12, borderRadius: 8 },
  addNivelText: { color: '#10b981', marginLeft: 8, fontSize: 12 },
  saveBtn: { backgroundColor: '#10b981', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 18, borderRadius: 12 },
  saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 10 }
});