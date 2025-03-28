import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import useGetBoardId from '@/hooks/useGetBoardId';
import useGetFilterOptions, { FilterKey } from '@/hooks/useGetFilterOptions';

import EmptyPost from './EmptyPost';
import LoadingIndicator from '@/components/LoadingIndicator';
import PostCard from './PostCard';
import { fetchPostsWithQuery } from '@/apis';

const PostList: React.FC = () => {
  const { boardId } = useGetBoardId();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'comments_count';
  const searchQuery = searchParams.get('search') || '';
  const { options } = useGetFilterOptions();

  const pageSize = 6;

  const filters = Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
    if (!['sortBy', 'search'].includes(key)) {
      const filterKey = key as FilterKey;
      if (filterKey === 'custom_field' && options.custom_field.options?.map((op) => op.value).includes(value)) {
        return acc;
      }
      acc[key] = acc[key] ? [...acc[key], value] : [value];
    }
    return acc;
  }, {} as Record<string, string[]>);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['posts', boardId, sortBy, searchQuery, filters],
    queryFn: async ({ pageParam }) => {
      return await fetchPostsWithQuery({ pageParam, boardId: boardId || '', searchQuery, sortBy, filters, pageSize });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length === pageSize ? allPages?.length : undefined;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="mt-4 overflow-hidden rounded-none border-x-0 sm:border-x sm:rounded-lg sm:mx-0 up-element bg-secondary/80 border-y border-border">
      {isLoading ? (
        <LoadingIndicator />
      ) : data?.pages?.[0]?.length ? (
        <div className="overflow-hidden border-x rounded-lg bg-secondary/80 border-y border-border">
          <div className="w-full divide-y divide-primary/30">
            {data.pages.map((page) =>
              page.map((post) => <PostCard key={post.post_id} post={post} refetch={refetch} />)
            )}
          </div>
        </div>
      ) : (
        <EmptyPost />
      )}

      <div ref={observerRef}>
        {isFetchingNextPage && (
          <span className="mt-4">
            <LoadingIndicator />
          </span>
        )}
      </div>
    </div>
  );
};

export default PostList;
