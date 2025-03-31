import { Database } from './supabase.types';

export type CreatePostPayload = Database['public']['Tables']['posts']['Insert'];
export type UpdatePostPayload = Database['public']['Tables']['posts']['Update'];
export type PostDetail = Database['public']['Views']['post_details']['Row'];
export type CommentWithUser = Database['public']['Views']['comments_with_authors']['Row'];
export type CreateCommentPayload = Database['public']['Tables']['comments']['Insert'];
