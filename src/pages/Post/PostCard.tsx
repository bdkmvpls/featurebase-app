import React from 'react';
import { PostDetail } from '@/types/posts';
import UserAvatar from '@/components/UserAvatar';
import { ChevronUp, MessageCircleMoreIcon, PinIcon } from 'lucide-react';

import Capsule from '@/components/common/capsule';
import { User } from '@/types';

interface PostCardProps {
  post: PostDetail;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { title, description, upvotes, author, pinned, board_name, status, comments_count } = post;

  return (
    <div className="relative flex w-full pr-0 duration-75 ease-in sm:items-stretch hover:bg-border/30 border-y border-border">
      <a
        role="button"
        className="w-full h-full min-w-0 py-4 pl-4 pr-3 my-auto overflow-auto rounded-md cursor-pointer unstyled-button sm:block sm:pl-5 sm:py-5 "
      >
        <div className="relative">
          {pinned && (
            <div className="absolute flex items-center p-1 rounded-md -top-4 -right-2">
              <PinIcon size={12} color="rgb(130, 123, 236)" className="mr-1 rotate-45 " />
              <p className="text-foreground uppercase text-sm tracking-wide font-semibold">Pinned</p>
            </div>
          )}

          {status && (
            <div className="inline-block mb-2">
              <Capsule color="blue">In Progress</Capsule>
            </div>
          )}
          <p className="text-base font-semibold line-clamp-2 content text-white">{title}</p>
          <p className="mt-1 text-sm text-gray-400 line-clamp-2 text-foreground">{description}</p>
          <div className="flex flex-wrap items-end justify-between gap-3 pt-3.5">
            <div className="flex items-center mr-2">
              <div className="relative flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full">
                <UserAvatar user={author as User} className="w-5 h-5" />
              </div>
              <p className="text-sm ml-1.5 text-foreground">
                <span className="font-bold">{(author as User).name}</span>
              </p>
            </div>
            <div className="flex items-center space-x-2 -mb-1">
              {comments_count && comments_count > 0 ? (
                <div className="flex items-center px-2 py-1 text-xs font-medium border-gray-200 rounded-md text-foreground">
                  <MessageCircleMoreIcon size={14} />
                  <span className="ml-1">{comments_count}</span>
                </div>
              ) : null}
              <div>
                <Capsule>{board_name}</Capsule>
              </div>
            </div>
          </div>
        </div>
      </a>

      <div className="flex">
        <button
          aria-label={`${upvotes} upvotes. Click to upvote`}
          className="cursor-pointer unstyled-button flex flex-shrink-0 flex-col items-center justify-center w-14 sm:w-16 py-2 border-l border-dark-accent/40 hover:border-dark-accent main-transition group hover:bg-border/50"
        >
          <div className="group-hover:text-foreground main-transition cursor-pointer text-background-accent  flex flex-col items-center justify-center pb-1  px-2 rounded-md">
            <ChevronUp size={20} />
            <p className="text-sm font-semibold text-gray-100 ">{upvotes || 0}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
