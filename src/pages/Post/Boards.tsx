import React from 'react';
import useGetBoardId from '@/hooks/useGetBoardId';
import useGetBoardItems from '@/hooks/useGetBoardItems';
import { Button } from '@/components/common/button';
import { Link } from 'react-router';

const Boards: React.FC = () => {
  const { boards } = useGetBoardItems();
  const { boardId } = useGetBoardId();

  return (
    <div>
      <p>Boards</p>
      <div className="p-2 -m-2 max-h-160 overflow-auto custom-scrollbar-stronger space-y-1">
        {boards.map((board) => (
          <div className="flex items-center" key={board.label}>
            <Link to={{ pathname: board.path, search: board?.id ? `board_id=${board.id}` : '' }} className="w-full">
              <Button
                variant={!board.id || board.id == boardId ? 'secondary' : 'outline'}
                className="w-full justify-start"
              >
                <div className="pr-1 mr-1">{board.icon}</div>
                {board.label}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boards;
