import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!login || !senha) {
      setError('Preencha todos os campos');
    } else {
      setError('');
      Alert.alert('Login', 'Login efetuado com sucesso!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Login"
        style={styles.input}
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.link}>Esqueci minha senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const CadastroScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleCadastro = () => {
    if (!login || !email || !senha) {
      setError('Preencha todos os campos');
    } else {
      setError('');
      Alert.alert('Cadastro', 'Cadastro realizado com sucesso!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        placeholder="Login"
        style={styles.input}
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    alignSelf: 'center'
  },
  input: {
    height: 48,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2F80ED',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  link: {
    color: '#2F80ED',
    textAlign: 'center',
    marginTop: 12
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center'
  }
});
