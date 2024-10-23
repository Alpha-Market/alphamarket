"use client";

import { FC, useRef, useState } from "react";
import { useUserStore } from "@/store/user.store";
import { Catergories, Networks, UserRole } from "@/types";
import { db, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import OnBoardLayout from "@/components/Layout/OnBoardLayout";
import { cn } from "@/lib/utils";
import LoadingOverlay from "@/components/UI/common/LoadingOverlay";

const UserDetailsGatherScreen = ({
    onBack,
    onComplete,
}: {
    onBack: () => void;
    onComplete: () => void;
}) => {
    const user = useUserStore((state) => state.user);

    const [loading, setLoading] = useState(false);

    const [selectedCatergories, setSelectedCatergories] = useState<
        Catergories[]
    >(user?.categories || []);
    const [selectedNetwork, setSelectedNetwork] = useState<Networks | "">(
        user?.network || Networks.MERLIN
    );

    const [pfp, setPFP] = useState<File | null>(null);
    const [user_bio, setUserBio] = useState(user?.bio || "");
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleSumbit = async () => {
        setLoading(true);

        const storageRef = ref(storage, `host_pfp/${pfp?.name}`);
        const metadata = {
            contentType: pfp?.type,
        };

        try {
            const uploadTask = await uploadBytes(storageRef, pfp!, metadata);
            const pfp_url = await getDownloadURL(storageRef);

            await setDoc(
                doc(db, "users", user?.id as string),
                {
                    pfp_url: pfp_url,
                    categories: selectedCatergories,
                    network: selectedNetwork,
                    bio: user_bio,
                    isNewUser: user?.role === UserRole.Host ? true : false,
                },
                {
                    merge: true,
                }
            );

            useUserStore.setState({
                user: {
                    ...user,
                    pfp_url: "",
                    categories: selectedCatergories,
                    network: selectedNetwork,
                    bio: user_bio,
                } as any,
            });

            onComplete();
        } catch (err) {
            toast.error("Something went wrong");
            console.log("[HostFanDetailsScreen.tsx/handleSubmit]", err);
        }

        setLoading(false);
    };

    const isSubmitDisabled = () => {
        if (!pfp || !selectedCatergories || !selectedNetwork || !user_bio)
            return true;
        return false;
    };

    return (
        <OnBoardLayout>
            <div className="dialog-base sm:fixed sm:bottom-0 sm:inset-x-0 absolute sm:top-auto top-[10%] z-[100] w-full sm:max-w-full max-w-[422px] sm:rounded-b-none p-4 flex flex-col gap-4">
                {loading && <LoadingOverlay size={50} />}

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
                        {user?.role === UserRole.Host ? "Host" : "Fan"} details
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
                        pfp ? "p-0" : "py-8 px-6"
                    )}
                >
                    <>
                        {pfp ? (
                            <>
                                <img
                                    src={URL.createObjectURL(pfp)}
                                    alt="pfp"
                                    className="w-[388px] h-[82px] object-cover"
                                />
                                <div
                                    className="cursor-pointer absolute right-[20px] bg-black/80 p-2 rounded-full"
                                    onClick={() => {
                                        setPFP(null);
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
                                    Add PFP
                                </p>

                                {/* Upload Icon */}
                                <div
                                    className="relative z-[100] cursor-pointer"
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
                                            setPFP(e.target.files[0]);
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
                    </>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-secondary text-xs font-normal uppercase">
                        categories
                    </label>

                    <ul className="flex gap-4 items-center overflow-auto">
                        <CatergoryChip
                            text="Gaming"
                            type={Catergories.GAMING}
                            selectedCatergories={selectedCatergories}
                            setSelectedCatergories={setSelectedCatergories}
                        />
                        <CatergoryChip
                            text="Defi"
                            type={Catergories.DEFI}
                            selectedCatergories={selectedCatergories}
                            setSelectedCatergories={setSelectedCatergories}
                        />
                        <CatergoryChip
                            text="SocialFi"
                            type={Catergories.SOCIALFI}
                            selectedCatergories={selectedCatergories}
                            setSelectedCatergories={setSelectedCatergories}
                        />
                        <CatergoryChip
                            text="NFT/PFP"
                            type={Catergories.NFT_PFP}
                            selectedCatergories={selectedCatergories}
                            setSelectedCatergories={setSelectedCatergories}
                        />
                    </ul>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-secondary text-xs font-normal uppercase">
                        network
                    </label>

                    <ul className="flex gap-4 items-center">
                        <button
                            className="flex items-center gap-[10px] border border-white rounded-lg p-3"
                            onClick={() => {
                                setSelectedNetwork(Networks.SEPOLIA);
                            }}
                        >
                            <span className="text-white font-bold text-base">
                                Sepolia
                            </span>

                            {selectedNetwork === Networks.SEPOLIA && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={17}
                                    viewBox="0 0 16 17"
                                    fill="none"
                                >
                                    <path
                                        d="M8.00001 15.1668C4.31801 15.1668 1.33334 12.1822 1.33334 8.50016C1.33334 4.81816 4.31801 1.8335 8.00001 1.8335C11.682 1.8335 14.6667 4.81816 14.6667 8.50016C14.6667 12.1822 11.682 15.1668 8.00001 15.1668ZM8.00001 13.8335C9.4145 13.8335 10.7711 13.2716 11.7712 12.2714C12.7714 11.2712 13.3333 9.91465 13.3333 8.50016C13.3333 7.08567 12.7714 5.72912 11.7712 4.72893C10.7711 3.72873 9.4145 3.16683 8.00001 3.16683C6.58552 3.16683 5.22897 3.72873 4.22877 4.72893C3.22858 5.72912 2.66668 7.08567 2.66668 8.50016C2.66668 9.91465 3.22858 11.2712 4.22877 12.2714C5.22897 13.2716 6.58552 13.8335 8.00001 13.8335V13.8335ZM7.33534 11.1668L4.50668 8.33816L5.44934 7.3955L7.33534 9.2815L11.106 5.51016L12.0493 6.45283L7.33534 11.1668Z"
                                        fill="white"
                                    />
                                </svg>
                            )}
                        </button>
                    </ul>
                </div>

                <div className="flex flex-col gap-2 border-b border-stroke-1 pb-4">
                    <label
                        htmlFor="bio"
                        className="text-secondary text-xs font-normal uppercase"
                    >
                        bio
                    </label>

                    <textarea
                        name="bio"
                        id="bio"
                        className="rounded-lg bg-card-1 p-3 text-white text-sm resize-none"
                        rows={5}
                        onChange={(e) => {
                            setUserBio(e.target.value);
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

export default UserDetailsGatherScreen;

type CatergoryChipProps = {
    text: string;
    type: Catergories;
    selectedCatergories: Catergories[];
    setSelectedCatergories: (v: Catergories[]) => void;
};

const CatergoryChip: FC<CatergoryChipProps> = ({
    text,
    type,
    selectedCatergories,
    setSelectedCatergories,
}) => {
    const isSelected = selectedCatergories.includes(type);

    return (
        <button
            className={cn(
                "flex items-center gap-[10px] border rounded-lg p-3",
                isSelected ? "border-white" : "border-stroke-1"
            )}
            onClick={() => {
                if (isSelected) {
                    const t = selectedCatergories.filter((v) => v != type);
                    setSelectedCatergories([...t]);
                } else {
                    setSelectedCatergories([...selectedCatergories, type]);
                }
            }}
        >
            <span
                className={cn(
                    "text-base",
                    isSelected
                        ? "text-white font-bold"
                        : "text-secondary font-normal"
                )}
            >
                {text}
            </span>

            {/* {isSelected && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={17}
                    viewBox="0 0 16 17"
                    fill="none"
                >
                    <path
                        d="M8.00001 15.1668C4.31801 15.1668 1.33334 12.1822 1.33334 8.50016C1.33334 4.81816 4.31801 1.8335 8.00001 1.8335C11.682 1.8335 14.6667 4.81816 14.6667 8.50016C14.6667 12.1822 11.682 15.1668 8.00001 15.1668ZM8.00001 13.8335C9.4145 13.8335 10.7711 13.2716 11.7712 12.2714C12.7714 11.2712 13.3333 9.91465 13.3333 8.50016C13.3333 7.08567 12.7714 5.72912 11.7712 4.72893C10.7711 3.72873 9.4145 3.16683 8.00001 3.16683C6.58552 3.16683 5.22897 3.72873 4.22877 4.72893C3.22858 5.72912 2.66668 7.08567 2.66668 8.50016C2.66668 9.91465 3.22858 11.2712 4.22877 12.2714C5.22897 13.2716 6.58552 13.8335 8.00001 13.8335V13.8335ZM7.33534 11.1668L4.50668 8.33816L5.44934 7.3955L7.33534 9.2815L11.106 5.51016L12.0493 6.45283L7.33534 11.1668Z"
                        fill="white"
                    />
                </svg>
            )} */}
        </button>
    );
};
