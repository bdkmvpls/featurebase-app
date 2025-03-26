import { CirclePlus } from 'lucide-react';

import CreatePostForm from './CreatePostForm';
import { Dialog, DialogContent, DialogPortal, DialogTrigger } from '@/components/common/dialog';
import { Button } from '@/components/common/button';

const CreatePostButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="fill-card/30" /> Create A New Post
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent>
          <CreatePostForm />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default CreatePostButton;
