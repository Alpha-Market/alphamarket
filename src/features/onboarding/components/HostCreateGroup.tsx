"use client";

import OnBoardLayout from "@/components/Layout/OnBoardLayout";
import { db, storage } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { wagmiConfig } from "@/lib/wagmiConfig";
import { useUserStore } from "@/store/user.store";
import {
    SEPOLIA_EXPONENTIAL_BONDING_CURVE_ABI,
    SEPOLIA_EXPONENTIAL_TOKEN_ABI,
} from "@/util/abi";
import { POLYGON_EXPONENTIAL_TOKEN_BYTECODE, SEPOLIA_EXPONENTIAL_TOKEN_BYTECODE } from "@/util/bytecode";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { polygonZkEvmCardona, sepolia } from "wagmi/chains";
import { useAccount, useReadContract } from "wagmi";
import { deployContract, waitForTransactionReceipt } from "wagmi/actions";

const HostCreateGroup = ({
    onBack,
    onComplete,
}: {
    onBack: () => void;
    onComplete: () => void;
}) => {
    const { address: userWalletAddress } = useAccount();
    const [group_photo, setGroupPhoto] = useState<File | null>(null);
    const [group_name, setGroupName] = useState("");
    const [group_ticker, setGroupTicker] = useState("");
    const [group_description, setGroupDescription] = useState("");

    const inputFileRef = useRef<HTMLInputElement>(null);

    const user = useUserStore((state) => state.user);

    const { data: initialReserveValue } = useReadContract({
        abi: SEPOLIA_EXPONENTIAL_BONDING_CURVE_ABI,
        address: process.env
            .NEXT_PUBLIC_POLYGON_EXPONENTIAL_PROXY as `0x${string}`,
        functionName: "initialReserve",
        chainId: polygonZkEvmCardona.id,
    });

    const handleSumbit = async () => {
        const storageRef = ref(storage, `group_pfp/${group_photo?.name}`);
        const metadata = {
            contentType: group_photo?.type,
        };

        try {
            console.log("Deploy Contract");
            console.log(process.env.NEXT_PUBLIC_POLYGON_EXPONENTIAL_PROXY);

            const deployedContractTxHash = await deployContract(wagmiConfig, {
                abi: SEPOLIA_EXPONENTIAL_TOKEN_ABI,
                args: [
                    group_name,
                    group_ticker,
                    process.env.NEXT_PUBLIC_POLYGON_EXPONENTIAL_PROXY,
                    userWalletAddress,
                ],
                bytecode: POLYGON_EXPONENTIAL_TOKEN_BYTECODE,
                value: initialReserveValue as bigint,
                chainId: polygonZkEvmCardona.id,
            });

            console.log({ deployedContractTxHash });

            const txRes = await waitForTransactionReceipt(wagmiConfig, {
                hash: deployedContractTxHash,
            });

            console.log("Deployed Contract = ", txRes);

            const uploadTask = await uploadBytes(
                storageRef,
                group_photo!,
                metadata
            );
            const pfp_url = await getDownloadURL(storageRef);

            const groupId = uuid();

            await setDoc(doc(db, "users", user?.id as string), {
                isNewUser: false,
                group: {
                    id: groupId,
                    pfp_url: pfp_url,
                    name: group_name,
                    ticker: group_ticker,
                    description: group_description,
                    contractAddress: txRes.contractAddress,
                },
            });

            useUserStore.setState({
                user: {
                    ...user,
                    isNewUser: false,
                    group: {
                        id: groupId,
                        pfp_url: pfp_url,
                        name: group_name,
                        ticker: group_ticker,
                        description: group_description,
                        contractAddress: txRes.contractAddress,
                    },
                } as any,
            });

            onComplete();
        } catch (err) {
            toast.error("Something went wrong");
            console.log("[HostCreateGroup/handleSubmit]", err);
        }
    };

    const isSubmitDisabled = () => {
        if (!group_photo || !group_name || !group_ticker || !group_description)
            return true;
        return false;
    };

    return (
        <OnBoardLayout>
            {/* Box */}
            <div className="sm:fixed sm:bottom-0 sm:inset-x-0 absolute sm:top-auto top-[10%] z-[100] bg-card-1 w-full sm:max-w-full max-w-[422px] border border-stroke-1 sm:rounded-b-none rounded-xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-b-stroke-1 pb-4">
                    {/* Back Icon */}
                    <div className="cursor-pointer" onClick={onBack}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M5.21866 7.33312H13.3333V8.66645H5.21866L8.79466 12.2425L7.85199 13.1851L2.66666 7.99979L7.85199 2.81445L8.79466 3.75712L5.21866 7.33312Z"
                                fill="white"
                            />
                        </svg>
                    </div>

                    <p className="text-white text-sm font-medium uppercase">
                        Create Group
                    </p>

                    {/* Close Icon */}
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={17}
                            viewBox="0 0 16 17"
                            fill="none"
                        >
                            <path
                                d="M7.99999 7.36445L11.3 4.06445L12.2427 5.00712L8.94266 8.30712L12.2427 11.6071L11.3 12.5498L7.99999 9.24979L4.69999 12.5498L3.75732 11.6071L7.05732 8.30712L3.75732 5.00712L4.69999 4.06445L7.99999 7.36445Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                </div>

                <div
                    className={cn(
                        "relative flex items-center justify-between border border-stroke-1 rounded-xl overflow-hidden",
                        group_photo ? "p-0" : "py-8 px-6"
                    )}
                >
                    {group_photo ? (
                        <>
                            <img
                                src={URL.createObjectURL(group_photo)}
                                alt=""
                                className="w-[388px] h-[82px] object-cover"
                            />
                            <div
                                className="cursor-pointer absolute right-[20px] bg-black/80 p-2 rounded-full"
                                onClick={() => {
                                    setGroupPhoto(null);
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M17 6H22V8H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V8H2V6H7V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H16C16.2652 2 16.5196 2.10536 16.7071 2.29289C16.8946 2.48043 17 2.73478 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-secondary text-xs font-bold uppercase">
                                Add Photo
                            </p>

                            {/* Upload Icon */}
                            <div
                                className="cursor-pointer relative z-[100]"
                                onClick={() => {
                                    inputFileRef.current?.click();
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <path
                                        d="M2.66665 12.6667H13.3333V8H14.6666V13.3333C14.6666 13.5101 14.5964 13.6797 14.4714 13.8047C14.3464 13.9298 14.1768 14 14 14H1.99998C1.82317 14 1.6536 13.9298 1.52858 13.8047C1.40355 13.6797 1.33331 13.5101 1.33331 13.3333V8H2.66665V12.6667ZM8.66665 6V10.6667H7.33331V6H3.99998L7.99998 2L12 6H8.66665Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>

                            <input
                                type="file"
                                className="hidden"
                                ref={inputFileRef}
                                onChange={(e) => {
                                    if (
                                        e.target.files &&
                                        e.target.files.length > 0
                                    ) {
                                        const t = e.target.files[0];
                                        setGroupPhoto(e.target.files[0]);
                                    }
                                }}
                            />

                            {/* Gradient Background */}
                            <div className="absolute right-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={155}
                                    height={80}
                                    viewBox="0 0 155 80"
                                    fill="none"
                                >
                                    <g filter="url(#filter0_f_244_10264)">
                                        <circle
                                            cx={127}
                                            cy={23}
                                            r={40}
                                            fill="#FE01BE"
                                        />
                                    </g>
                                    <defs>
                                        <filter
                                            id="filter0_f_244_10264"
                                            x="0.400002"
                                            y="-103.6"
                                            width="253.2"
                                            height="253.2"
                                            filterUnits="userSpaceOnUse"
                                            colorInterpolationFilters="sRGB"
                                        >
                                            <feFlood
                                                floodOpacity={0}
                                                result="BackgroundImageFix"
                                            />
                                            <feBlend
                                                mode="normal"
                                                in="SourceGraphic"
                                                in2="BackgroundImageFix"
                                                result="shape"
                                            />
                                            <feGaussianBlur
                                                stdDeviation="43.3"
                                                result="effect1_foregroundBlur_244_10264"
                                            />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="bio"
                        className="text-secondary text-xs font-normal uppercase"
                    >
                        name
                    </label>

                    <input
                        type="text"
                        className="rounded-lg bg-card-1 p-3 text-white text-sm"
                        onChange={(e) => {
                            setGroupName(e.target.value);
                        }}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="bio"
                        className="text-secondary text-xs font-normal uppercase"
                    >
                        Ticker
                    </label>

                    <input
                        type="text"
                        className="rounded-lg bg-card-1 p-3 text-white text-sm"
                        onChange={(e) => {
                            setGroupTicker(e.target.value);
                        }}
                    />
                </div>

                <div className="flex flex-col gap-2 border-b border-b-stroke-1 pb-4">
                    <label
                        htmlFor="bio"
                        className="text-secondary text-xs font-normal uppercase"
                    >
                        Description{" "}
                    </label>

                    <textarea
                        name="bio"
                        id="bio"
                        className="rounded-lg bg-card-1 p-3 text-white text-sm resize-none"
                        rows={5}
                        onChange={(e) => {
                            setGroupDescription(e.target.value);
                        }}
                    ></textarea>
                </div>

                <button
                    disabled={isSubmitDisabled()}
                    className={cn(
                        "text-black font-semibold text-sm uppercase p-3 rounded-lg",
                        isSubmitDisabled()
                            ? "bg-white/50 cursor-not-allowed"
                            : "bg-white cursor-pointer"
                    )}
                    onClick={handleSumbit}
                >
                    Next
                </button>
            </div>
        </OnBoardLayout>
    );
};

export default HostCreateGroup;
