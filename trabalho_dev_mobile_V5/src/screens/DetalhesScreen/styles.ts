import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    flexGrow: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
  },
  imagemContainer: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
    marginBottom: 12,
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  imagemIndisponivel: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  textoIndisponivel: {
    marginTop: 16,
    color: '#555',
    textAlign: 'center',
    fontSize: 16,
  },
  nivelButton: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginVertical: 8,
  },
  nivelBasico: {
    backgroundColor: 'green',
  },
  nivelIntermediario: {
    backgroundColor: 'gold',
  },
  nivelAvancado: {
    backgroundColor: 'red',
  },
  nivelDefault: {
    backgroundColor: '#ccc',
  },
  nivelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 16,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
  },
  linkButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  viewbacktohome:{
    marginTop: 15,
  },

  loadingContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
