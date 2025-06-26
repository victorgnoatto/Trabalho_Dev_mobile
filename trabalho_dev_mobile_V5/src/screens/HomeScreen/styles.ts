import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 40,
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    alignItems: 'center',
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 8,
  },
  titulo: {
    fontSize: 14,
    marginBottom: 6,
  },
  nivelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nivelButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  nivelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
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
    backgroundColor: '#888',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  botaoNotas: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#87CEFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoCriarCurso: {
    backgroundColor: '#8BC34A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  botaoCriarCursoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imagemIndisponivel: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  },
  textoIndisponivel: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 4,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', 
  },

});
