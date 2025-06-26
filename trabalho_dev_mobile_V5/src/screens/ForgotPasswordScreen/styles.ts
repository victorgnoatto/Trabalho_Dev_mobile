import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 32,
    color: '#1E90FF',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },

  input: {
    width: '90%',
    height: 48,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#000',
  },

  button: {
    backgroundColor: '#2F80ED',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    width: '90%',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  link: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 16,
    textDecorationLine: 'underline',
    fontSize:15,
  },

  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});
