import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronUp, XIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/common/dialog';
import UserAvatar from '@/components/UserAvatar';
import Capsule from '@/components/common/capsule';
import { Button } from '@/components/common/button';
import useGetBoardItems from '@/hooks/useGetBoardItems';
import { cn, formatRelativeTime } from '@/utils';
import { useAuth } from '@/contexts/AuthContext';
import { PostDetail, User } from '@/types';
import { getPostById, upvotePost } from '@/apis';

import CommentsSection from './Comments';

const PostDetailPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const routerPost = JSON.parse(state as string) as PostDetail | undefined;

  const { data, refetch } = useQuery({
    queryKey: ['getPostById', id],
    queryFn: async () => getPostById(id || routerPost?.post_id || ''),
  });

  const post = data || routerPost;

  const { title, description } = post || {};

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          navigate(-1);
        }
      }}
      modal={false}
    >
      <DialogContent
        tabIndex={undefined}
        className="relative z-50 w-fullshadow max-w-5xl my-0 2xl:mx-0 mx-0 sm:mx-8 sm:my-10 sm:rounded-lg flex flex-col md:flex-row"
      >
        <DialogTitle className="hidden">{title}</DialogTitle>

        <DialogClose className="m-4 md:hidden w-fit bg-sidebar-accent-foreground/50 hover:bg-sidebar-accent-foreground/70 rounded-sm cursor-pointer transition-all duration-300 outline-none">
          <XIcon className="w-6 h-6 text-secondary" />
        </DialogClose>

        <div className="flex-1 min-w-0 p-4 md:py-5 md:w-8/12 relative overflow-hidden">
          <h4 className="line-clamp-5 pb-3">{title || ''}</h4>

          <div className="block md:hidden">
            <PostInfo post={post} refetch={refetch} />
          </div>

          <Description description={description || ''} />

          <CommentsSection postId={id || ''} />
        </div>

        <div className="hidden md:block  pb-2 text-sm md:border-l border-border md:w-4/12 text-foreground relative rounded-tr-lg">
          <PostInfo post={post} refetch={refetch} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailPage;

const Label = ({ label }: { label: string }) => <p className="col-span-2 font-medium truncate">{label}</p>;
const Value = ({ children }: { children: ReactNode }) => <div className="col-span-3">{children}</div>;

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <>
    <Label label={label} />
    <Value>{children}</Value>
  </>
);

const PostInfo = ({ post, refetch }: { post: PostDetail | undefined; refetch: VoidFunction }) => {
  const { status, board_name, board_id, created_at, upvote_count, author, upvotes, post_id } = post || {};
  const { boards } = useGetBoardItems();
  const { user } = useAuth();

  const isUpvoted = user?.id && upvotes?.includes(user?.id);
  const selectedBoard = boards.find((opt) => opt.id === board_id);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ post_id, user_id, isUp }: { post_id: string; user_id: string; isUp: boolean }) =>
      await upvotePost(post_id, user_id, isUp),

    onSuccess: () => {
      refetch();
    },
  });

  return (
    <>
      <div className="grid items-center grid-cols-5 py-3 md:p-4 border-b gap-y-4 border-border">
        <Row label="Upvoters">
          <Button
            variant="secondary"
            size="sm"
            disabled={isPending}
            onClick={() => {
              mutateAsync({ post_id: post_id || '', user_id: user?.id || '', isUp: !isUpvoted });
            }}
          >
            <ChevronUp className={cn('size-4', isUpvoted ? 'text-primary' : 'text-secondary-foreground')} />
            {upvote_count || 0}
          </Button>
        </Row>
        <Row label="Status">
          <Capsule color="blue">{status}</Capsule>
        </Row>
        <Row label="Board">
          <Capsule>
            {selectedBoard?.icon}
            <span className="ml-1">{board_name}</span>
          </Capsule>
        </Row>
      </div>
      <div className="grid items-center grid-cols-5 py-3 md:p-4 border-b gap-y-4 border-border">
        <Row label="Date">
          <Label label={created_at ? formatRelativeTime(created_at) : ''} />
        </Row>
        <Row label="Author">
          <div className="flex gap-2 items-center">
            <UserAvatar user={author as User} />

            <Label label={(author as User).username || (author as User).email || ''} />
          </div>
        </Row>
      </div>
    </>
  );
};

const Description = ({ description }: { description: string }) => {
  return (
    <div className="relative">
      <div
        className={'text-base text-gray-400 h-full overflow-clip flow-root pt-1 break-words whitespace-pre-wrap'}
        dangerouslySetInnerHTML={{ __html: description || '' }}
      ></div>
    </div>
  );
};
