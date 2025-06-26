import {StyleSheet} from 'react-native';
import {themes} from '../../global/themes';

// Link para gerar o sombreado: https://ethercreative.github.io/react-native-shadow-generator/


export const style = StyleSheet.create({

  tabArea:{
    backgroundColor:themes.colors.white,
    flexDirection:'row',
    height: 100,
    justifyContent: 'space-around',
    //borderWidth: 2, // Largura da borda
    //borderColor: 'red', // Cor da borda
    //borderStyle: 'solid',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
},
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    
  },
  
  tabItem:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
  },

  tabItemButtom:{
    width:70,
    height:70,
    borderRadius:35,
    alignItems:'center',
    justifyContent:'center',
    zIndex:9999,
    top:-10,
    backgroundColor: themes.colors.primary,
  },

})