import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { supabase } from '../../services/supabaseClient';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

export default function CourseBuildingScreen() {
  const [titulo, setTitulo] = useState('');
  const [nivel, setNivel] = useState('');
  const [instrutor, setInstrutor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagens, setImagens] = useState('');
  const [link, setLink] = useState('');  
  const navigation = useNavigation();

  async function criarCurso() {
    // validação simples pra nao deixa ros capos em branco
    if (!titulo.trim() || !nivel || !instrutor.trim() || !descricao.trim() || !imagens.trim() || !link.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos, incluindo o link.');
      return;
    }

    const { data, error } = await supabase.from('cursoslm').insert([
      { titulo, nivel, instrutor, descricao, imagens, link }  
    ]);

    if (error) {
      console.log('Erro ao criar curso:', error.message);
      Alert.alert('Erro', 'Não foi possível criar o curso.');
    } else {
      Alert.alert('Sucesso', 'Curso criado com sucesso!');
      navigation.navigate('Home');  // mandar de voltao para Home após criar
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>Editar Curso</Text>

      <Text style={styles.label}>Título do Curso:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Digite o título"
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

      <Text style={styles.label}>Instrutor:</Text>
      <TextInput
        style={styles.input}
        value={instrutor}
        onChangeText={setInstrutor}
        placeholder="Nome do instrutor"
      />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição do curso"
        multiline
      />

      <Text style={styles.label}>URL da Imagem:</Text>
      <TextInput
        style={styles.input}
        value={imagens}
        onChangeText={setImagens}
        placeholder="Link da imagem no Supabase Storage"
      />

      <Text style={styles.label}>Link do Curso (site):</Text>
      <TextInput
        style={styles.input}
        value={link}
        onChangeText={setLink}
        placeholder="Exemplo: https://meusite.com/curso"
      />

      <TouchableOpacity style={styles.botao} onPress={criarCurso}>
        <Text style={styles.botaoTexto}>Criar Curso</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoTexto}>Voltar ao Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


