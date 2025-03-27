import React, { useMemo } from 'react';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/common/dropdown-menu';
import DropDownContentWithSearch, { DropDownItem } from '@/components/DropDownContentWithSearch';
import useGetBoardItems from '@/hooks/useGetBoardItems';
import { Button } from '@/components/common/button';

interface BoardSelectorProps {
  id?: string | null;
  onSelect?: (id: string | null) => void;
}

const BoardSelector: React.FC<BoardSelectorProps> = ({ id, onSelect }) => {
  const { boards } = useGetBoardItems();

  const board = useMemo(() => boards.find((b) => b.id == id), [boards, id]);

  const handleSelect = (item: DropDownItem) => {
    onSelect?.(item.id || null);
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
        items={boards}
        onSelect={handleSelect}
        searchInputPlaceholder="Search board..."
        componentProps={{ side: 'left', align: 'start' }}
      />
    </DropdownMenu>
  );
};

export default React.memo(BoardSelector);
