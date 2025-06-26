import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding:24,
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
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },

  error: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
    fontSize:15,
  },

  areaInput:{
    width: '100%', 
    padding:20,
    //justifyContent: 'center',
  },

  buttoLogin:{
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    //marginTop: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },

  link: {
    color: 'white',
    marginTop: 12,
    marginBottom:12,
    textAlign: 'center',
    fontSize: 15,
  },
});
