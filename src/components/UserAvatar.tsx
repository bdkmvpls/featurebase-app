import React, { ComponentProps } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { Avatar, AvatarImage, AvatarFallback } from './common/avatar';

const UserAvatar: React.FC<ComponentProps<typeof AvatarPrimitive.Root>> = (props) => {
  const { user } = useAuth();
  return (
    <Avatar {...props}>
      <AvatarImage src={user?.user_metadata.avatar_url} alt="user-avatar" />
      <AvatarFallback>{user?.user_metadata.email?.charAt(0).toUpperCase() || ''}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
