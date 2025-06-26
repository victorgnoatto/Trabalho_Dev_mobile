import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    flexGrow: 1,
    //justifyContent:'center',
    marginTop:40, // ou deixa o justifyContent:'center' mesmo
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1E90FF',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFF',
  },

  nivelContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 8,
},

  nivelButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    alignItems: 'center',
  },

  nivelButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },

  saveButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: 12,
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5F5F5', 
  },
});