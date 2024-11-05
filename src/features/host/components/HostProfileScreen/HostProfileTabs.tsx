"use client";

import { cn, swipeConfidenceThreshold, swipePower } from "@/lib/utils";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useRef, useState } from "react";
import EventList from "./EventList";
import ReviewList from "./ReviewList";

const PRIVATE_VIEW_TABS = ["events", "reviews"];
const PUBLIC_VIEW_TABS = ["reviews"];

export default function HostProfileTabs({
    onHostPage,
}: {
    onHostPage: boolean;
}) {
    const TABS = onHostPage ? PUBLIC_VIEW_TABS : PRIVATE_VIEW_TABS;
    const [selectedTab, setSelectedTab] = useState(TABS[0]);

    const dragConstraintRef = useRef<HTMLDivElement>(null);
    const posRef = useRef(0);

    const control = useAnimation();

    const renderTabs = () => {
        if (onHostPage) {
            switch (selectedTab) {
                case TABS[0]:
                    return <ReviewList />;
                case TABS[1]:
                    return <div>Details Tabs</div>;
            }
        } else {
            switch (selectedTab) {
                case TABS[0]:
                    return <EventList />;
                case TABS[1]:
                    return <ReviewList />;
                case TABS[2]:
                    return <div>Details Tab</div>;
            }
        }
    };

    return (
        <div className="mt-7 flex flex-col flex-1" ref={dragConstraintRef}>
            <ul className="flex items-center gap-3 border-b border-stroke-1">
                {TABS.map((tab) => (
                    <li
                        key={tab}
                        className={cn(
                            "relative p-3 text-base cursor-pointer capitalize",
                            selectedTab === tab
                                ? "text-white font-bold"
                                : "text-secondary-1 font-normal"
                        )}
                        onClick={() => setSelectedTab(tab)}
                    >
                        {tab}
                        {selectedTab === tab ? (
                            <motion.div
                                className="absolute -bottom-[1px] inset-x-0 h-[1px] bg-white"
                                layoutId="hostprofiletabs-underline"
                            />
                        ) : null}
                    </li>
                ))}
            </ul>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedTab ? selectedTab : "empty"}
                    transition={{
                        x: { type: "spring", stiffness: 200, damping: 30 },
                    }}
                    animate={control}
                    drag={false}
                    dragConstraints={dragConstraintRef}
                    dragDirectionLock
                    dragMomentum={false}
                    onDragEnd={(e, info) => {
                        const swipe = swipePower(
                            info.offset.x,
                            info.velocity.x
                        );
                        if (swipe < -swipeConfidenceThreshold) {
                            control.start({
                                x: -dragConstraintRef.current!.clientWidth,
                            });
                            posRef.current = 1;
                        } else if (swipe > swipeConfidenceThreshold) {
                            control.start({ x: 0 });
                            posRef.current = 0;
                        } else {
                            control.start({
                                x:
                                    -dragConstraintRef.current!.clientWidth *
                                    posRef.current,
                            });
                        }
                    }}
                    className="text-white h-full"
                >
                    {renderTabs()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
