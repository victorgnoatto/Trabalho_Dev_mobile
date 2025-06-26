import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';
import { themes } from '../../global/themes';
import { useAuth } from '../../context/authContext_list';
import { style } from './styles';
import { LinearGradient } from 'expo-linear-gradient'; 

// Componente da barra de navegação inferior 
export default ({ state, navigation }) => {
  const { openModal } = useAuth(); // acessa o contexto para abrir o modal

  // função de navegação para a tela indicada
  const go = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (

    <LinearGradient
      colors={['#1E90FF', '#87CEFA']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style.tabArea}
    >
     
      <TouchableOpacity style={style.tabItem} onPress={() => go("Home")}>
        <AntDesign
          name="bars"
          style={{
            fontSize: 32,
            color: themes.colors.white,
            opacity: state.index === 0 ? 1 : 0.5, // destaca se estiver na tab ativa
          }}
        />
      </TouchableOpacity>


      <TouchableOpacity style={style.tabItemButtom} onPress={openModal}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Entypo name='plus' style={{ fontSize: 40, color: '#FFF' }} />
        </View>
      </TouchableOpacity>

  
      <TouchableOpacity style={style.tabItem} onPress={() => go("User")}>
        <FontAwesome
          name="users"
          style={{
            fontSize: 32,
            color: themes.colors.white,
            opacity: state.index === 1 ? 1 : 0.5,
          }}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};
