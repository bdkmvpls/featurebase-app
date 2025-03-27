import React from 'react';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/common/dropdown-menu';
import DropDownContentWithSearch, { DropDownItem } from '@/components/DropDownContentWithSearch';
import { MODULES, ModuleType } from '@/utils/contants';
import { Button } from '@/components/common/button';
import { ChevronsUpDown } from 'lucide-react';

interface ModuleSelectorProps {
  module: ModuleType | null;
  onSelect: (module: ModuleType) => void;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({ module, onSelect }) => {
  const moduleOptions = MODULES.map((value) => ({ label: value, value }));
  const moduleSelected = moduleOptions.find((m) => m.value === module) || null;

  const handleSelectModule = (item: DropDownItem) => {
    onSelect(item.value as ModuleType);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="w-full relative justify-between">
          <span className="truncate font-medium">
            <p className="truncate">{moduleSelected?.label || 'Unselected'}</p>
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronsUpDown />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropDownContentWithSearch
        items={moduleOptions}
        onSelect={handleSelectModule}
        componentProps={{ side: 'bottom', align: 'start' }}
      />
    </DropdownMenu>
  );
};

export default React.memo(ModuleSelector);
