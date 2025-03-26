import { useEffect, useState } from 'react';
import { Board } from '../types';

const defaultBoards = [
  {
    id: '',
    name: 'All Posts',
    description: null,
    created_at: null,
    updated_at: null,
  },
  {
    id: '2',
    name: 'Feature Request',
    description: null,
    created_at: null,
    updated_at: null,
  },
  {
    id: '3',
    name: 'Bugs',
    description: null,
    created_at: null,
    updated_at: null,
  },
  {
    id: '4',
    name: 'Integrations',
    description: null,
    created_at: null,
    updated_at: null,
  },
  {
    id: '5',
    name: 'Question',
    description: null,
    created_at: null,
    updated_at: null,
  },
];

export default function useGetBoards() {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    // TODO: Fetch boards from supabase
    setBoards(defaultBoards);
  }, []);

  return { boards };
}
