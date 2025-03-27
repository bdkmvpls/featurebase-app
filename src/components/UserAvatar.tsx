import React, { ComponentProps } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { Avatar, AvatarImage, AvatarFallback } from './common/avatar';
import { User } from '@/types';

interface UserAvatarProps extends ComponentProps<typeof AvatarPrimitive.Root> {
  user?: User;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => {
  const { user: authUser } = useAuth();

  if (user) {
    return (
      <Avatar {...props}>
        <AvatarImage src={user?.avatar_url} alt="user-avatar" />
        <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || ''}</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar {...props}>
      <AvatarImage src={authUser?.user_metadata.avatar_url} alt="user-avatar" />
      <AvatarFallback>{authUser?.user_metadata.email?.charAt(0).toUpperCase() || ''}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
