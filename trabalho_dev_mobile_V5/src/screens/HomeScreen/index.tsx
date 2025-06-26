import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { supabase } from '../../services/supabaseClient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../../componets/Header/index';
import { useAuth } from '../../context/authContext_list';


export default function CursosList() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const { notes } = useAuth();
  const navigation = useNavigation();

  async function fetchCursos() {
    setLoading(true);
    const { data, error } = await supabase.from('cursoslm').select('*');
    if (error) {
      console.log('Erro ao buscar cursos:', error.message);
    } else {
      setCursos(data);
    }
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchCursos();
    }, [])
  );

  const filteredCursos = cursos.filter((curso) =>
    curso.titulo.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detalhes', { cursoId: item.id })}
      style={styles.card}
    >
      {item.imagens ? (
        <Image
          source={{ uri: item.imagens }}
          style={styles.imagem}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.imagem, styles.imagemIndisponivel]}>
          <Text style={styles.textoIndisponivel}>Capa Indisponível</Text>
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={styles.titulo}>
          <Text style={{ fontWeight: 'bold' }}>Título:</Text> {item.titulo}
        </Text>

        <View style={styles.nivelRow}>
          <Text style={{ fontWeight: 'bold' }}>Nível: </Text>
          <View style={[
            styles.nivelButton,
            item.nivel === 'Básico' ? styles.nivelBasico :
            item.nivel === 'Intermediário' ? styles.nivelIntermediario :
            item.nivel === 'Avançado' ? styles.nivelAvancado : styles.nivelDefault
          ]}>
            <Text style={styles.nivelButtonText}>{item.nivel}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />

      <Text style={{ fontWeight: 'bold',fontSize: 15, marginLeft: 17,}}>Cursos Disponíveis</Text>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar por título..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredCursos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum curso encontrado</Text>}
      />

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botaoNotas}
          onPress={() => navigation.navigate('Notes')}
        >
          <MaterialIcons name="edit-note" size={30} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCriarCurso}
          onPress={() => navigation.navigate('CourseBuilding')}
        >
          <Text style={styles.botaoCriarCursoText}>Criar cursos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

