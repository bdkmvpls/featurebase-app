import { useSearchParams } from 'react-router';

export default function useGetBoardId() {
  const [searchParams] = useSearchParams();

  const boardId = searchParams.get('b');
  return { boardId };
}
