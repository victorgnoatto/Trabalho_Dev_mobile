import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserSession = {
  id: number;
  login: string;
  email: string;
  imagemPerfil?: string;
};

//salva os dados da usuario logado
export async function saveUserSession(user: UserSession) {
  try {
    const userData = JSON.stringify(user);
    await AsyncStorage.setItem('@userSession', userData);
  } catch (error) {
    console.error('Erro ao salvar sessão do usuário:', error);
  }
}

// recuperando os dados 
export async function getUserSession(): Promise<UserSession | null> {
  try {
    const userData = await AsyncStorage.getItem('@userSession');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Erro ao recuperar sessão do usuário:', error);
    return null;
  }
}

// limpando os daods
export async function clearUserSession() {
  try {
    await AsyncStorage.removeItem('@userSession');
  } catch (error) {
    console.error('Erro ao limpar sessão do usuário:', error);
  }
}
