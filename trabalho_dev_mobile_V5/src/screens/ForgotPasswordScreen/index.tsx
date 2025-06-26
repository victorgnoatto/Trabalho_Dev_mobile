// src/pages/ForgotPasswordScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../services/supabaseClient';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles'; // Se você já estiver usando um styles compartilhado
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, Octicons } from '@expo/vector-icons';



export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      setError('Por favor, preencha o e-mail');
      return;
    }

    // envio de recuperação de senha pelo Supabase, aparentemente não tem como por limitações do proprio Snack
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setError('Erro ao enviar link de recuperação: ' + error.message);
    } else {
      Alert.alert('Sucesso', 'Link de redefinição de senha enviado para o e-mail.');
      navigation.goBack();
    }
  };

  return (
    <LinearGradient
      colors={['#1E90FF', '#87CEFA']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
  
      <View style={styles.logoArea}>
        <MaterialIcons name="school" style={styles.logoIcon} />
        <Text style={styles.logoText}>Learn More</Text>
      </View>

      
      <Text style={styles.title}>Recuperar Senha</Text>

      <TextInput
        placeholder="Digite seu e-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Enviar Link de Recuperação</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar para o Login</Text>
      </TouchableOpacity>


    </LinearGradient>
    
  );
}
