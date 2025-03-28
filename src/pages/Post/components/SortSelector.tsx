import { ChevronDown, Clock, Flame, TrendingUp } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/common/drawer';
import { cn } from '@/utils';
import { Button } from '@/components/common/button';

type SortOption = 'trending' | 'top' | 'new';

const sortOptionToColumn: Record<SortOption, string> = {
  trending: 'comments_count',
  top: 'votes_count',
  new: 'created_at',
};

const columnToSortOption: Record<string, SortOption> = {
  comments_count: 'trending',
  votes_count: 'top',
  created_at: 'new',
};

const sortItems = [
  { label: 'Trending', value: 'trending', icon: <Flame size={16} /> },
  { label: 'Top', value: 'top', icon: <TrendingUp size={16} /> },
  { label: 'New', value: 'new', icon: <Clock size={16} /> },
];

const SortSelector = ({ isSearchActive }: { isSearchActive: boolean }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get('sortBy') || 'comments_count';
  const currentSortOption = columnToSortOption[currentSort] || 'trending';

  const handleSortChange = (sortOption: SortOption) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sortBy', sortOptionToColumn[sortOption]);
    setSearchParams(newSearchParams);
  };

  const currentSortInfo = sortItems.find((item) => item.value == currentSortOption);

  return (
    <div
      className={cn(
        'flex transition-all duration-300',
        isSearchActive ? 'mr-0 opacity-0 w-0' : 'opacity-100 delay-400 mr-3 w-fit'
      )}
    >
      <div className="hidden gap-3 sm:flex">
        {sortItems.map((item) => (
          <Button
            key={item.value}
            variant={currentSortOption == item.value ? 'secondary' : 'outline'}
            onClick={() => handleSortChange(item.value as SortOption)}
          >
            {item.icon} {item.label}
          </Button>
        ))}
      </div>

      {/* Mobile Dropdown */}
      <div className="sm:hidden relative">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant={'secondary'}>
              {currentSortInfo?.icon} {currentSortInfo?.label}{' '}
              <span className="ml-auto">
                <ChevronDown size={16} />
              </span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full pb-2">
              <DrawerHeader>
                <DrawerTitle>Sort posts</DrawerTitle>
                <DrawerDescription>Select how posts should be sorted.</DrawerDescription>
              </DrawerHeader>

              {sortItems.map((item) => (
                <DrawerClose asChild key={item.value}>
                  <Button
                    variant={currentSortOption === item.value ? 'secondary' : 'outline'}
                    onClick={() => handleSortChange(item.value as SortOption)}
                    className="w-full flex items-center py-2 my-1"
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </DrawerClose>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default SortSelector;
