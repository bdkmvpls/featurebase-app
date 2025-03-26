import React from 'react';
import useGetBoardId from '@/hooks/useGetBoardId';
import useGetBoardItems from '@/hooks/useGetBoardItems';
import { cn } from '@/utils';

const Boards: React.FC = () => {
  const { boards } = useGetBoardItems();
  const { boardId } = useGetBoardId();

  return (
    <div>
      <p>Boards</p>
      <div className="p-2 -m-2 max-h-[648px] overflow-auto custom-scrollbar-stronger space-y-1">
        {boards.map((board) => (
          <div className="flex items-center" key={board.label}>
            <button
              className={cn(
                !board.id || board.id == boardId ? 'bg-dashboard border' : 'bg-transparent',
                'flex items-center w-full px-2 py-1.5 border-border hover:bg-border text-foreground rounded-md space-x-2 text-sm font-medium'
              )}
            >
              <div className="pr-1 mr-1">{board.icon}</div>
              {board.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boards;
