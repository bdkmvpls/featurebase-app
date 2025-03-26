import { Button } from '@radix-ui/themes';
import React from 'react';
import CreatePostButton from './CreatePostButton';
import { Clock, Filter, Flame, Search, TrendingUp } from 'lucide-react';

const FilterPanel: React.FC = () => {
  return (
    <div className="flex justify-between text-sm">
      <div className="flex gap-3">
        <Button size="2" color="gray">
          <Flame size={16} /> Trending
        </Button>
        <Button variant="outline" size="2" color="gray">
          <TrendingUp size={16} /> Top
        </Button>
        <Button variant="outline" size="2" color="gray">
          <Clock size={16} /> New
        </Button>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="2" color="gray">
          <Search size={16} />
          Search
        </Button>
        <Button variant="outline" size="2" color="gray">
          <Filter size={16} />
        </Button>
        <div className="hidden lg:block">
          <CreatePostButton />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
