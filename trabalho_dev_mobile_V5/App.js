//Trabalho Dispositívos Móveis - Prof. Orientador = Henrique Mota
// Projeto: "Learn More"
//Equipe:
// Cleber Sena - 202203340441
// Ítalo Medeiros - 202303926952
// Renan Colaço - 202203467931
// Victor Gnoatto - 202108145432

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index.routes';

//https://github.com/jeremybarbet/react-native-modalize para fazer os modals

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProviderList } from './src/context/authContext_list'; 


export default function App() {
  return (
    <AuthProviderList>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProviderList>
  );
}
