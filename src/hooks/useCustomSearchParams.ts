import { useSearchParams } from 'react-router';

import { FilterKey } from './useGetFilterOptions';

export type Operator = (typeof defaultOperators)[number]['operator'];

export const defaultOperators: {
  operator: 'is' | 'is_not';
  name: string;
}[] = [
  { operator: 'is', name: 'Is' },
  { operator: 'is_not', name: 'Is Not' },
];

export const extractFilterOperatorAndValueFromSearchParamValue = (value: string, key: FilterKey) => {
  const [operator, actualValue] =
    key === 'custom_field' &&
    ['module', 'integrations', 'bug_sources'].some((field) => value?.includes(field) && value !== field)
      ? [value?.includes(':') ? value.split(':')[0] : 'is', value.split(':').at(-1) || value]
      : value.includes(':')
      ? value.split(':')
      : ['is', value];

  return { operator: operator as Operator, actualValue };
};

export default function useCustomSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const addSearchParam = (key: FilterKey, value: string, replace?: boolean) => {
    if (replace) {
      searchParams.set(key, value);
    } else {
      searchParams.append(key, value);
    }
    setSearchParams(searchParams);
  };

  const isValueInSearchParams = (key: FilterKey, value: string): boolean => {
    const values = searchParams.getAll(key);
    return values.includes(value);
  };

  const removeSearchParamValue = (key: FilterKey, value: string) => {
    const existingValues = searchParams.getAll(key);

    const updatedValues = existingValues.filter((v) => {
      const { actualValue } = extractFilterOperatorAndValueFromSearchParamValue(v, key as FilterKey);

      return actualValue !== value;
    });

    if (updatedValues.length > 0) {
      searchParams.delete(key);
      updatedValues.forEach((v) => searchParams.append(key, v));
    } else {
      searchParams.delete(key);
    }

    setSearchParams(searchParams);
  };

  const updateSearchParamOperator = (key: string, value: string, operator: Operator) => {
    const existingValues = searchParams.getAll(key);

    if (key === 'created_at') {
      const updatedValues = existingValues.map((v) => {
        const { actualValue } = extractFilterOperatorAndValueFromSearchParamValue(value, key as FilterKey);

        return actualValue === value ? `${operator}:${value}` : v;
      });

      searchParams.delete(key);
      updatedValues.forEach((v) => searchParams.append(key, v));
      setSearchParams(searchParams);
      return;
    }

    const updatedValues = existingValues.map((v) => {
      return operator === 'is_not' && v === value
        ? `is_not:${value}`
        : operator === 'is' && v === `is_not:${value}`
        ? value
        : v;
    });

    searchParams.delete(key);
    updatedValues.forEach((v) => searchParams.append(key, v));
    setSearchParams(searchParams);
  };

  const updateSearchParamValue = (key: FilterKey, oldValue: string, newValue: string) => {
    const existingValues = searchParams.getAll(key);

    const updatedValues = existingValues.map((existingValue) => {
      return existingValue === oldValue ? newValue : existingValue;
    });

    searchParams.delete(key);
    updatedValues.forEach((value) => searchParams.append(key, value));

    setSearchParams(searchParams);
  };

  return {
    addSearchParam,
    isValueInSearchParams,
    removeSearchParamValue,
    searchParams,
    setSearchParams,
    updateSearchParamOperator,
    updateSearchParamValue,
  };
}
