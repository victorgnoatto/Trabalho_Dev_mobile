import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator,} from 'react-native';
import { supabase } from '../../services/supabaseClient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Header } from '../../componets/Header/index'; 
import { styles } from './styles';

export default function EditNoteScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // ecebe o ID da nota via parâmetros da rota
  const { noteId } = route.params as { noteId: number };

  
  const [noteContent, setNoteContent] = useState('');

  
  const [loading, setLoading] = useState(true);

  
  async function fetchNote() {
    setLoading(true);

    const { data, error } = await supabase
      .from('blocos_notas')
      .select('conteudo') // apenas o campo "conteudo"
      .eq('id', noteId)
      .single(); 

    if (error) {
      console.log('Erro ao buscar a nota:', error.message);
      Alert.alert('Erro', 'Não foi possível carregar a nota.');
      navigation.goBack(); 
    } else {
      setNoteContent(data.conteudo);
    }

    setLoading(false);
  }


  useEffect(() => {
    fetchNote();
  }, []);

  
  async function handleSave() {
    if (noteContent.trim() === '') {
      Alert.alert('Atenção', 'O conteúdo da nota não pode estar vazio.');
      return;
    }

    const { error } = await supabase
      .from('blocos_notas')
      .update({ conteudo: noteContent })
      .eq('id', noteId); // atualiza a nota com base no ID

    if (error) {
      console.log('Erro ao salvar a nota:', error.message);
      Alert.alert('Erro', 'Não foi possível salvar a nota.');
    } else {
      Alert.alert('Sucesso', 'Nota atualizada com sucesso!');
      navigation.goBack(); 
    }
  }


  async function handleDelete() {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const { error } = await supabase
              .from('blocos_notas')
              .delete()
              .eq('id', noteId);

            if (error) {
              console.log('Erro ao excluir a nota:', error.message);
              Alert.alert('Erro', 'Não foi possível excluir a nota.');
            } else {
              Alert.alert('Excluído', 'Nota excluída com sucesso!');
              navigation.goBack(); 
            }
          },
        },
      ]
    );
  }

  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
     
      <View style={styles.fullHeader}>
        <Header />
      </View>

      
      <View style={styles.container}>
        <Text style={styles.title}>Editar Nota</Text>

       
        <TextInput
          style={styles.textInput}
          multiline
          value={noteContent}
          onChangeText={setNoteContent}
        />

       
        <View style={styles.buttonRow}>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}



