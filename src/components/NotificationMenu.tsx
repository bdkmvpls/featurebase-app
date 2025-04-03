import React from 'react';
import { Bell } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './common/dropdown-menu';

const NotificationMenu: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full cursor-pointer w-9 h-9 text-foreground bg-secondary border border-border flex justify-center items-center">
          <Bell />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="text-foreground">
          <span> Inbox</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMenu;
