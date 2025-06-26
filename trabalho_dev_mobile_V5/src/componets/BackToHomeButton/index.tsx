import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AppIcon from '../AppIcons/index';
import {styles} from './styles';


export default function BackToHomeButton() {
  const navigation = useNavigation();

  function handleGoHome() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomRoutes' }],
    });
  }

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleGoHome}>
      <LinearGradient
        colors={['#1E90FF', '#87CEFA']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <AppIcon
            type="Ionicons"
            name="arrow-back"
            size={20}
            color="#FFF"
          />
          <Text style={styles.buttonText}>Voltar para Home</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

