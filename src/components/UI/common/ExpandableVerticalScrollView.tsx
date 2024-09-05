import * as ScrollArea from '@radix-ui/react-scroll-area';
import { FC } from 'react';
import { cn } from '@/util/util';

interface PropsScrollCls {
    children: React.ReactNode;
    rootCls?: string;
    viewportCls?: string;
    scrollBarCls?: string;
    expand?: boolean;
    type?: 'auto' | 'hover' | 'scroll' | 'always';
}

export const ExpandableVerticalScrollViewCustom: FC<PropsScrollCls> = ({
    children,
    rootCls = '',
    viewportCls = '',
    scrollBarCls = 'z-0',
    expand = false,
    type = "auto"
}) => {
    return (
        <ScrollArea.Root
            type={type}
            className={cn(
                "w-full h-auto flex flex-col",
                rootCls,
                expand && "flex-1"
            )}>
            <ScrollArea.Viewport
                className={cn(
                    "w-full h-auto flex flex-col relative",
                    viewportCls,
                    expand && "flex-1"
                )}
            >
                {children}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
                orientation="vertical"
                className={cn(
                    "w-[4px] flex select-none touch-none rounded-full transition-all z-20",
                    "bg-d-f-overlay2 hover:bg-d-f-overlay",
                    scrollBarCls
                )}
            >
                <ScrollArea.Thumb className={cn(
                    "flex-1 relative w-full rounded-full cursor-pointer",
                    "bg-[#414141] hover:bg-white"
                )} />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    );
};

export default ExpandableVerticalScrollViewCustom;