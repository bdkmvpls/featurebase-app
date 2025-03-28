import { PuzzleIcon } from 'lucide-react';
import { ReactNode } from 'react';

import BoardsIcon from '@/assets/boards.svg';
import StatusIcon from '@/assets/status.svg';

import useGetBoardItems from './useGetBoardItems';
import { STATUSES } from '@/utils/contants';

export type FilterKey = 'board_id' | 'status' | 'custom_field';
type DropdownItem = { icon?: ReactNode; label: string; value: string };

export default function useGetFilterOptions() {
  const { boards } = useGetBoardItems();

  const options: Record<FilterKey, { options?: DropdownItem[] | undefined; label: string; icon: ReactNode }> = {
    board_id: {
      label: 'Boards',
      options: boards.map((item) => ({
        label: item.label,
        icon: item.icon,
        value: item.id || '',
      })),
      icon: <BoardsIcon className="w-4 h-4 mr-2" />,
    },
    status: {
      label: 'Status',
      icon: <StatusIcon className="w-4 h-4 mr-2" />,
      options: STATUSES.map((status) => ({ label: status, value: status })),
    },
    custom_field: {
      label: 'Custom Field',
      icon: <PuzzleIcon className="w-4 h-4 mr-2" />,
      options: [
        { value: 'module', label: 'To which module does this apply' },
        { value: 'integrations', label: 'Which integration?' },
        { value: 'bug_sources', label: 'What is experiencing an issue' },
      ],
    },
  };
  return { options };
}
