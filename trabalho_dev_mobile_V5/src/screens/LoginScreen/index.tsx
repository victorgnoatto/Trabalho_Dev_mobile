import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { supabase } from '../../services/supabaseClient';
import { saveUserSession } from '../../services/session';
import { styles } from './styles';
import { Input } from '../../componets/input/index';

export default function LoginScreen() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  async function handleLogin() {
    if (!login || !senha) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('login', login)
        .eq('senha', senha)
        .single();

      if (error || !data) {
        setError('Login ou senha inválidos');
      } else {
        setError('');

        // salvando os dados do usuário localmente (AsyncStorage)
        await saveUserSession({
          id: data.id,
          login: data.login,
          email: data.email, 
        });

        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.reset({
          routes: [{ name: 'BottomRoutes' }],
        });
      }
    } catch (err) {
      console.error('Erro ao logar:', err);
      setError('Erro inesperado. Tente novamente.');
    }
  }

  return (
    <LinearGradient
      colors={['#1E90FF', '#87CEFA']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >

      <View style={styles.logoArea}>
        <MaterialIcons name="school" style={styles.logoIcon} />
        <Text style={styles.logoText}>Learn More</Text>
      </View>

      <Text style={styles.title}>Login</Text>

      <View style={styles.areaInput}>
        <Input
          
          placeholderTextColor="white"
          placeholder="Login"
          IconLeft={Ionicons}
          IconLeftName="person"
          boldTxtTransparent={true} //usa a cor bold
          value={login}
          onChangeText={setLogin}
          borderColor='#ffffff'
        />

        <Input
          placeholder="Senha"
          IconLeft={MaterialIcons}
          IconLeftName="lock"
          IconRight={Octicons}
          IconRightName={showPassword ? 'eye-closed' : 'eye'}
          placeholderTextColor="white"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={showPassword}
          onIconRightPress={() => setShowPassword(!showPassword)}
          boldTxtTransparent={true}
          borderColor='#ffffff'
        />

      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.buttoLogin} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>Não tem uma conta?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>


    </LinearGradient>
  );
}
