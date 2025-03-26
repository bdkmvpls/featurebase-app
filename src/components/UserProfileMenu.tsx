import React from 'react';
import UserAvatar from './UserAvatar';
import { LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './common/dropdown-menu';

const UserProfileMenu: React.FC = () => {
  const { loading, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="cursor-pointer">
          <UserAvatar />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent side="bottom" align="end" className="w-50">
          <DropdownMenuItem color="gray" className="text-foreground">
            <UserCircle size={12} />
            <span> My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-foreground" disabled={loading} onClick={logout}>
            <LogOut size={12} />
            <span>Sign out</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-foreground">
            ✨ Create your own <br />
            feedback board
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default UserProfileMenu;
