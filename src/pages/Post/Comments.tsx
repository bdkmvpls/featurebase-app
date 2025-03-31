import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Placeholder from '@tiptap/extension-placeholder';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Heading2, Reply, SendHorizonal } from 'lucide-react';
import { Bold, Code, Italic, List, ListOrdered } from 'lucide-react';
import { User as AuthUser } from '@supabase/supabase-js'; // Import the `Session` type from Supabase

import LoadingIndicator from '@/components/LoadingIndicator';
import { Button } from '@/components/common/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn, formatRelativeTime } from '@/utils';
import { CommentWithUser, User } from '@/types';
import { createComment, getComentByPostId } from '@/apis';
import UserAvatar from '@/components/UserAvatar';

interface CommentsSectionProps {
  postId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => await getComentByPostId(postId),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (newComment: { content: string; parent_comment_id: string | null }) => {
      const { error } = await createComment({
        post_id: postId,
        content: newComment.content,
        parent_comment_id: newComment.parent_comment_id,
        author: user?.id || '',
      });

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setReplyTo(null);
    },
  });

  const newCommentEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write a comment...',
      }),
    ],
  });

  const editorContent = newCommentEditor?.getHTML()?.trim();

  const handleSubmit = (editor: Editor | null | undefined, replyTo: string | null) => {
    if (editor) {
      mutate({
        content: editor.getHTML()?.trim(),
        parent_comment_id: replyTo,
      });

      editor.commands.clearContent();
    }
  };

  return (
    <>
      <CommentEditor
        editor={newCommentEditor}
        onSubmitClick={editorContent ? () => handleSubmit(newCommentEditor, replyTo) : undefined}
        isCommenting={isPending}
        isReply={false}
      />
      <div className="py-6 ">
        <h1 className="text-l font-bold text-gray-300 border-b border-gray-500 w-fit pb-2">Comments</h1>

        {isLoading ? (
          <LoadingIndicator />
        ) : comments?.length ? (
          <div>
            <CommentItem
              comments={comments}
              parentId={null}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              isPending={isPending}
              handleSubmit={handleSubmit}
            />
          </div>
        ) : (
          <div className="mt-4 text-sm text-gray-400">No comments yet.</div>
        )}
      </div>
    </>
  );
};

export default CommentsSection;

interface CommentItemProps {
  comments: CommentWithUser[];
  parentId: string | null;
  isPending?: boolean;
  replyTo: string | null;
  setReplyTo: (replyTo: string | null) => void;
  handleSubmit: (editor: Editor | null | undefined, replyTo: string | null) => void;
}
const CommentItem: React.FC<CommentItemProps> = ({
  comments,
  parentId = null,
  replyTo,
  setReplyTo,
  isPending = false,
  handleSubmit,
}) => {
  const childComments = comments.filter((comment) => comment.parent_comment_id === parentId);

  const getChildCount = (commentId: string | null, comments: CommentWithUser[]): number => {
    const childs = comments.filter((comment) => comment.parent_comment_id == commentId);

    return childs.length || 0;
  };

  const replyEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write a comment...',
      }),
    ],
  });

  if (childComments.length === 0) {
    return null;
  }

  return (
    <>
      {childComments.map((comment) => {
        const childCount = getChildCount(comment.comment_id, comments);
        return (
          <div key={comment.comment_id} className="mt-4 relative">
            {childCount > 0 && <div className={`absolute left-4 h-full w-[1px] bg-border`}></div>}

            <div className="flex items-start space-x-2">
              {parentId ? (
                <div className="absolute w-12 -left-8 h-4 bg-transparent border-l border-b border-border rounded-bl-full"></div>
              ) : null}

              <UserAvatar user={(comment.user as AuthUser).user_metadata as User} />

              <div className="flex-1 z-10">
                <div className="flex items-end space-x-2  mt-1.5">
                  <span className="font-semibold text-sm text-white">
                    {(comment.user as AuthUser).user_metadata?.username ||
                      (comment.user as AuthUser).user_metadata?.email}
                  </span>
                  <span className="text-gray-400 text-xs">{formatRelativeTime(comment.created_at || '')}</span>
                </div>
                <div
                  className="mt-2 text-gray-300 text-md"
                  dangerouslySetInnerHTML={{ __html: comment?.content || '' }}
                />
                <button
                  className="mt-2 text-xs text-gray-400 hover:bg-primary/30 px-1 py-0.5 transition-all duration-200 flex  rounded-sm items-center gap-1 cursor-pointer"
                  onClick={() => setReplyTo(replyTo === comment.comment_id ? null : comment.comment_id)}
                >
                  <Reply className="size-4" />
                  Reply
                </button>

                {replyTo === comment.comment_id && (
                  <CommentEditor
                    editor={replyEditor}
                    onSubmitClick={
                      replyEditor?.getHTML()?.trim() ? () => handleSubmit(replyEditor, comment.comment_id) : undefined
                    }
                    isCommenting={isPending}
                    isReply
                  />
                )}
              </div>
            </div>

            <div className="ml-12 ">
              <CommentItem
                comments={comments}
                parentId={comment.comment_id}
                replyTo={replyTo}
                setReplyTo={setReplyTo}
                isPending={isPending}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

interface CommentEditorProps {
  editor: Editor | null | undefined;
  onSubmitClick?: VoidFunction;
  isCommenting: boolean;
  isReply: boolean;
}

const CommentEditor: React.FC<CommentEditorProps> = ({ editor, onSubmitClick, isCommenting, isReply }) => {
  return (
    <div
      className={cn(
        'px-3 py-2 bg-border border-2 text-base min-h-25 relative transition-all duration-200 rounded-md flex flex-col mt-4',
        editor?.isFocused ? ' border-primary' : 'border-transparent'
      )}
    >
      <div className="flex flex-1 min-h-0 w-full">
        <div className="relative flex flex-col flex-1 h-full w-full">
          {editor ? <EditorContent editor={editor} className="rounded-md" /> : null}
        </div>
      </div>

      <div className="h-6 w-full mt-4 flex gap-2">
        <button className="editor-btn" onClick={() => editor?.chain().focus().toggleBold().run()} title="Bold">
          <Bold className="editor-icon" />
        </button>

        <button className="editor-btn" onClick={() => editor?.chain().focus().toggleItalic().run()} title="Italic">
          <Italic className="editor-icon" />
        </button>

        <button
          className="editor-btn"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        >
          <Heading2 className="editor-icon" />
        </button>

        <button
          className="editor-btn"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
        >
          <ListOrdered className="editor-icon" />
        </button>

        <button
          className="editor-btn"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <List className="editor-icon" />
        </button>

        <button
          className="editor-btn"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          title="Code Block"
        >
          <Code className="editor-icon" />
        </button>
      </div>

      <Button
        className="absolute ml-2 bottom-2 right-2"
        size="sm"
        disabled={!onSubmitClick || isCommenting}
        onClick={onSubmitClick}
      >
        <SendHorizonal className="size-5" /> {isReply ? 'Reply' : 'Comment'}
      </Button>
    </div>
  );
};
