import { CirclePlus } from 'lucide-react';

import CreatePostForm from './CreatePostForm';
import { Dialog, DialogContent, DialogPortal, DialogTrigger } from '@/components/common/dialog';
import { Button } from '@/components/common/button';
import { useState } from 'react';

const CreatePostButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="fill-card/30" /> Create A New Post
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent>
          <CreatePostForm onClose={() => setIsOpen(false)} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default CreatePostButton;
