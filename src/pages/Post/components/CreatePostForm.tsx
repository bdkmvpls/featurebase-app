import React, { useEffect, useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

import UserAvatar from '@/components/UserAvatar';
import { Button } from '@/components/common/button';
import { DialogClose } from '@/components/common/dialog';
import ProseMirrorEditor from '@/components/RichTextEditor';
import useGetBoardId from '@/hooks/useGetBoardId';
import { createPost } from '@/apis';
import { useAuth } from '@/contexts/AuthContext';
import IssueSelector from './IssueSelector';
import ModuleSelector from './ModuleSelector';
import BoardSelector from './BoardSelector';
import { DialogTitle } from '@radix-ui/react-dialog';
import { CreatePostPayload } from '@/types';
import useGetBoards from '@/hooks/useGetBoards';

const CreatePostForm: React.FC<{ onClose: VoidFunction }> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const { boardId } = useGetBoardId();
  const { boards } = useGetBoards();
  const { user } = useAuth();

  const featureBoardId = boards?.find((b) => b.name == 'Feature Request')?.id;

  const { mutateAsync: createPostMutation, isPending } = useMutation({
    mutationFn: async (values: CreatePostPayload) => await createPost(values),
    onSuccess: () => {
      toast.success('Post created successfully!');
      onClose();
      queryClient.invalidateQueries({ queryKey: ['posts', boardId] });
    },
    onError: (error) => {
      toast.error('Failed to create a post');
      console.log(error);
    },
  });

  const handleSubmit = (values: CreatePostPayload) => {
    createPostMutation(values);
  };

  const formik = useFormik<CreatePostPayload>({
    initialValues: {
      title: '',
      description: '',
      author: user?.id,
      board_id: boardId || featureBoardId,
      module: null,
      bug_sources: [],
      integrations: null,
      status: 'open',
    },
    onSubmit: handleSubmit,
  });

  const boardSelected = boards?.find((b) => b.id === formik.values.board_id);
  const [description, setDescription] = useState('');

  useEffect(() => {
    formik.setFieldValue('description', description);
  }, [description]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col text-foreground">
        <DialogTitle className="hidden"></DialogTitle>
        {boardSelected?.name === 'Bugs' && (
          <div className="border-b border-border p-3 px-4 bg-white/[2%] text-sm rounded-t-md">
            <p>This post will only be visible to your company members and the Featurebase team.</p>
          </div>
        )}

        {boardSelected?.name === 'Question' && (
          <div className="border-b border-border p-3 px-4 bg-white/[2%] text-sm rounded-t-md">
            <p>This post will only be visible to you and the Featurebase team.</p>
          </div>
        )}

        <div className="flex justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-1">
            <UserAvatar />
            <span>
              <ChevronRight size={16} />
            </span>
            <BoardSelector
              id={formik.values.board_id}
              onSelect={(selected) => {
                formik.setFieldValue('board_id', selected);
              }}
            />
          </div>

          <DialogClose asChild>
            <button className="p-2 bg-transparent hover:bg-gray-800 rounded-md cursor-pointer">
              <X size={12} />
            </button>
          </DialogClose>
        </div>

        <div className="py-2">
          <div className="relative mt-1 z-[50] px-4">
            <input
              id="create-post-title"
              autoComplete="false"
              className="w-full text-base font-medium bg-transparent border-0 text-white sm:text-lg dark:bg-transparent focus-within:outline-none focus-within:ring-0"
              placeholder="Title of your post"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </div>

          <ProseMirrorEditor onChange={setDescription} />
        </div>

        {boardSelected?.name === 'Bugs' && (
          <div className="p-4 border-t border-b border-border bg-popover/50">
            <IssueSelector
              issues={formik.values.bug_sources || []}
              onSelectionChange={(selected) => {
                formik.setFieldValue('bug_sources', selected);
              }}
            />
          </div>
        )}

        <div className="p-4 border-t border-b border-border bg-popover/50">
          <p className="pr-20 text-sm font-medium text-foreground">To which module does this apply to?</p>
          <div className="mt-3 max-w-[240px]">
            <ModuleSelector
              module={formik.values.module || null}
              onSelect={(selected) => {
                formik.setFieldValue('module', selected);
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 px-4 py-4 ml-auto border-t border-white/5">
          <div className="flex items-center flex-shrink-0 gap-5 ml-auto">
            <Button size="sm" disabled={isPending} type="submit">
              Submit Post
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePostForm;
