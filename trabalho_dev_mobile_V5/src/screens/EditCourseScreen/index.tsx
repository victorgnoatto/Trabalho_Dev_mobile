import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert,
ScrollView, } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { supabase } from '../../services/supabaseClient';
import { styles } from './styles';

export default function EditCourseScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { cursoId } = route.params;

  const [titulo, setTitulo] = useState('');
  const [instrutor, setInstrutor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nivel, setNivel] = useState('');
  const [link, setLink] = useState('');
  const [imagens, setImagens] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCurso() {
      const { data, error } = await supabase
        .from('cursoslm')
        .select('*')
        .eq('id', cursoId)
        .single();

      if (error) {
        console.error('Erro ao buscar curso:', error.message);
        Alert.alert('Erro', 'Não foi possível carregar os dados do curso.');
      } else {
        setTitulo(data.titulo);
        setInstrutor(data.instrutor);
        setDescricao(data.descricao);
        setNivel(data.nivel);
        setLink(data.link);
        setImagens(data.imagens);
      }

      setLoading(false);
    }

    fetchCurso();
  }, [cursoId]);

  async function handleSave() {
    const { error } = await supabase
      .from('cursoslm')
      .update({
        titulo,
        instrutor,
        descricao,
        nivel,
        link,
        imagens,
      })
      .eq('id', cursoId);

    if (error) {
      console.error('Erro ao salvar alterações:', error.message);
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    } else {
      Alert.alert('Sucesso', 'Curso atualizado com sucesso!');
      navigation.goBack();
    }
  }

  function confirmDelete() {
    Alert.alert(
      'Excluir Curso',
      'Tem certeza que deseja excluir este curso?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: handleDelete },
      ]
    );
  }

  async function handleDelete() {
    const { error } = await supabase
      .from('cursoslm')
      .delete()
      .eq('id', cursoId);

    if (error) {
      console.error('Erro ao excluir curso:', error.message);
      Alert.alert('Erro', 'Não foi possível excluir o curso.');
    } else {
      Alert.alert('Sucesso', 'Curso excluído com sucesso!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomRoutes' }],
      });
      //navigation.goBack();
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Curso</Text>

      <Text style={styles.label}>Título:</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text style={styles.label}>Instrutor:</Text>
      <TextInput style={styles.input} value={instrutor} onChangeText={setInstrutor} />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      
      <Text style={styles.label}>Nível:</Text>
      <View style={styles.nivelContainer}>
        <TouchableOpacity
          style={[
            styles.nivelButton,
            { backgroundColor: nivel === 'Básico' ? 'green' : '#E0E0E0' }
          ]}
          onPress={() => setNivel('Básico')}
        >
          <Text style={styles.nivelButtonText}>Básico</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.nivelButton,
            { backgroundColor: nivel === 'Intermediário' ? 'gold' : '#E0E0E0' }
          ]}
          onPress={() => setNivel('Intermediário')}
        >
          <Text style={styles.nivelButtonText}>Intermediário</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.nivelButton,
            { backgroundColor: nivel === 'Avançado' ? 'red' : '#E0E0E0' }
          ]}
          onPress={() => setNivel('Avançado')}
        >
          <Text style={styles.nivelButtonText}>Avançado</Text>
        </TouchableOpacity>
      </View>



      <Text style={styles.label}>Link:</Text>
      <TextInput style={styles.input} value={link} onChangeText={setLink} />

      <Text style={styles.label}>URL da Imagem:</Text>
      <TextInput style={styles.input} value={imagens} onChangeText={setImagens} />

      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
        <Text style={styles.deleteButtonText}>Excluir Curso</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

