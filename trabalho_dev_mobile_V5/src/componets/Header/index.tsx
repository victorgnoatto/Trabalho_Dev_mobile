import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { getUserSession } from '../../services/session';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Armazenamento local

type HeaderProps = {
  title?: string;
  showUserName?: boolean;
};

export function Header({ title, showUserName = true }: HeaderProps) {
  const [userName, setUserName] = useState<string>('');

  async function loadUser() {
    const session = await getUserSession();
    if (session) {
      setUserName(session.login);
    }
  }

  

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [])
  );

  return (
    <LinearGradient
      colors={['#1E90FF', '#87CEFA']}
      style={styles.container}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {title ? (
            <>
              {title}
              {showUserName && userName ? (
                <Text style={styles.boldText}> {userName}</Text>
              ) : null}
            </>
          ) : (
            <>
              Olá, seja bem vindo
              {showUserName && userName ? (
                <Text style={styles.boldText}> {userName}</Text>
              ) : null}
            </>
          )}
        </Text>
      </View>

      <View style={styles.avatarContainer}>
        <MaterialIcons name="person" size={30} color="black" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    //paddingHorizontal: 20,
    //paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    //borderBottomLeftRadius: 10,
    //borderBottomRightRadius: 10,
    paddingTop: 25,
    paddingLeft: 16,
    paddingRight:16,
    paddingBottom:20,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
