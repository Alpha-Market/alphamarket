"use client";

import { cn } from "@/lib/utils";
import { FC, useRef, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/UI/dialog";
import Image from "next/image";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { wagmiConfig } from "@/lib/wagmiConfig";
import { SEPOLIA_GROUP_CAMPAIGNS_ABI } from "@/util/abi";
import { useUserStore } from "@/store/user.store";
import { useAccount } from "wagmi";
import { sepolia } from "viem/chains";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { v4 as uuid } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import LoadingOverlay from "@/components/UI/common/LoadingOverlay";
import { StartIconFill, StartIconOutline } from "@/util/Icons";

export default function CreateReviewDialog() {
    const user = useUserStore((state) => state.user);

    const [loading, setLoading] = useState(false);

    const [review, setReview] = useState("");
    const [rating, setRating] = useState<number>(0);

    const reset = () => {
        setReview("");
        setRating(0);
    };

    const handleSubmit = async () => {};

    return (
        <Dialog
            onOpenChange={() => {
                reset();
            }}
        >
            <DialogTrigger>
                <button className="p-3 border border-black/10 rounded-lg bg-[#D9D9D9]">
                    <p className="text-black text-sm font-semibold -tracking-[.98px] uppercase">
                        Leave review
                    </p>
                </button>
            </DialogTrigger>

            <DialogContent className="dialog-base p-4 max-h-[600px] flex flex-col">
                {/* Loading Screen */}
                {loading && <LoadingOverlay size={50} />}

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-white text-sm font-medium uppercase">
                            Leave review
                        </h4>
                        <DialogClose>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                            >
                                <path
                                    d="M7.99999 7.05732L11.3 3.75732L12.2427 4.69999L8.94266 7.99999L12.2427 11.3L11.3 12.2427L7.99999 8.94266L4.69999 12.2427L3.75732 11.3L7.05732 7.99999L3.75732 4.69999L4.69999 3.75732L7.99999 7.05732Z"
                                    fill="white"
                                />
                            </svg>
                        </DialogClose>
                    </div>
                    <div className="w-full h-[1.4px] bg-[#3A3A3A]" />
                </div>

                <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center gap-[10px]">
                        <p className="text-base text-white font-medium">
                            Alex Block
                        </p>

                        <div className="px-2 bg-[#0FD850] rounded-full">
                            <p className="text-white text-base font-medium">
                                Host
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        {Array(5)
                            .fill(0)
                            .map((e, idx) => {
                                const starNumber = idx + 1;

                                if (starNumber <= rating) {
                                    return (
                                        <div
                                            className="cursor-pointer"
                                            onClick={() => {
                                                if (starNumber === 1) {
                                                    setRating(
                                                        rating > 1 ? 1 : 0
                                                    );
                                                } else {
                                                    setRating(starNumber);
                                                }
                                            }}
                                        >
                                            <StartIconFill />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setRating(starNumber);
                                            }}
                                        >
                                            <StartIconOutline />
                                        </div>
                                    );
                                }
                            })}
                    </div>

                    <p className="text-base text-white font-medium">
                        Some things to think about in your review
                    </p>

                    <div className="flex items-center gap-[10px]">
                        <div className="rounded-full bg-[#282828] px-3 py-1">
                            <p className="text-base text-white font-medium">
                                Moderation
                            </p>
                        </div>

                        <div className="rounded-full bg-[#282828] px-3 py-1">
                            <p className="text-base text-white font-medium">
                                Speaker quality
                            </p>
                        </div>

                        <div className="rounded-full bg-[#282828] px-3 py-1">
                            <p className="text-base text-white font-medium">
                                Value gain
                            </p>
                        </div>
                    </div>

                    <textarea
                        cols={10}
                        rows={10}
                        placeholder="Write your review here"
                        className="bg-transparent text-white text-sm font-medium resize-none"
                        value={review}
                        onChange={(e) => {
                            setReview(e.target.value);
                        }}
                    />
                </div>

                <div className="w-full h-[1.4px] bg-[#3A3A3A]" />

                <DialogFooter>
                    <button
                        className="button-primary-base button-primary-disabled"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

type FieldsWithLabelProps = {
    label: string;
    type: "date" | "time" | "text" | "number";
    value: string | number;
    onChange: (v: string) => void;
};

const FieldsWithLabel: FC<FieldsWithLabelProps> = ({
    label,
    type,
    value,
    onChange,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={label}
                className="text-secondary-1 text-xs font-normal uppercase"
            >
                {label}
            </label>

            <input
                id={label}
                type={type}
                value={value}
                className="rounded-lg bg-card-1 p-3 text-white text-sm"
                onChange={(e) => {
                    onChange(e.target.value);
                }}
            />
        </div>
    );
};
