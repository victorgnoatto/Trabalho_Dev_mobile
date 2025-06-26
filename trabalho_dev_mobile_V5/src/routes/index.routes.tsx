import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen/index';
import CadastroScreen from '../screens/CadastroScreen';
import DetalhesScreen from '../screens/DetalhesScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/index';
import CourseBuildingScreen from '../screens/CourseBuildingScreen/index';
import NotesScreen from '../screens/NotesScreen/index';
import BottomRoutes from './bottom.routes'; // importa o tab navigator
import EditNoteScreen from '../screens/EditNoteScreen/index';
import EditCourseScreen from '../screens/EditCourseScreen/index';

const Stack = createNativeStackNavigator();
//o Stack é criado fora da função Routes,pelo que vi rapaziada é mais recomenddo assim porque evita a criação repetida do navigator em cada renderização. "Se for dentro da função, toda vez que o componente for renderizado, o createStackNavigator() é chamado novamente."

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="BottomRoutes" component={BottomRoutes} /> 
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
      <Stack.Screen name="CourseBuilding" component={CourseBuildingScreen} />
      <Stack.Screen name="Notes" component={NotesScreen} />
      <Stack.Screen name="EditNote"component={EditNoteScreen}/>
      <Stack.Screen name="EditCourse" component={EditCourseScreen}/>
    </Stack.Navigator>
  );
}
