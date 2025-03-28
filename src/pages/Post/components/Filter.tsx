import { ComponentProps, useState } from 'react';
import { usePrevious } from '@uidotdev/usehooks';
import { Filter as FilterIcon } from 'lucide-react';

import { DropdownMenu, DropdownMenuTrigger } from '@/components/common/dropdown-menu';
import { Popover, PopoverTrigger } from '@/components/common/popover';
import { Button } from '@/components/common/button';
import DropDownContentWithSearch from '@/components/DropDownContentWithSearch';

import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import useGetFilterOptions, { FilterKey } from '@/hooks/useGetFilterOptions';

const Filter = () => {
  const { addSearchParam, isValueInSearchParams, removeSearchParamValue } = useCustomSearchParams();

  const [selectedKey, setSelectedKey] = useState<FilterKey>();

  const { options } = useGetFilterOptions();

  const [isOpen, setIsOpen] = useState(false);
  const previousIsOpen = usePrevious(selectedKey);

  const closeMenu = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedKey(undefined), 100);
    return;
  };

  const onSelect = (item: ComponentProps<typeof DropDownContentWithSearch>['items'][number]) => {
    if (!selectedKey) {
      setSelectedKey(item.value as FilterKey);
    } else {
      if (isValueInSearchParams(selectedKey, item.value)) {
        removeSearchParamValue(selectedKey, item.value);
      } else {
        addSearchParam(selectedKey, item.value);
      }
      closeMenu();
    }
  };

  const onMultiSelect = (item: ComponentProps<typeof DropDownContentWithSearch>['items'][number]) => {
    if (!selectedKey) {
      return undefined;
    } else {
      return isValueInSearchParams(selectedKey, item.value)
        ? removeSearchParamValue(selectedKey, item.value)
        : addSearchParam(selectedKey, item.value);
    }
  };

  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <div className="h-8 w-9 relative shrink-0  ml-3 z-50">
          <DropdownMenu
            modal={false}
            open={isOpen}
            onOpenChange={(open) => {
              if (isOpen && selectedKey && previousIsOpen === undefined) {
                return;
              }
              if (!open) {
                closeMenu();
              }
              setIsOpen(open);
            }}
          >
            <DropdownMenuTrigger asChild>
              <Button variant="outline" type="button" className="transition-all duration-500">
                <FilterIcon className="size-4 shrink-0" />
              </Button>
            </DropdownMenuTrigger>

            <DropDownContentWithSearch
              componentProps={{
                onPointerDownOutside: closeMenu,
                onEscapeKeyDown: closeMenu,
                side: 'bottom',
                align: 'end',
              }}
              items={
                (!selectedKey
                  ? Object.keys(options).map((k) => ({
                      label: options[k as keyof typeof options]?.label,
                      value: k,
                      icon: options[k as keyof typeof options]?.icon,
                    }))
                  : options[selectedKey]?.options) || []
              }
              onSelect={onSelect}
              onMultiSelect={onMultiSelect}
              isSelected={!selectedKey ? undefined : (item) => isValueInSearchParams(selectedKey, item.value)}
            />
          </DropdownMenu>
        </div>
      </PopoverTrigger>
    </Popover>
  );
};

export default Filter;
