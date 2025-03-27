import React, { useEffect, useMemo } from 'react';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/common/dropdown-menu';
import DropDownContentWithSearch, { DropDownItem } from '@/components/DropDownContentWithSearch';
import useGetBoardId from '@/hooks/useGetBoardId';
import useGetBoardItems from '@/hooks/useGetBoardItems';
import { Button } from '@/components/common/button';

interface BoardSelectorProps {
  board: DropDownItem | null;
  onSelect?: (board: DropDownItem | null) => void;
}

const BoardSelector: React.FC<BoardSelectorProps> = ({ board, onSelect }) => {
  const { boardId } = useGetBoardId();
  const { boards } = useGetBoardItems();

  const boardOptions: DropDownItem[] = useMemo(
    () =>
      boards
        .filter((item) => item.path !== '/posts')
        .map((item) => ({
          label: item.label,
          icon: item.icon,
          value: item.id || '',
          id: item.id,
        })),
    [boards]
  );

  useEffect(() => {
    const option = boardOptions.find((b) => b.id === boardId);
    if (option) {
      onSelect?.(option);
    } else {
      onSelect?.(boardOptions.find((opt) => opt.label === 'Feature Request') || null);
    }
  }, [boardId, boardOptions, onSelect]);

  const handleSelect = (item: DropDownItem) => {
    onSelect?.(item);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <span className="mr-1 -ml-1">
            <div role="img" aria-label="Featured icon">
              <span className="">{board?.icon}</span>
            </div>
          </span>
          {board?.label || 'Select a board'}
        </Button>
      </DropdownMenuTrigger>
      <DropDownContentWithSearch
        items={boardOptions}
        onSelect={handleSelect}
        searchInputPlaceholder="Search board..."
        componentProps={{ side: 'left', align: 'start' }}
      />
    </DropdownMenu>
  );
};

export default React.memo(BoardSelector);
