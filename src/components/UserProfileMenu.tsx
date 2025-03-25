import { DropdownMenu } from '@radix-ui/themes';
import React from 'react';
import UserAvatar from './UserAvatar';
import { LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserProfileMenu: React.FC = () => {
  const { loading, logout } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <span className="cursor-pointer">
          <UserAvatar />
        </span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2">
        <DropdownMenu.Item color="gray" className="text-foreground">
          <UserCircle size={12} />
          <span> My Profile</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="text-foreground" disabled={loading} onClick={logout}>
          <LogOut size={12} />
          <span>Sign out</span>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className="text-foreground">
          ✨ Create your own <br />
          feedback board
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default UserProfileMenu;
