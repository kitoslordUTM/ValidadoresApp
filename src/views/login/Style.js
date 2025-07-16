import { StyleSheet } from 'react-native';
import { hp } from '../../index';

const Styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    minHeight: '100%', // ✅ evita scroll extra en pantallas pequeñas
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    flexGrow: 1,  
   
  },
  background: {
    flexGrow: 1, // ✅ mejor que flex: 1 para evitar estiramiento excesivo
  },
  logo: {
    height: 200,
    width: '100%',
    backgroundColor: '#FF4500',
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 180,
  },
  container: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
  },
  welcome: {
    fontSize: 28,
    fontWeight: '600',
    alignSelf: 'center',
    color: 'black',
    marginBottom:hp(6)
  },
});

export default Styles;
