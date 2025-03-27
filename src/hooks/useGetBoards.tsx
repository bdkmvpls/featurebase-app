import { useQuery } from '@tanstack/react-query';
import { getAllBoards } from '@/apis';

export default function useGetBoards() {
  const { data, isLoading } = useQuery({
    queryKey: ['boards'],
    queryFn: getAllBoards,
  });

  console.log(data);
  return { boards: data, isLoading };
}
