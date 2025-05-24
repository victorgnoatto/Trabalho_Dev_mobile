//componit
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './supabaseClient'; // Não esqueça de criar esse arquivo com suas credenciais!
import { Linking, Image } from 'react-native';

const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!login || !senha) {
      setError('Preencha todos os campos');
      return;
    }

    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('login', login)
      .eq('senha', senha)
      .single();

    if (error || !data) {
      setError('Login ou senha inválidos');
    } else {
      setError('');
      navigation.navigate('Home');
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

  const handleCadastro = async () => {
  if (!login || !email || !senha) {
    setError('Preencha todos os campos');
    return;
  }

  // Verifica se login ou email já existem
  const { data: existingUsers, error: checkError } = await supabase
    .from('usuarios')
    .select('*')
    .or(`login.eq.${login},email.eq.${email}`);

  if (checkError) {
    setError('Erro ao verificar usuário existente.');
    return;
  }

  if (existingUsers.length > 0) {
    setError('Login ou email já estão em uso.');
    return;
  }

  // Se estiver tudo certo, faz o cadastro
  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ login, email, senha }]);

  if (error) {
    setError('Erro ao cadastrar: ' + error.message);
  } else {
    Alert.alert('Cadastro', 'Usuário cadastrado com sucesso!');
    setLogin('');
    setEmail('');
    setSenha('');
    navigation.navigate('Login');
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

const HomeScreen = ({ navigation }) => {
  const [busca, setBusca] = useState('');
  const [cursosFiltrados, setCursosFiltrados] = useState([]);

  const cursos = [
  {
    id: 1,
    titulo: 'React Native/Expo do Zero ao Hero!',
    nivel: 'Básico',
    descricao: 'Tenha melhor experiência Dev mobile: Aprenda React Native/Expo do zero ao herói, Java e React.',
 
    habilidade:`Você vai aprender:
  • Esse projeto foi desenvolvido 2024 / 2025 então é o mais atual.
  • Vamos desenvolver Web, Api e Mobile então é mais que fullStak.
  • Vamos aprender oque tem de mais moderno nesse ano de 2025.
  • Temos sessões bem alinhadas de acordo com cada necessidade.`,
 
    instrutor: `Instrutor:
    Sebastião Rodrigo Nascimento Sousa`,
    link: 'https://www.udemy.com/course/crie-aplicativos-moveis-curso-react-native-do-zero-ao-hero/?couponCode=CP130525BRGB',
    
    imagem: 'https://www.vhv.rs/dpng/d/524-5245981_react-js-logo-png-transparent-png-download.png'

  },
  {
    id: 2,
    titulo: 'Desenvolvimento de Aplicativos Mobile com Flutter',
    nivel: 'Intermediário',
    descricao: 'Aprenda a criar aplicativos móveis multiplataforma com eficiência e desempenho usando o Flutter.',
    link: 'https://www.udemy.com/course/crie-aplicativos-moveis-curso-react-native-do-zero-ao-hero/?couponCode=CP130525BRGB',
    imagem: 'https://www.vhv.rs/dpng/d/524-5245981_react-js-logo-png-transparent-png-download.png'
  },
  {
    id: 3,
    titulo: 'Node.js com Banco de Dados',
    nivel: 'Avançado',
    descricao: 'Aprenda a criar APIs com Node.js e integrar com bancos de dados como PostgreSQL e MongoDB.',
    link: 'https://nodejs.org'
  }
];



  useEffect(() => {
    const resultado = cursos.filter(curso =>
      curso.titulo.toLowerCase().includes(busca.toLowerCase())
    );
    setCursosFiltrados(resultado);
  }, [busca]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de Cursos</Text>

      <TextInput
        placeholder="Buscar curso..."
        style={styles.input}
        value={busca}
        onChangeText={setBusca}
      />

      {cursosFiltrados.map(curso => (
  <TouchableOpacity
    key={curso.id}
    style={styles.card}
    onPress={() => navigation.navigate('Detalhes', { curso })}
  >
    <Text style={styles.cardTitle}>{curso.titulo}</Text>
    <Text style={styles.cardNivel}>{curso.nivel}</Text>
  </TouchableOpacity>
))}
    </View>
  );
};

const DetalhesScreen = ({ route, navigation }) => {
  const { curso } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: curso.imagem }}
      style={{ width: 120, height: 120, alignSelf: 'center', marginBottom: 16 }}/>

      <Text style={styles.title}>{curso.titulo}</Text>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Nível: {curso.nivel}</Text>
      <Text style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
        {curso.descricao}
      </Text>
      <Text style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
        {curso.habilidade}
      </Text>
      <Text style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
        {curso.instrutor}
      </Text>
      
      <TouchableOpacity
        onPress={() => Linking.openURL(curso.link)}
        style={[styles.button, { marginTop: 12 }]}
      >
        <Text style={styles.buttonText}>Acessar Curso</Text>
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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} />
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
  },
  card: {
  backgroundColor: '#fff',
  padding: 16,
  marginBottom: 12,
  borderRadius: 8,
  borderColor: '#ccc',
  borderWidth: 1
  },
  cardTitle: {
  fontSize: 16,
  fontWeight: 'bold'
  },
  cardNivel: {
  fontSize: 14,
  color: '#666'
  }
});
