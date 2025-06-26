import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator, Linking, TouchableOpacity, ScrollView,} from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../services/supabaseClient';
import BackToHomeButton from '../../componets/BackToHomeButton/index';
import { styles } from './styles';


export default function DetalhesScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { cursoId } = route.params;  // ID do curso recebido da tela anterior

  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch == buscar 
  async function fetchCurso() {
    setLoading(true);
    const { data, error } = await supabase
      .from('cursoslm')   // acessa a tabela 'cursoslm' no Supabase
      .select('*')       // seleciona todos os campos da tabela
      .eq('id', cursoId)  // filtra para pegar o curso com o id igual ao recebido por parâmetro
      .single();         // espera apenas 1 resultado (não uma lista).



    if (error) {
      console.log('Erro ao buscar curso:', error.message);
    } else {
      setCurso(data);
    }
    setLoading(false);
  }

  // carregas os cursos ao abrir a tela pela primeira vez
  useEffect(() => {
    fetchCurso();
  }, [cursoId]);

  // recarregar a tela
  useFocusEffect(
    useCallback(() => {
      fetchCurso();
    }, [cursoId])
  );


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  if (!curso) {
    return <Text>Curso não encontrado.</Text>;
  }

  function handleOpenLink() {
    if (curso.link) {
      Linking.openURL(curso.link);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.imagemContainer}>
        {curso.imagens ? (
          <Image source={{ uri: curso.imagens }} style={styles.imagem} resizeMode="cover" />
        ) : (
          <View style={styles.imagemIndisponivel}>
            <Text style={styles.textoIndisponivel}>Capa Indisponível</Text>
          </View>
        )}
      </View>

      <Text style={styles.titulo}>{curso.titulo}</Text>

      <View
        style={[
          styles.nivelButton,
          curso.nivel === 'Básico'
            ? styles.nivelBasico
            : curso.nivel === 'Intermediário'
            ? styles.nivelIntermediario
            : curso.nivel === 'Avançado'
            ? styles.nivelAvancado
            : styles.nivelDefault,
        ]}
      >
        <Text style={styles.nivelButtonText}>{curso.nivel}</Text>
      </View>

 
      <Text style={styles.label}>Instrutor:</Text>
      <Text>{curso.instrutor}</Text>

      
      <Text style={styles.label}>Descrição:</Text>
      <Text>{curso.descricao}</Text>

      {curso.link ? (
        <TouchableOpacity style={styles.linkButton} onPress={handleOpenLink}>
          <Text style={styles.linkButtonText}>Acessar Página do Curso</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.textoIndisponivel}>Link não disponível</Text>
      )}

      
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditCourse', { cursoId })}
      >
        <Text style={styles.editButtonText}>Editar Curso</Text>
      </TouchableOpacity>

      <View style={styles.viewbacktohome}>
        <BackToHomeButton />
      </View>
    </ScrollView>
  );
}


