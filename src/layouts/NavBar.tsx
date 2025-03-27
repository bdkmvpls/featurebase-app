import { ChevronDown, GlobeIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
import ChangelogIcon from '../assets/changelog.svg';
import FeedbackIcon from '../assets/feedback.svg';
import HelpCenterIcon from '../assets/help-center.svg';
import RoadmapIcon from '../assets/roadmap.svg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/common/dropdown-menu';
import useGetBoards from '@/hooks/useGetBoards';
import { getBoardIcons } from '@/hooks/useGetBoardItems';

const NavBar: React.FC = () => {
  const { boards } = useGetBoards();
  const tabs = [
    {
      icon: <FeedbackIcon />,
      label: 'Feedback',
      children: [
        {
          icon: getBoardIcons('All Posts'),
          label: 'All Posts',
          path: '/',
          id: '',
        },
        ...(boards || []).map((board) => ({
          icon: getBoardIcons(board.name),
          label: board.name,
          path: '/',
          id: board.id,
        })),
      ],
    },
    {
      icon: <RoadmapIcon />,
      label: 'Roadmap',
      children: [
        {
          icon: <GlobeIcon />,
          label: 'Universal Roadmap',
          path: '/roadmap',
          id: '',
        },
        {
          icon: <FeedbackIcon />,
          label: 'Universal Roadmap',
          path: '/roadmap',
        },
        {
          icon: <ChangelogIcon />,
          label: 'Changelog Roadmap',
          path: '/roadmap',
        },
        {
          icon: <HelpCenterIcon />,
          label: 'Help Center Roadmap',
          path: '/roadmap',
        },
        {
          icon: null,
          label: 'Survey Roadmap',
          path: '/roadmap',
        },
      ],
    },
    {
      icon: <ChangelogIcon />,
      label: 'Changelog',
      path: '/changelog',
    },
    {
      icon: <HelpCenterIcon />,
      label: 'Help Center',
      path: 'https://help.featurebase.app/',
      external: true,
    },
  ];

  return (
    <div className="flex items-center mt-4 -mb-px space-x-1 overflow-x-auto scrollbar-none sm:space-x-5">
      {tabs.map((tab) => (
        <div className="relative flex-shrink-0" key={tab.label}>
          {tab.children ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center rounded-t-lg rounded-b-none main-transition outline-none border border-b-0 hover:bg-app-background focus:ring-0 font-medium text-sm sm:text-sm py-2.5 px-1.5 sm:px-2 text-foreground border-transparent bg-transparent hover:border-border/40 shadow-none"
                  aria-label="Select feedback board: Feedback"
                >
                  <span className="w-4 h-4 mr-1 sm:w-5 sm:h-5 text-background-accent">
                    <div role="img" aria-label="Featured icon">
                      <div className="">{tab.icon}</div>
                    </div>
                  </span>
                  {tab.label}
                  {tab.children && <ChevronDown size={20} />}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent align="start">
                  {tab.children.map((item, index) => (
                    <Link key={index} to={{ pathname: item.path, search: item?.id || '' }}>
                      <DropdownMenuItem>
                        <span className="flex items-center space-x-2">
                          {item.icon && <span>{item.icon}</span>}
                          <span>{item.label}</span>
                        </span>
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          ) : (
            <Link to={tab.path} target={tab.external ? '_blank' : ''}>
              <button
                type="button"
                className="flex items-center rounded-t-lg rounded-b-none main-transition outline-none border border-b-0 hover:bg-app-background focus:ring-0 font-medium text-sm sm:text-[15px] py-2.5 px-1.5 sm:px-2 text-foreground border-transparent bg-transparent hover:border-border/40 shadow-none"
                aria-label="Select feedback board: Feedback"
              >
                <span className="w-4 h-4 mr-1 sm:w-5 sm:h-5 text-background-accent">
                  <div role="img" aria-label="Featured icon">
                    <div className="">{tab.icon}</div>
                  </div>
                </span>
                {tab.label}
                {tab.children && <ChevronDown size={20} />}
              </button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavBar;
