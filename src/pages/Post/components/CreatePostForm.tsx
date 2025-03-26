import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import UserAvatar from '@/components/UserAvatar';
import { Button } from '@/components/common/button';
import { DialogClose } from '@/components/common/dialog';
import ProseMirrorEditor from '@/components/RichTextEditor';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/common/dropdown-menu';
import DropDownContentWithSearch, { DropDownItem } from '@/components/DropDownContentWithSearch';
import useGetBoardId from '@/hooks/useGetBoardId';
import useGetBoardItems from '@/hooks/useGetBoardItems';
import { moduleOptions } from '@/utils/contants';

const CreatePostForm: React.FC = () => {
  const { boardId } = useGetBoardId();
  const { boards } = useGetBoardItems();
  const [boardSelected, setBoardSelected] = useState<DropDownItem | null>();
  const [moduleSelected, setModuleSelected] = useState<DropDownItem | null>();

  const boardOptions: DropDownItem[] = useMemo(
    () =>
      boards
        .filter((item) => item.path !== '/posts')
        .map((item) => ({
          label: item.label,
          icon: item.icon,
          value: item.id || '',
          id: item.id,
        })),
    [boards]
  );

  useEffect(() => {
    const option = boardOptions.find((b) => b.id === boardId);
    if (option) {
      setBoardSelected(option);
    } else {
      setBoardSelected(boardOptions.find((opt) => opt.label === 'Feature Request') || null);
    }
  }, [boardId, boardOptions]);

  return (
    <div className="flex flex-col text-foreground">
      <div className="flex justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-1">
          <UserAvatar />
          <span>
            <ChevronRight size={16} />
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-[#b2b8cd14] hover:bg-[#b2b8cd21] border border=[#b2b8cd0d] text-xs h-7 font-medium px-1.5 py-1 rounded-md flex items-center text-foreground">
              <span className="mr-1 -ml-[2px]">
                <div role="img" aria-label="Featured icon">
                  <span className="">{boardSelected?.icon}</span>
                </div>
              </span>
              {boardSelected?.label || 'Select a board'}
            </DropdownMenuTrigger>
            <DropDownContentWithSearch
              items={boardOptions}
              onSelect={setBoardSelected}
              searchInputPlaceholder="Search board..."
              componentProps={{ side: 'left', align: 'start' }}
            />
          </DropdownMenu>
        </div>

        <DialogClose>
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
          />
        </div>
        <ProseMirrorEditor />
      </div>

      <div className="p-4 border-t border-b border-border bg-popover/50">
        <p className="pr-20 text-sm font-medium text-foreground">To which module does this apply to?</p>
        <div className="mt-3 max-w-[240px]">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full relative py-1 pl-2.5 pr-10 text-left border rounded-md dashboard-secondary sm:text-sm text-foreground/70">
              <span>
                <span className="truncate font-medium">
                  <p className="truncate">{moduleSelected?.label || 'Unselected'}</p>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 opacity-75 secondary-svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </span>
            </DropdownMenuTrigger>
            <DropDownContentWithSearch
              items={moduleOptions}
              onSelect={setModuleSelected}
              componentProps={{ side: 'bottom', align: 'start' }}
            />
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center justify-between gap-5 px-4 py-4 ml-auto border-t border-white/5">
        <div className="flex items-center flex-shrink-0 gap-5 ml-auto">
          <div className=" items-center text-xs gap-2.5 hidden sm:flex">
            {/* <button
              type="button"
              role="switch"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              className="peer inline-flex p-0 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent data-[state=unchecked]:bg-gray-100/60 dark:data-[state=unchecked]:bg-border h-[16px] w-[28px]"
              id="create-more"
            >
              <span
                data-state="unchecked"
                className="pointer-events-none flex items-center justify-center rounded-full bg-background dark:bg-gray-200/30 data-[state=checked]:dark:bg-primary-foreground/70 shadow-lg ring-0 transition-transform dark:data-[state=checked]:text-primary text-foreground data-[state=unchecked]:translate-x-0 h-3 w-3 data-[state=checked]:translate-x-3"
              ></span>
            </button> */}

            <label htmlFor="create-more" className="select-none text-background-accent/80 dark:text-foreground/90">
              Create more
            </label>
          </div>
          <Button size="sm">Submit Post</Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
