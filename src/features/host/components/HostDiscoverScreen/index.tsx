"use client";

import { cn, swipeConfidenceThreshold, swipePower } from "@/lib/utils";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

import { useRef, useState } from "react";

import HostList from "./HostList";

const TABS = ["For you"];

export default function HostDiscoverScreen() {
	const [selectedTab, setSelectedTab] = useState(TABS[0]);

	const dragConstraintRef = useRef<HTMLDivElement>(null);
	const posRef = useRef(0);

	const control = useAnimation();

	return (
		<div className="flex flex-col w-full max-h-[calc(100vh-80px)] overflow-y-auto">
			<div className="py-4 px-3">
				<p className="text-secondary-1 text-2xl font-medium leading-[97.5%] -tracking-[.96px]">
					Hosts Marketplace
				</p>
			</div>

			<div className="mt-7 flex flex-col" ref={dragConstraintRef}>
				<ul className="flex items-center gap-3 border-b border-stroke-1">
					{TABS.map(tab => (
						<li
							key={tab}
							className={cn(
								"relative p-3 text-base cursor-pointer capitalize",
								selectedTab === tab
									? "text-white font-bold"
									: "text-secondary-1 font-normal",
							)}
							onClick={() => setSelectedTab(tab)}
						>
							{tab}
							{selectedTab === tab
								? (
										<motion.div
											className="absolute -bottom-[1px] inset-x-0 h-[1px] bg-white"
											layoutId="hostDiscover-underline"
										/>
									)
								: null}
						</li>
					))}
				</ul>

				<AnimatePresence mode="wait">
					<motion.div
						key={selectedTab || "empty"}
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
								info.velocity.x,
							);
							if (swipe < -swipeConfidenceThreshold) {
								control.start({
									x: -dragConstraintRef.current!.clientWidth,
								});
								posRef.current = 1;
							}
							else if (swipe > swipeConfidenceThreshold) {
								control.start({ x: 0 });
								posRef.current = 0;
							}
							else {
								control.start({
									x:
                                        -dragConstraintRef.current!.clientWidth * posRef.current,
								});
							}
						}}
						className="text-white"
					>
						{selectedTab === TABS[0] && <HostList />}
						{selectedTab === TABS[1] && <div></div>}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
