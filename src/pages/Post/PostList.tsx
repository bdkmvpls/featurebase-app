import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/apis';
import useGetBoardId from '@/hooks/useGetBoardId';
import PostCard from './PostCard';
import EmptyPost from './EmptyPost';

const PostList: React.FC = () => {
  const boardId = useGetBoardId();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', boardId],
    queryFn: getAllPosts,
  });

  return (
    <div className="mt-4 -mx-4 overflow-hidden rounded-none border-x-0 sm:border-x sm:rounded-lg sm:mx-0 up-element bg-secondary/80 border-y border-border">
      {isLoading ? (
        <div className="w-full flex justify-center p-4">Loading...</div>
      ) : (
        <div>
          {posts && posts?.length > 0 ? (
            <>
              {posts.map((post) => (
                <PostCard post={post} key={post.post_id} />
              ))}
            </>
          ) : (
            <EmptyPost />
          )}
        </div>
      )}
    </div>
  );
};

export default PostList;
