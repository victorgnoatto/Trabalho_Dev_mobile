// context/authContext_list.tsx
import React, { createContext, useContext, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { supabase } from '../services/supabaseClient';
import { getUserSession } from '../services/session';


const AuthContextList = createContext(null);

export const AuthProviderList = ({ children }) => {
  const [noteText, setNoteText] = useState(''); 
  const modalRef = useRef<Modalize>(null);     // referência para o Modalize

  const openModal = () => modalRef.current?.open();
  const closeModal = () => modalRef.current?.close();

  // const da altura da tela
  const screenHeight = Dimensions.get('window').height;

  const addNote = async () => {
    if (noteText.trim() === '') return;

    const userSession = await getUserSession();
    if (!userSession) {
      console.log('Usuário não identificado');
      return;
    }

    const { id } = userSession;
    const { error } = await supabase.from('blocos_notas').insert([
      {
        conteudo: noteText,
        user_id: id,
      },
    ]);

    if (error) {
      console.log('Erro ao salvar anotação:', error.message);
    } else {
      console.log('Nota salva com sucesso');
      setNoteText('');
      Alert.alert('Sucesso', 'Nota salva com sucesso!');
      closeModal();
    }
  };

  return (
    <AuthContextList.Provider
      value={{ openModal, closeModal, noteText, setNoteText, addNote }}>

      <GestureHandlerRootView style={{ flex: 1 }}>
        {children}

        
        <Modalize
          ref={modalRef}
          withHandle
          modalHeight={screenHeight * 0.9} // 90% da altura da tela
          modalStyle={styles.modalContainer}
        >
          

          
          <View style={styles.modalHeader}>
            
            <TouchableOpacity onPress={closeModal}>
              <MaterialIcons name="close" size={30} color="#1E90FF" />
            </TouchableOpacity>

           
            <Text style={styles.modalTitle}>Bloco de Notas</Text>

            
            <TouchableOpacity onPress={addNote}>
              <FontAwesome name="check" size={30} color="#1E90FF" />
            </TouchableOpacity>
          </View>

          
          <TextInput
            style={styles.textInput}
            placeholder="Digite sua anotação aqui..."
            placeholderTextColor="#888"
            multiline
            value={noteText}
            onChangeText={setNoteText}
            textAlignVertical="top"
          />
        </Modalize>
      </GestureHandlerRootView>
    </AuthContextList.Provider>
  );
};

// hook para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContextList);


const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  textInput: {
    height: 600, // mais altura = mais espaço para caber mais texto sem scroll
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
  },
});
