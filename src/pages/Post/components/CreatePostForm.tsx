import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import UserAvatar from '@/components/UserAvatar';
import { Button } from '@/components/common/button';
import { DialogClose } from '@/components/common/dialog';
import ProseMirrorEditor from '@/components/RichTextEditor';
import { DropDownItem } from '@/components/DropDownContentWithSearch';
import useGetBoardId from '@/hooks/useGetBoardId';
import { IssueType, ModuleType } from '@/utils/contants';
import { createPost } from '@/apis';
import { useAuth } from '@/contexts/AuthContext';
import IssueSelector from './IssueSelector';
import ModuleSelector from './ModuleSelector';
import BoardSelector from './BoardSelector';
import { DialogTitle } from '@radix-ui/react-dialog';

const CreatePostForm: React.FC<{ onClose: VoidFunction }> = ({ onClose }) => {
  const { boardId } = useGetBoardId();
  const [boardSelected, setBoardSelected] = useState<DropDownItem | null>(null);
  const [module, setModule] = useState<ModuleType | null>(null);
  const [issues, setIssues] = useState<IssueType[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useAuth();
  const [submitted, setIsSubmitted] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: createPostMutation, isPending } = useMutation({
    mutationFn: async () =>
      await createPost({
        title,
        description,
        author: user?.id || '',
        board_id: boardSelected?.id || '',
        module: module,
        bug_sources: issues,
        integrations: null,
        status: 'open',
      }),
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

  const isValid = title.length >= 2;

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (isValid) {
      createPostMutation();
    }
  };

  return (
    <div className="flex flex-col text-foreground">
      <DialogTitle className="hidden"></DialogTitle>
      {boardSelected?.label === 'Bugs' && (
        <div className="border-b border-border p-3 px-4 bg-white/[2%] text-sm rounded-t-md">
          <p>This post will only be visible to your company members and the Featurebase team.</p>
        </div>
      )}

      {boardSelected?.label === 'Question' && (
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
          <BoardSelector board={boardSelected} onSelect={setBoardSelected} />
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {submitted && !isValid ? (
          <div className="px-4">
            <p className="text-sm text-red-500/80 mt-0.5">Title must be longer that 2 characters.</p>
          </div>
        ) : null}
        <ProseMirrorEditor onChange={setDescription} />
      </div>

      {boardSelected?.label === 'Bugs' && (
        <div className="p-4 border-t border-b border-border bg-popover/50">
          <IssueSelector issues={issues} onSelectionChange={setIssues} />
        </div>
      )}

      <div className="p-4 border-t border-b border-border bg-popover/50">
        <p className="pr-20 text-sm font-medium text-foreground">To which module does this apply to?</p>
        <div className="mt-3 max-w-[240px]">
          <ModuleSelector module={module} onSelect={setModule} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-5 px-4 py-4 ml-auto border-t border-white/5">
        <div className="flex items-center flex-shrink-0 gap-5 ml-auto">
          <Button size="sm" disabled={isPending} onClick={handleSubmit}>
            Submit Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
