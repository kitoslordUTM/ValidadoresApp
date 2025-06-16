import { StyleSheet } from 'react-native';
import * as Index from '../../index/index';

const {hp, wp} = Index
// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('1%'),
  },
   
  tabContainer: {
    paddingHorizontal: 16,
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabButton: {
    paddingVertical: wp('2%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: '#d4ceaa',
    borderRadius: 20,
  },
  tabText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: '#ef7f4a',
    backgroundColor: '#cc3917',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  contentContainer: {
    width:'100%',
    height:'100%' // Permite que esta vista ocupe todo el espacio restante
  },
  content: {
    width:'100%',
    height:'100%',
    paddingBottom: 200,
  },
});

export default styles;
