import { useSearchParams } from 'react-router';

export default function useGetBoardId() {
  const [searchParams] = useSearchParams();

  const boardId = searchParams.get('board_id');
  return { boardId };
}
