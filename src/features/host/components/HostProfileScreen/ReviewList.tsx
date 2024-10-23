import Image from "next/image";
import { CategoryChip } from "./HostDetailsBlock";

export default function ReviewList() {
    return (
        <div className="grid grid-cols-2 sm:flex sm:flex-col">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e) => (
                <Review />
            ))}
        </div>
    );
}

const Review = () => {
    return (
        <div className="py-6 px-3 flex items-center gap-4 border first-of-type:border-t-0 border-stroke-1 cursor-pointer">
            <Image
                src="/banner_test.png"
                alt="Host Profile Picture"
                width={102}
                height={102}
                className="w-[102px] h-[102px] object-cover rounded-[6px]"
            />

            <div className="flex-1 flex flex-col gap-[10px]">
                <div className="flex items-center gap-[10px]">
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
                        <span className="text-secondary-1 text-xs font-medium font-n">
                            @Alex_Block
                        </span>
                    </div>

                    <CategoryChip category="Fan" />
                </div>

                <p className="text-white text-base font-medium">
                    The best alpha!
                </p>

                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(() => (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={26}
                            height={25}
                            viewBox="0 0 31 30"
                            fill="none"
                        >
                            <g clipPath="url(#clip0_879_1943)">
                                <path
                                    d="M15.5001 22.825L6.68389 27.76L8.65264 17.85L1.23389 10.99L11.2676 9.8L15.5001 0.625L19.7326 9.8L29.7664 10.99L22.3476 17.85L24.3164 27.76L15.5001 22.825ZM15.5001 14.5V15V19V13.5V12V6.59375V14.5Z"
                                    fill="#EDEDED"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_879_1943">
                                    <rect
                                        width={30}
                                        height={30}
                                        fill="white"
                                        transform="translate(0.5)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    ))}
                </div>
            </div>
        </div>
    );
};
