import {StyleSheet} from 'react-native';
import {themes} from '../../global/themes';

export const styles = StyleSheet.create({

  buttonContainer: {
    marginTop: 0,          
    borderRadius: 25,
    overflow: 'hidden',
    alignSelf: 'flex-end',  

  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 15,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8, 
  },
});

  
