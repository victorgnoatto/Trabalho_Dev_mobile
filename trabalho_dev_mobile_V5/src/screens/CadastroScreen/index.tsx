import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { supabase } from '../../services/supabaseClient';
import { styles } from './styles';
import { Input } from '../../componets/input/index';

export default function CadastroScreen() {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const handleCadastro = async () => {
    if (!login || !email || !senha) {
      setError('Preencha todos os campos');
      return;
    }

    // verificando se já existe login ou email
    const { data: existingUsers, error: checkError } = await supabase
      .from('usuarios')
      .select('*')
      .or(`login.eq.${login},email.eq.${email}`);

    if (checkError) {
      setError('Erro ao verificar usuário existente.');
      return;
    }

    if (existingUsers.length > 0) {
      setError('Login ou email já estão em uso.');
      return;
    }

    // inserindo novo usuário no supabase com o .insert
    const { error: insertError } = await supabase
      .from('usuarios')
      .insert([{ login, email, senha }]);

    if (insertError) {
      setError('Erro ao cadastrar: ' + insertError.message);
    } else {
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      setLogin('');
      setEmail('');
      setSenha('');
      navigation.navigate('Login');
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

    
      <Text style={styles.title}>Cadastro</Text>

      <View style={styles.areaInput}>
        <Input
          placeholder="Login"
          IconLeft={Ionicons}
          IconLeftName="person"
          placeholderTextColor="white"
          value={login}
          onChangeText={setLogin}
          boldTxtTransparent={true}
        />

        <Input
          placeholder="Email"
          IconLeft={MaterialIcons}
          IconLeftName="email"
          placeholderTextColor="white"
          value={email}
          onChangeText={setEmail}
          boldTxtTransparent={true}
        />

        <Input
          placeholder="Senha"
          IconLeft={MaterialIcons}
          IconLeftName="lock"
          IconRight={Octicons}
          IconRightName="eye-closed"
          placeholderTextColor="white"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
          boldTxtTransparent={true}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.areaButton}>
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
