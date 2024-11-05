"use client";

import { useUserStore } from "@/store/user.store";
import { useRef, useState } from "react";
import ExpandableVerticalScrollViewCustom from "../Util/ExpandableVerticalScrollView";

type Message = {
    value: string;
    timestamp: string;
    author: string;
};

const HostFirstMessage = () => {
    const user = useUserStore((state) => state.user);
    const [messages, setMessages] = useState<Message[]>([]);
    const [msg, setMsg] = useState("");

    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex flex-col bg-black w-full h-full px-4">
            <div className="flex items-center gap-3 p-3 border-b border-b-stroke-1">
                <div className="cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path
                            d="M7.21871 7.99999L10.5187 11.3L9.57604 12.2427L5.33337 7.99999L9.57604 3.75732L10.5187 4.69999L7.21871 7.99999Z"
                            fill="white"
                            fillOpacity="0.6"
                        />
                    </svg>
                </div>

                <div className="flex-1 flex items-center gap-3">
                    <div className="bg-card-2 w-[32px] h-[32px] rounded-[4px]" />
                    <p className="text-secondary-1 text-xs font-medium">
                        Alex Block
                    </p>
                </div>

                <div className="cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path
                            d="M3 7C2.45 7 2 7.45 2 8C2 8.55 2.45 9 3 9C3.55 9 4 8.55 4 8C4 7.45 3.55 7 3 7ZM13 7C12.45 7 12 7.45 12 8C12 8.55 12.45 9 13 9C13.55 9 14 8.55 14 8C14 7.45 13.55 7 13 7ZM8 7C7.45 7 7 7.45 7 8C7 8.55 7.45 9 8 9C8.55 9 9 8.55 9 8C9 7.45 8.55 7 8 7Z"
                            fill="white"
                            fillOpacity="0.6"
                        />
                    </svg>
                </div>
            </div>

            <div className="flex-1 relative px-3 pt-3">
                <div className="bg-card-2 rounded-md p-3 flex items-center gap-4">
                    <p className="flex-[1] text-white sm:text-xs text-base font-medium">
                        Make your first post and earn points
                    </p>

                    <div className="bg-card-1 p-3 rounded-[80px] flex items-center justify-center">
                        <p className="text-white text-xs font-medium uppercase">
                            Post daily to earn points
                        </p>
                    </div>
                </div>

                {/* Chat Area */}
                {/* py-4 flex flex-col justify-end overflow-y-scroll bg-pink-500 */}

                <ExpandableVerticalScrollViewCustom
                    expand={false}
                    rootCls="flex-1 sm:max-h-[550px] max-h-[466px] py-4"
                    type="hover"
                >
                    <div className="flex flex-col w-full">
                        {messages.map((m, idx) => {
                            if (idx === messages.length - 1) {
                                return (
                                    <div key={m.value} ref={scrollRef}>
                                        <MessageChip m={m} />
                                    </div>
                                );
                            } else {
                                return <MessageChip m={m} key={m.value} />;
                            }
                        })}
                    </div>
                </ExpandableVerticalScrollViewCustom>
            </div>

            <form
                className="flex items-center gap-3 bg-card-1 p-3 rounded-lg mb-3"
                onSubmit={(e) => {
                    e.preventDefault();

                    if (!msg.trim()) return;

                    const t: Message = {
                        author: "Alex Block",
                        timestamp: new Date().toLocaleDateString(),
                        value: msg,
                    };

                    setMessages([...messages, t]);
                    setMsg("");

                    setTimeout(() => {
                        scrollRef.current?.scrollIntoView({
                            behavior: "smooth",
                        });
                    }, 100);
                }}
            >
                <input
                    type="text"
                    className="bg-transparent flex-1 text-tertiary text-base font-normal"
                    placeholder="Write something"
                    value={msg}
                    onChange={(e) => {
                        setMsg(e.target.value);
                    }}
                />

                <button type="submit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path
                            d="M1.28201 6.24686C0.942012 6.11019 0.946012 5.90686 1.30468 5.78752L14.0287 1.54619C14.3813 1.42886 14.5833 1.62619 14.4847 1.97152L10.8487 14.6955C10.7487 15.0482 10.532 15.0642 10.3707 14.7422L7.33335 8.66686L1.28201 6.24686ZM4.54201 6.11352L8.29935 7.61686L10.326 11.6715L12.69 3.39819L4.54135 6.11352H4.54201Z"
                            fill="white"
                            fillOpacity="0.6"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default HostFirstMessage;

const MessageChip = ({ m }: { m: Message }) => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col items-end gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-secondary-1 text-xs uppercase font-medium">
                        {m.timestamp}
                    </span>
                    <div className="w-8 h-8 bg-card-1 rounded-[4px]"></div>
                    <span className="text-secondary-1 text-xs uppercase font-medium">
                        {m.author}
                    </span>
                </div>

                <p className="text-white text-sm font-medium">{m.value}</p>
            </div>

            <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-card-1 rounded-[4px]"></div>
                    <span className="text-secondary-1 text-xs uppercase font-medium">
                        Point system
                    </span>
                </div>

                <button className="flex gap-1 items-center py-3 px-4 rounded-[100px] border border-stroke-1 bg-[#292929] shadow-[0px_4px_4px_0px_rgba(0_0_0_0.25)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path
                            d="M8.00004 14.6668C4.31804 14.6668 1.33337 11.6822 1.33337 8.00016C1.33337 4.31816 4.31804 1.3335 8.00004 1.3335C11.682 1.3335 14.6667 4.31816 14.6667 8.00016C14.6667 11.6822 11.682 14.6668 8.00004 14.6668ZM8.00004 13.3335C9.41453 13.3335 10.7711 12.7716 11.7713 11.7714C12.7715 10.7712 13.3334 9.41465 13.3334 8.00016C13.3334 6.58567 12.7715 5.22912 11.7713 4.22893C10.7711 3.22873 9.41453 2.66683 8.00004 2.66683C6.58555 2.66683 5.229 3.22873 4.2288 4.22893C3.22861 5.22912 2.66671 6.58567 2.66671 8.00016C2.66671 9.41465 3.22861 10.7712 4.2288 11.7714C5.229 12.7716 6.58555 13.3335 8.00004 13.3335ZM8.66671 8.66683H10.6667V10.0002H8.66671V11.3335H7.33337V10.0002H5.33337V8.66683H7.33337V8.00016H5.33337V6.66683H7.05737L5.64271 5.25283L6.58671 4.3095L8.00004 5.72416L9.41404 4.3095L10.3574 5.25283L8.94271 6.66683H10.6667V8.00016H8.66671V8.66683Z"
                            fill="#FE01BE"
                        />
                    </svg>

                    <span className="text-secondary-1 text-xs font-medium">
                        +12 Credited
                    </span>
                </button>
            </div>
        </div>
    );
};
