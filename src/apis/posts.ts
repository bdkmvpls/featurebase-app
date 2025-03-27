import { CreatePostPayload, PostDetail } from '@/types/posts';
import supabase from './supabaseClient';

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
