import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  logoArea: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoIcon: {
    fontSize: 90,
    color: '#1E90FF',
    marginBottom: 10,
  },

  logoText: {
    fontSize: 40,
    color: '#1E90FF',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 20,
  },

  areaInput: {
    width: '100%',
    marginBottom: 20,
    padding:20,
  },

  areaButton: {
    width: '90%',
    marginBottom: 20,
    padding:20,
  },

  error: {
    color: '#FF6B6B', // vermelho mais claro para erro
    marginBottom: 10,
    textAlign: 'center',
  },

  button: {
    width: '100%',
    backgroundColor: '#0066CC', // azul mias forte
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  link: {
    color: '#fff',
    //marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize:15,
  },
});
