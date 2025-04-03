import { ComponentProps, useState } from 'react';
import { X as CloseIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import useCustomSearchParams, {
  defaultOperators,
  extractFilterOperatorAndValueFromSearchParamValue,
} from '@/hooks/useCustomSearchParams';
import DropDownContentWithSearch, { DropDownItem } from '@/components/DropDownContentWithSearch';
import useGetFilterOptions, { FilterKey } from '@/hooks/useGetFilterOptions';
import { MODULES, INTEGRATIONS, ISSUE_OPTIONS } from '@/utils/contants';

const issueOptions = ISSUE_OPTIONS.map((item) => ({ label: item, value: item }));
const integrationOptions = INTEGRATIONS.map((item) => ({ label: item, value: item }));
const moduleOptions = MODULES.map((item) => ({ label: item, value: item }));

const CustomFieldDropdown = ({
  filter: { value, key, operator },
}: {
  filter: { key: FilterKey; value: string; operator: string };
}) => {
  const actualValue = value?.includes('-') ? value.split('-')[0] : value;
  const { searchParams, updateSearchParamValue } = useCustomSearchParams();
  const { options } = useGetFilterOptions();

  const customFieldSearchParams = searchParams.getAll('custom_field');
  const [open, setOpen] = useState(false);

  const dropdownItems: Record<
    'module' | 'bug_sources' | 'integrations',
    ComponentProps<typeof DropDownContentWithSearch>['items']
  > = { bug_sources: issueOptions, module: moduleOptions, integrations: integrationOptions };

  const isSelected = (item: DropDownItem): boolean => {
    const fullValue = `${actualValue}:${item.value}`;

    return customFieldSearchParams?.some((param) => {
      const { actualValue } = extractFilterOperatorAndValueFromSearchParamValue(param, key as FilterKey);
      return actualValue === fullValue;
    });
  };

  const onSelect = (item: DropDownItem) => {
    const fullValue =
      operator === 'is_not' ? `${operator}:${actualValue}-${item.value}` : `${actualValue}-${item.value}`;
    updateSearchParamValue(key, operator === 'is_not' ? `${operator}:${value}` : value, fullValue);
  };

  return (
    <DropdownMenu open={open} onOpenChange={(open) => setOpen(open)}>
      <DropdownMenuTrigger>
        <div className="border-r border-sidebar-accent-foreground/15 shrink-0 min-w-fit">
          <p className="inline-flex items-center px-2  border-sidebar-accent-foreground/15 py-1.5 text-primary-foreground bg-sidebar-accent cursor-pointer hover:bg-primary/80 transition-all duration-200 capitalize">
            {options.custom_field.options?.find((op) => op.value == value) ? 'Not Selected' : value.split('-').at(-1)}
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropDownContentWithSearch
        items={dropdownItems[actualValue as keyof typeof dropdownItems]}
        onSelect={onSelect}
        isSelected={isSelected}
      />
    </DropdownMenu>
  );
};

const SelectedFilters = () => {
  const { searchParams, removeSearchParamValue, updateSearchParamOperator } = useCustomSearchParams();
  const { options } = useGetFilterOptions();

  const selectedFilters = Object.keys(options).reduce((acc, key) => {
    const values = searchParams.getAll(key);
    if (values.length > 0) {
      acc.push(
        ...values.map((value) => {
          const { operator, actualValue } = extractFilterOperatorAndValueFromSearchParamValue(value, key as FilterKey);

          return {
            key: key as FilterKey,
            value: actualValue,
            operator,
          };
        })
      );
    }
    return acc;
  }, [] as { key: FilterKey; value: string; operator: string }[]);

  return selectedFilters?.length ? (
    <div className="pb-0 pt-2.5">
      <div className="flex flex-wrap items-center gap-2">
        {selectedFilters.map((filter, index) => (
          <div key={index} className="flex items-center text-xs font-medium border border-border rounded-md shadow-sm ">
            <p className="flex items-center text-foreground bg-secondary capitalize px-2 py-1.5">
              {options[filter.key]?.icon}
              <span>
                {filter.key === 'custom_field'
                  ? options.custom_field.options?.find((opt) => filter.value?.includes(opt.value))?.label
                  : options[filter.key]?.label}
              </span>
            </p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="px-2 border-x text-foreground bg-secondary hover:bg-secondary/80 cursor-pointer border-border py-1.5 transition-all duration-200 capitalize">
                  {filter.operator.split('_').join(' ')}
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {defaultOperators.map((op) => (
                  <DropdownMenuItem
                    key={op.operator}
                    onClick={() => {
                      updateSearchParamOperator(filter.key, `${filter.value}`, op.operator);
                    }}
                  >
                    {op.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {filter.key === 'custom_field' ? (
              <CustomFieldDropdown filter={filter} />
            ) : (
              <div className="border-r border-border shrink-0 min-w-fit">
                <p className="inline-flex items-center px-2  border-border py-1.5 text-foreground bg-secondary">
                  {filter.key === 'board_id'
                    ? options[filter?.key].options?.find((opt) => opt.value === filter?.value)?.label
                    : filter.value}
                </p>
              </div>
            )}

            <button
              className="px-2 py-2 cursor-pointer rounded-r-md text-foreground bg-secondary hover:bg-secondary/80 transition-all duration-200"
              onClick={() => {
                removeSearchParamValue(filter.key, filter.value);
              }}
            >
              <CloseIcon className="w-3 h-3 secondary-svg" />
            </button>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default SelectedFilters;
