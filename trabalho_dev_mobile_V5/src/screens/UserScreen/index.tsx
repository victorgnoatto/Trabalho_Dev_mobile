import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../../services/supabaseClient'; 
import { getUserSession, clearUserSession } from '../../services/session'; 
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function UserScreen() {
  
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newLogin, setNewLogin] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    loadUserData();
  }, []);


  async function loadUserData() {
    try {
      const session = await getUserSession(); // recupera o ID salvo localmente no AsyncStorage

      if (!session) {
        console.warn('Nenhum usuário logado encontrado.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', session.id)
        .single();

      if (error) {
        console.error('Erro ao buscar usuário:', error);
      } else {
        setUserData(data);
        setNewLogin(data.login); 
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!newLogin.trim()) {
      Alert.alert('Erro', 'O nome de usuário não pode ser vazio.');
      return;
    }

    try {
      const { error } = await supabase
        .from('usuarios')
        .update({ login: newLogin })
        .eq('id', userData.id);     

      if (error) {
        console.error('Erro ao atualizar:', error);
        Alert.alert('Erro', 'Não foi possível atualizar o nome.');
      } else {
        Alert.alert('Sucesso', 'Nome de usuário atualizado!');
        
        await AsyncStorage.mergeItem('user', JSON.stringify({ login: newLogin }));
        setEditing(false); 
        loadUserData(); 
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
    }
  }

 
  async function handleLogout() {
    await clearUserSession(); 
    Alert.alert('Logout', 'Você saiu da sua conta.');
    navigation.reset({
      routes: [{ name: 'Login' }],
    });
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    
    <View style={styles.container}>

      <View style={styles.profileContainer}>
        <Image
          source={
            userData?.['imagem-perfil']
              ? { uri: userData['imagem-perfil'] }
              : { uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' } 
          }
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <MaterialIcons name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>
          <Text style={styles.bold}>Nome de Usuário:</Text>
        </Text>

        {editing ? (
          <>
            <TextInput
              value={newLogin}
              onChangeText={setNewLogin}
              style={styles.input}
              placeholder="Digite o novo nome de usuário"
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.value}>{userData?.login || 'Não encontrado'}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
              <MaterialIcons name="edit" size={20} color="white" />
              <Text style={styles.editButtonText}>Editar Nome</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.label}>
          <Text style={styles.bold}>Email:</Text>
        </Text>
        <Text style={styles.value}>{userData?.email || 'Não encontrado'}</Text>


        <TouchableOpacity onPress={handleLogout} style={styles.botaoLogout}>
          <MaterialIcons name="logout" size={20} color="white" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}