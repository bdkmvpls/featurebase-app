import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils';

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <div className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden">
        <div className="relative min-h-screen overflow-hidden">
          <div className="flex items-start min-h-screen sm:justify-center sm:pt-12 xl:pt-24 backdrop-blur-sm bg-dropdown-background">
            <div className="hidden sm:block">
              <DialogClose className="p-1.5 border border-[#ffffff0d] absolute shadow-none top-1 right-1 md:right-4 md:top-4 bg-border cursor-pointer rounded-lg z-[60]">
                <XIcon className="w-6 h-6 text-foreground" />
              </DialogClose>
            </div>

            <DialogPrimitive.Content
              data-slot="dialog-content"
              className={cn(
                'border border-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative z-50 w-full max-w-2xl backdrop-blur-lg bg-popover/80 shadow-2xl mx-4 sm:mx-8 my-10 rounded-lg duration-200',
                className
              )}
              {...props}
              aria-describedby={undefined}
            >
              {children}
            </DialogPrimitive.Content>
          </div>
        </div>
      </div>
    </DialogPortal>
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export { Dialog, DialogClose, DialogContent, DialogPortal, DialogTrigger, DialogTitle, DialogDescription };
