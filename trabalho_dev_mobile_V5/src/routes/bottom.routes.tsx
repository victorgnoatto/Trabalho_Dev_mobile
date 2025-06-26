import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../componets/CustomTabBar/index';
import HomeScreen from '../screens/HomeScreen/index';
import UserScreen from '../screens/UserScreen/index';
import { AuthProviderList } from '../context/authContext_list';

const Tab = createBottomTabNavigator();

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}

export default function BottomRoutes() {
  return (
    <AuthProviderList>
      <TabScreens />
    </AuthProviderList>
  );
}
