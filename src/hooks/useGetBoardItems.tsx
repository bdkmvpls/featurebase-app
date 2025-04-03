import { useMemo } from 'react';
import { BoardItemType } from '../types';
import useGetBoards from './useGetBoards';
import BoardIcon from '../assets/boards.svg';

export const getBoardIcons = (label: string) => {
  switch (label) {
    case 'All Posts':
      return <BoardIcon />;
    case 'Feature Request':
      return (
        <span role="img" aria-label="Feature request">
          💡
        </span>
      );
    case 'Bugs':
      return (
        <span role="img" aria-label="Bugs">
          🐛
        </span>
      );
    case 'Integrations':
      return (
        <span role="img" aria-label="Integrations">
          🖇️
        </span>
      );
    case 'Question':
      return (
        <span role="img" aria-label="Question">
          🤔
        </span>
      );
    default:
      return null;
  }
};

export default function useGetBoardItems() {
  const { boards } = useGetBoards();

  const boardItems: BoardItemType[] = useMemo(
    () =>
      boards?.map((board) => ({
        ...board,
        label: board.name,
        value: board.name,
        path: '/',
        icon: getBoardIcons(board.name),
      })) || [],
    [boards]
  );

  return { boards: boardItems };
}
