import { CreatePostPayload, PostDetail } from '@/types/posts';
import supabase from './supabaseClient';
import { extractFilterOperatorAndValueFromSearchParamValue } from '@/hooks/useCustomSearchParams';
import { FilterKey } from '@/hooks/useGetFilterOptions';

export const createPost = async (postData: CreatePostPayload) => {
  const { data, error } = await supabase.from('posts').insert(postData).select('*').single();

  if (error) {
    throw error;
  }

  return data;
};

export const getAllPosts = async () => {
  const { data, error } = await supabase.from('post_details').select('*');
  if (error) throw error;
  return data as PostDetail[];
};

export const upvotePost = async (post_id: string, user_id: string, isUp: boolean) => {
  const { data, error } = isUp
    ? await supabase.from('upvotes').insert([{ post_id, user_id }]).select('*').single()
    : await supabase.from('upvotes').delete().match({ post_id, user_id });

  if (error) {
    throw error;
  }

  return data;
};

export async function fetchPostsWithQuery({
  pageParam = 0,
  boardId,
  searchQuery,
  filters,
  sortBy,
  pageSize,
}: {
  pageParam?: number;
  boardId?: string;
  sortBy: string;
  searchQuery?: string;
  filters?: Record<string, string[]>;
  pageSize: number;
}) {
  let query = boardId
    ? supabase.from('post_details').select('*').eq('board_id', boardId)
    : supabase.from('post_details').select('*');

  if (searchQuery) {
    query = query.ilike('title', `%${searchQuery}%`);
  }
  Object.entries(filters || []).forEach(([key, values]) => {
    if (values.length > 1) {
      if (key !== 'created_at') {
        const notValues = values.filter((v) => v.startsWith('is_not:')).map((v) => v.replace('is_not:', ''));
        const regularValues = values.filter((v) => !v.startsWith('is_not:'));

        if (regularValues.length > 0) {
          if (key === 'custom_field') {
            regularValues.forEach((value) => {
              const [customFieldKey, customFieldValue] = value.split('-');

              query =
                customFieldKey === 'module'
                  ? query.in(customFieldKey, [customFieldValue])
                  : query.contains(customFieldKey, [customFieldValue]);
            });
          } else query = query.in(key, regularValues);
        }

        if (notValues.length > 0) {
          if (key === 'custom_field') {
            notValues.forEach((value) => {
              const [customFieldKey, customFieldValue] = value.split('-');
              query =
                customFieldKey === 'module'
                  ? query.not(customFieldKey, 'in', `(${customFieldValue})`)
                  : query.not(customFieldKey, 'cs', `{${customFieldValue}}`);
            });
          } else query = query.not(key, 'in', `(${notValues})`);
        }
      }
      return;
    }

    const value = values[0];

    const { operator, actualValue } = extractFilterOperatorAndValueFromSearchParamValue(value, key as FilterKey);

    if (key === 'custom_field') {
      const [customFieldKey, customFieldValue] = actualValue.split('-');

      if (operator === 'is_not') {
        query =
          customFieldKey === 'module'
            ? query.not(customFieldKey, 'in', `(${customFieldValue})`)
            : query.not(customFieldKey, 'cs', `{${customFieldValue}}`);
      } else {
        query =
          customFieldKey === 'module'
            ? query.in(customFieldKey, [customFieldValue])
            : query.contains(customFieldKey, [customFieldValue]);
      }
    } else {
      if (operator === 'is_not') {
        query = query.not(key, 'in', `(${actualValue})`);
      } else {
        query = query.in(key, [actualValue]);
      }
    }
  });

  if (pageParam === 0) {
    query = query.order('pinned', { ascending: false, nullsFirst: false });
  }

  if (sortBy === 'comments_count') {
    query = query
      .order('comments_count', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false });
  } else {
    query = query.order(sortBy, { ascending: false, nullsFirst: false });
  }

  query = query.range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

  const res = await query;
  return res?.data as PostDetail[];
}
