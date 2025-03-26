import React from 'react';
import { Clock, Filter, Flame, Search, TrendingUp } from 'lucide-react';
import { Button } from '@/components/common/button';
import CreatePostButton from './CreatePostButton';

const FilterPanel: React.FC = () => {
  return (
    <div className="flex justify-between text-sm">
      <div className="flex gap-3">
        <Button variant="secondary">
          <Flame size={16} /> Trending
        </Button>
        <Button variant="outline">
          <TrendingUp size={16} /> Top
        </Button>
        <Button variant="outline">
          <Clock size={16} /> New
        </Button>
      </div>
      <div className="flex gap-3">
        <Button variant="outline">
          <Search size={16} />
          Search
        </Button>
        <Button variant="outline">
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
