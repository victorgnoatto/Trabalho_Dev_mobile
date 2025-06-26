import { supabase } from './supabaseClient';

export async function fetchCourses() {
  try {
    const { data, error } = await supabase
      .from('cursos')  
      .select('*');

    if (error) {
      console.error('Erro ao buscar cursos:', error);
      return [];
    }

    return data;
  } catch (e) {
    console.error('Erro inesperado ao buscar cursos:', e);
    return [];
  }
}
