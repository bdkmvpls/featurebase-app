import React from 'react';
import UserAvatar from '../../../components/UserAvatar';
import { ChevronRight, X } from 'lucide-react';
import { Button, Dialog, DropdownMenu } from '@radix-ui/themes';
import ProseMirrorEditor from '../../../components/RichTextEditor';

const CreatePostForm: React.FC = () => {
  return (
    <div className="flex flex-col text-foreground">
      <div className="flex justify-between pb-2">
        <div className="flex items-center gap-1">
          <UserAvatar />
          <span>
            <ChevronRight size={16} />
          </span>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft" size="1">
                Options
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
          </DropdownMenu.Root>
          <div></div>
        </div>

        <Dialog.Close>
          <button className="px-2 bg-transparent hover:bg-gray-800 rounded-md cursor-pointer">
            <X size={12} />
          </button>
        </Dialog.Close>
      </div>

      <div className="py-2">
        <ProseMirrorEditor />
      </div>

      <div className="py-4">module</div>

      <div className="py-4">footer</div>
    </div>
  );
};

export default CreatePostForm;
