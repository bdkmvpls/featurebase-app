import { ReactNode } from 'react';
import { Database } from './supabase.types';

export type Board = Database['public']['Tables']['boards']['Row'];

export type BoardItemType = {
  label: string;
  value: string;
  path: string;
  icon?: ReactNode;
  id: string;
};
