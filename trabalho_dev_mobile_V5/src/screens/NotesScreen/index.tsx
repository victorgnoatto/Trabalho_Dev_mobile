import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { supabase } from '../../services/supabaseClient'; 
import { styles } from './styles';            
import { Header } from '../../componets/Header/index';                
import { getUserSession } from '../../services/session';              
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import BackToHomeButton from '../../componets/BackToHomeButton/index';


export default function NotesScreen() {

  const [notes, setNotes] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  async function fetchNotes() {
    setLoading(true); 

    const userSession = await getUserSession();

    if (!userSession) {
      console.log('Usuário não encontrado');
      setLoading(false);
      return;
    }

    const { id: userId } = userSession;

    // Faz a consulta na tabela 'blocos_notas' filtrando pelas notas do usuário logado
    const { data, error } = await supabase
      .from('blocos_notas')
      .select('*')                         
      .eq('user_id', userId)              
      .order('created_at', { ascending: true }); 

    if (error) {
      console.log('Erro ao buscar notas:', error.message);
    } else {
      setNotes(data);
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [])
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

      <View style={styles.viewtop}>
        <Text style={styles.title}>Minhas Anotações</Text>
        <BackToHomeButton />
      </View>

      {notes.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma anotação salva.</Text>
      ) : (
        <FlatList
          data={notes}                           
          keyExtractor={(item) => item.id.toString()}   

          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.noteItem}                
              onPress={() => navigation.navigate('EditNote', { noteId: item.id })}  
            >
              
              <Text style={styles.noteIndex}>Nota {index + 1}:</Text>

              <Text numberOfLines={2}>{item.conteudo}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      
    </View>
  );
}

