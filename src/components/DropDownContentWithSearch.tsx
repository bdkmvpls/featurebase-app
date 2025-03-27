import React, { ComponentProps, useMemo, useState } from 'react';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './common/dropdown-menu';
import { cn } from '@/utils';

export type DropDownItem = { label: string; value: string; icon?: React.ReactNode; id?: string };

interface IDropDownContentWithSearchProps {
  items: DropDownItem[];
  onSelect: (item: DropDownItem) => void;
  searchInputPlaceholder?: string;
  componentProps?: ComponentProps<typeof DropdownMenuContent>;
}
const DropDownContentWithSearch: React.FC<IDropDownContentWithSearchProps> = ({
  items,
  onSelect,
  searchInputPlaceholder,
  componentProps,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = useMemo(
    () => items.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase())),
    [items, searchQuery]
  );

  return (
    <DropdownMenuContent {...componentProps} className={cn('z-[999] w-60', componentProps?.className)}>
      <div className="flex items-center border-b border-white/5 px-2">
        <input
          className="placeholder:text-foreground-muted flex border-0 focus:outline-none focus:ring-0 bg-transparent h-9 w-full rounded-md bg-transparent py-3 text-base sm:text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
          autoFocus
          placeholder={searchInputPlaceholder || 'Search options...'}
          value={searchQuery}
          onChange={handleChangeSearchQuery}
        ></input>
      </div>
      <DropdownMenuSeparator />
      {filteredItems.length > 0 ? (
        filteredItems?.map((item, index) => (
          <DropdownMenuItem key={index} onSelect={() => onSelect(item)}>
            {item.label}
          </DropdownMenuItem>
        ))
      ) : (
        <div>No Options Found</div>
      )}
    </DropdownMenuContent>
  );
};

export default DropDownContentWithSearch;
