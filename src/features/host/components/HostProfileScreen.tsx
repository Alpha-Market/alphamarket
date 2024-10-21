"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";

const HostCreateNewEventDialog = dynamic(
    () => import("./Dialog/HostCreateNewEventDialog"),
    {
        ssr: false,
        loading: () => (
            <button
                style={{
                    width: "117px", // Same dimensions as the original button
                    height: "44px",
                    backgroundColor: "#000",
                    borderRadius: ".5rem",
                }}
            >
                <p className="text-white text-sm font-semibold -tracking-[.98px] uppercase">
                    Create event
                </p>
            </button>
        ),
    }
);

const TABS = ["events", "details"];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

const HostProfileScreen = () => {
    const [selectedTab, setSelectedTab] = useState(TABS[0]);

    const dragConstraintRef = useRef<HTMLDivElement>(null);
    const posRef = useRef(0);

    const control = useAnimation();

    const paginate = (direction: number) => {
        if (direction === 1) {
            control.start({
                x: -dragConstraintRef.current!
                    .clientWidth /* transition: { duration: 0 } */,
            });
            posRef.current = 1;
            // setI(1)
        } else {
            control.start({ x: 0 /* transition: { duration: 0 } */ });
            // setI(0)
            posRef.current = 0;
        }
    };

    // useEffect(() => {
    //     if (posRef.current !== i) {
    //         if (i === 0) {
    //             control.start({ x: 0 });
    //             posRef.current = 0;
    //         } else {
    //             control.start({ x: -ref.current!.clientWidth });
    //             posRef.current = 1;
    //         }
    //     }
    //     refHead?.current?.scrollIntoView({ behavior: "smooth" });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <div className="flex flex-col w-full h-full px-4">
            <div className="p-3 bg-card-1 rounded-t-lg flex gap-4">
                <div className="w-[102px] h-full bg-card-2 rounded-md"></div>
                <div className="flex-1 flex flex-col gap-[14px]">
                    <div className="flex items-center gap-[6px] max-w-[110px] border border-stroke-1 rounded-[4px] p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={10}
                            height={10}
                            viewBox="0 0 10 10"
                            fill="none"
                        >
                            <path
                                d="M5.94784 4.23465L9.66837 -0.000488281H8.78703L5.55514 3.67607L2.97575 -0.000488281H0L3.90139 5.55965L0 10.0003H0.881334L4.29209 6.11689L7.0167 10.0003H9.99245M1.19943 0.650354H2.55341L8.78637 9.38143H7.43205"
                                fill="white"
                                fillOpacity="0.6"
                            />
                        </svg>

                        <div className="w-[1px] h-[10px] bg-stroke-1" />

                        <span className="text-secondary text-xs font-medium">
                            @Alex_Block
                        </span>
                    </div>

                    <p className="text-white text-base font-medium">
                        Alex Block
                    </p>

                    <div className="flex items-center gap-1">
                        <div className="bg-card-1 py-2 px-3 rounded-[80px]">
                            <p className="text-secondary text-xs font-medium">
                                Bitcoin
                            </p>
                        </div>

                        <div className="bg-card-1 py-2 px-3 rounded-[80px]">
                            <p className="text-secondary text-xs font-medium">
                                DeFi
                            </p>
                        </div>
                    </div>
                </div>

                <p className="text-secondary text-xs font-medium">#35</p>
            </div>

            <div className="p-3 bg-card-2 rounded-b-lg flex flex-col gap-4">
                <p className="text-white font-medium text-xs">
                    Spaces host, BTC, husband, and tech leader{" "}
                </p>

                <div className="flex items-center gap-3">
                    <p className="text-white text-xs font-medium uppercase">
                        24.7K &nbsp;
                        <span className="text-secondary text-xs font-medium uppercase">
                            followers
                        </span>
                    </p>

                    <div className="w-[1px] h-[8px] bg-stroke-1" />

                    <p className="text-white text-xs font-medium uppercase">
                        150 &nbsp;
                        <span className="text-secondary text-xs font-medium uppercase">
                            posts
                        </span>
                    </p>

                    <div className="w-[1px] h-[8px] bg-stroke-1" />

                    <p className="text-white text-xs font-medium uppercase">
                        24 &nbsp;
                        <span className="text-secondary text-xs font-medium uppercase">
                            holders
                        </span>
                    </p>
                </div>
            </div>

            <div className="relative mt-6 bg-white rounded-md p-3 flex items-center justify-between">
                <span className="text-black text-base font-semibold">
                    Events
                </span>

                <div className="flex items-center gap-3">
                    <button className="p-3 border border-black/10 rounded-lg bg-white">
                        <p className="text-black text-sm font-semibold -tracking-[.98px] uppercase">
                            Manage
                        </p>
                    </button>

                    <HostCreateNewEventDialog />
                </div>

                <div className="absolute top-0 left-[40%]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={67}
                        height={45}
                        viewBox="0 0 67 45"
                        fill="none"
                    >
                        <path
                            d="M30.1023 29.0493C31.1371 28.1062 32.4618 27.549 33.8515 27.4717C35.5818 27.3716 37.2916 27.0402 38.9432 26.4809C48.3814 23.3109 53.1387 14.1836 50.0876 5.09937C47.0366 -3.98482 37.7342 -8.39007 28.296 -5.22011C18.8577 -2.05014 14.1005 7.07723 17.1515 16.1614C18.7209 20.8342 21.9495 24.3359 26.152 26.1406C26.9139 26.4635 27.6019 26.9385 28.1738 27.5365C28.7457 28.1346 29.1895 28.8431 29.4781 29.6187L30.1023 29.0493ZM26.9132 -9.33712C38.5108 -13.2323 50.3516 -7.75544 54.2046 3.71662C58.0577 15.1887 51.9236 26.7027 40.3259 30.5979C38.3147 31.2792 36.221 31.6865 34.1011 31.809C33.7026 31.8312 33.324 31.9899 33.0288 32.2585L29.5504 35.4334C29.3402 35.6253 29.0862 35.7627 28.8105 35.8334C28.5349 35.9042 28.246 35.9061 27.9695 35.839C27.6929 35.772 27.437 35.638 27.2244 35.4489C27.0117 35.2598 26.8488 35.0213 26.7498 34.7545L25.406 31.1284C25.3237 30.908 25.1974 30.7068 25.0348 30.5369C24.8722 30.3671 24.6767 30.2321 24.4602 30.1403C19.252 27.906 15.0512 23.5488 13.0345 17.5442C9.18144 6.07212 15.3176 -5.44259 26.9132 -9.33712ZM23.2197 20.6221L26.0437 8.99889C26.1499 8.56133 26.3456 8.15054 26.6185 7.79244C26.8915 7.43435 27.2357 7.13673 27.6295 6.91838C28.0232 6.70002 28.458 6.56568 28.9063 6.52382C29.3546 6.48197 29.8067 6.53351 30.2341 6.6752L36.2527 8.66252C36.5214 8.75234 36.812 8.75213 37.0806 8.66193C37.3491 8.57173 37.581 8.39646 37.741 8.16266L42.579 1.04918C43.2251 0.101442 44.7057 0.758671 44.435 1.87585L41.611 13.4991C41.5048 13.9366 41.3091 14.3474 41.0361 14.7055C40.7632 15.0636 40.419 15.3612 40.0252 15.5796C39.6314 15.7979 39.1967 15.9323 38.7484 15.9741C38.3001 16.016 37.8479 15.9645 37.4206 15.8228L31.402 13.8354C31.1333 13.7456 30.8426 13.7458 30.5741 13.836C30.3055 13.9262 30.0737 14.1015 29.9137 14.3353L25.0749 21.4467C24.4288 22.3945 22.9482 21.7372 23.219 20.6201L23.2197 20.6221Z"
                            fill="black"
                            fillOpacity="0.1"
                        />
                    </svg>
                </div>

                <div className="absolute bottom-0 left-[50%]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={81}
                        height={29}
                        viewBox="0 0 81 29"
                        fill="none"
                    >
                        <path
                            d="M60.4245 40.0998L63.0791 40.8132C63.7832 41.0024 64.3832 41.4635 64.7473 42.0951C65.1113 42.7268 65.2096 43.4771 65.0204 44.1812L57.8867 70.7271C57.6975 71.4312 57.2364 72.0312 56.6048 72.3953C55.9732 72.7593 55.2228 72.8575 54.5188 72.6683L12.0452 61.2545C11.3412 61.0653 10.7411 60.6042 10.3771 59.9725C10.013 59.3409 9.91481 58.5906 10.104 57.8865L17.2377 31.3406C17.4269 30.6365 17.888 30.0365 18.5196 29.6724C19.1512 29.3084 19.9016 29.2101 20.6056 29.3993L23.2602 30.1127L23.9736 27.4581C24.6294 25.0179 25.7593 22.7307 27.299 20.7271C28.8387 18.7236 30.7579 17.0429 32.9472 15.7811C35.1364 14.5193 37.5527 13.701 40.0581 13.373C42.5636 13.045 45.1091 13.2137 47.5493 13.8695C49.9896 14.5253 52.2767 15.6553 54.2803 17.1949C56.2838 18.7346 57.9645 20.6539 59.2263 22.8431C60.4881 25.0323 61.3064 27.4486 61.6344 29.954C61.9624 32.4595 61.7937 35.005 61.1379 37.4452L60.4245 40.0998ZM21.8335 35.4219L16.1266 56.6587L53.2909 66.6458L58.9978 45.409L21.8335 35.4219ZM36.3343 45.0113L41.6435 46.438L38.7901 57.0564L33.4809 55.6297L36.3343 45.0113ZM55.1154 38.6731L55.8287 36.0185C56.7747 32.4983 56.2835 28.7465 54.4633 25.5884C52.643 22.4303 49.6428 20.1247 46.1226 19.1787C42.6024 18.2327 38.8505 18.7239 35.6925 20.5441C32.5344 22.3644 30.2288 25.3646 29.2828 28.8848L28.5694 31.5394L55.1154 38.6731Z"
                            fill="black"
                            fillOpacity="0.1"
                        />
                    </svg>
                </div>
            </div>

            <div className="mt-7 flex flex-col" ref={dragConstraintRef}>
                <ul className="flex items-center gap-3">
                    {TABS.map((tab) => (
                        <li
                            key={tab}
                            className={cn(
                                "relative p-3 text-base cursor-pointer capitalize",
                                selectedTab === tab
                                    ? "text-white font-bold"
                                    : "text-secondary font-normal"
                            )}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab}
                            {selectedTab === tab ? (
                                <motion.div
                                    className="absolute bottom-0 inset-x-0 h-[1px] bg-white"
                                    layoutId="underline"
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
                                        -dragConstraintRef.current!
                                            .clientWidth * posRef.current,
                                });
                            }
                        }}
                        className="text-white"
                    >
                        {selectedTab ? selectedTab : "😋"}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HostProfileScreen;
