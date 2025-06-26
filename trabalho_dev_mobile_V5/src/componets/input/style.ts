import {StyleSheet} from 'react-native';
import {themes} from '../../global/themes';


export const styles = StyleSheet.create({
  boxInput:{
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: themes.colors.white,  //ou '#CCC' pr ter Borda cinza clara
    borderStyle: 'solid',
    marginTop:15, //ou 10
    flexDirection:'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFF', 
    paddingHorizontal: 10, 
    //minHeight: 45, // Altura base
  },

  inputLogin:{
    width: '100%',
    height: '100%',
    borderRadius: 30,
    
    color:  '#000', // Texto preto
    paddingHorizontal:10, //ou 8
    paddingRight:5,
    //borderColor:themes.colors.white,
    fontSize:20, //ou 16
    alignItems:'center',
    //borderWidth: 1,
    //borderColor: 'red', 
    //borderStyle: 'solid',
    //flex: 1,
    paddingVertical: 10,
    textAlignVertical: 'center',
  },

  titleInput:{
    marginLeft:5,
    color:themes.colors.gray,
    marginTop:20,
    fontWeight: 'bold',
    fontSize: 14,
  },

  Icon:{
    width:'100%',
    alignItems:'center',
    marginLeft:5,
    //borderWidth: 1,
    //borderColor: 'blue', // Cor da borda
    //borderStyle: 'solid',
    //marginRight: 5,
  
  },

  /*buttonIcon:{
    width:'10%',
  },*/
 
})
