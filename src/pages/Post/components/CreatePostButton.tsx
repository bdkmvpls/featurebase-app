import { CirclePlus } from 'lucide-react';

import { Button, Dialog } from '@radix-ui/themes';
import CreatePostForm from './CreatePostForm';

const CreatePostButton = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="blue" size="2">
          <CirclePlus className="fill-card/30" /> Create A New Post
        </Button>
      </Dialog.Trigger>

      <Dialog.Content size="4">
        <CreatePostForm />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreatePostButton;
