import { Board } from '@/types';
import supabase from './supabaseClient';

export const getAllBoards = async () => {
  const { data, error } = await supabase.from('boards').select('*');
  if (error) throw error;
  return data as Board[];
};
