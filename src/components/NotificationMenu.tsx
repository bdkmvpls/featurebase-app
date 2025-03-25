import { DropdownMenu } from '@radix-ui/themes';
import React from 'react';
import { Bell } from 'lucide-react';

const NotificationMenu: React.FC = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="rounded-full cursor-pointer w-9 h-9 text-foreground bg-secondary border border-border flex justify-center items-center">
          <Bell />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2">
        <DropdownMenu.Item className="text-foreground">
          <span> Inbox</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NotificationMenu;
