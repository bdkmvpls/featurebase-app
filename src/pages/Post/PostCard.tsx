import React from 'react';
import { PostDetail } from '@/types/posts';
import UserAvatar from '@/components/UserAvatar';
import { ChevronUp, MessageCircleMoreIcon, PinIcon } from 'lucide-react';

import Capsule from '@/components/common/capsule';
import { User } from '@/types';
import useGetBoardItems from '@/hooks/useGetBoardItems';
// import { useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { upvotePost } from '@/apis';

interface PostCardProps {
  post: PostDetail;
  refetch: VoidFunction;
}

const PostCard: React.FC<PostCardProps> = ({ post, refetch }) => {
  const { post_id, title, description, upvote_count, upvotes, author, pinned, board_name, status, comments_count } =
    post;

  // const navigate = useNavigate();
  const { boards } = useGetBoardItems();
  const { user } = useAuth();

  const postBoard = boards.find((b) => b.value === board_name);
  const isUpvoted = user?.id && upvotes?.includes(user?.id) ? true : false;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ post_id, user_id, isUp }: { post_id: string; user_id: string; isUp: boolean }) =>
      await upvotePost(post_id, user_id, isUp),
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <div className="relative flex justify-between w-full pr-0 duration-75 ease-in sm:items-stretch hover:bg-border/30 border-y border-border">
      <a
        role="button"
        className="flex-1 min-w-0 py-4 pl-4 pr-3 my-auto overflow-auto rounded-md cursor-pointer"
        // onClick={() => navigate(`/posts/${post_id}`, { state: JSON.stringify(post) })}         //TODO
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
              {/* TODO */}
              <Capsule color="blue">{status}</Capsule>
            </div>
          )}
          <p className="text-base font-semibold line-clamp-2 content text-white">{title}</p>
          <div
            className="mt-1 text-sm text-gray-400 line-clamp-2 text-foreground max-h-15"
            dangerouslySetInnerHTML={{ __html: description || '' }}
          ></div>
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
                <Capsule>
                  {postBoard?.icon}
                  <span className="ml-1">{board_name}</span>
                </Capsule>
              </div>
            </div>
          </div>
        </div>
      </a>

      <button
        aria-label={`${upvote_count} upvotes. Click to upvote`}
        className="cursor-pointer w-14 sm:w-16 flex flex-shrink-0 flex-col items-center justify-center py-2 border-l border-dark-accent/40 hover:border-dark-accent main-transition group hover:bg-border/50"
        disabled={isPending}
        onClick={() => mutateAsync({ post_id: post_id || '', user_id: user?.id || '', isUp: isUpvoted })}
      >
        <div className="w-full group-hover:text-foreground main-transition text-background-accent flex flex-col items-center justify-center pb-1 px-2 rounded-md">
          <ChevronUp size={20} />
          <p className="text-sm font-semibold text-gray-100 ">{upvote_count || 0}</p>
        </div>
      </button>
    </div>
  );
};

export default PostCard;
