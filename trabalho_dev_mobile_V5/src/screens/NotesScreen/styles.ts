import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,                      
    width: '100%',               
    backgroundColor: '#F5F5F5',  
  },
  emptyText: {
    color: 'rgba(43, 82, 74, 0.5)',        
    fontStyle: 'italic',         
    marginLeft: 16,
  },
  noteItem: {
    backgroundColor: '#FFF',     
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    marginHorizontal: 16,        
  },
  noteIndex: {
    fontWeight: 'bold',          
    marginBottom: 4,
  },

  viewtop:{
    marginBottom: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 20,                
    fontWeight: 'bold',           
    //marginBottom: 16,
    //marginLeft: 16,
    color: '#1E90FF',              
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', 
  },
  
});