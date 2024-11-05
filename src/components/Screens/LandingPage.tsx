import { poppinFont } from "@/util/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

const LandingPage = () => {
    return (
        <div
            className={cn(
                poppinFont.className,
                "flex flex-col bg-black w-full overflow-y-auto"
            )}
        >
            <div className="flex max-h-screen">
                <img
                    src="/landing_bg.png"
                    alt=""
                    className="w-full h-full max-w-[537px]"
                />
                <div className="flex flex-col justify-center pl-6 flex-1">
                    <h1
                        className={
                            "text-white text-[64px] font-semibold leading-[71.232px] -tracking-[4.48px] mb-[17px] max-w-[522px]"
                        }
                    >
                        Aligning Creators, Fans, and Brands
                    </h1>
                    <p
                        className={
                            "text-white/80 text-2xl font-normal -tracking-[1.2px] mb-[36px]"
                        }
                    >
                        A Web3 Alpha Curation Market
                    </p>

                    <div className="flex items-center gap-[10px]">
                        <Link href={"/auth"}>
                            <button className="py-2 px-3 flex items-center justify-center gap-[10px] bg-card-2 border border-stroke-1 rounded-[170px]">
                                <span className="text-[#FE01BE] text-xs font-semibold leading-[12px] -tracking-[.6px]">
                                    Sign up for Beta Waitlist
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"
                                        fill="white"
                                        fillOpacity="0.2"
                                    />
                                </svg>
                            </button>
                        </Link>

                        <button className="bg-transparent border-none outline-none p-3">
                            <span
                                className={
                                    "text-white font-semibold text-xs -tracking-[.6px] leading-[12px]"
                                }
                            >
                                Buy Meta membership
                            </span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between p-6">
                    <Link href={"/"}>
                        <button className="bg-transparent border-none outline-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={38}
                                height={39}
                                viewBox="0 0 38 39"
                                fill="none"
                            >
                                <path
                                    d="M12.9513 17.438L11.6335 30.1732C11.6008 30.4886 11.4519 30.7805 11.2158 30.9922C10.9797 31.2039 10.6733 31.3202 10.3562 31.3185H6.08768C5.90843 31.3195 5.73099 31.2827 5.5669 31.2105C5.40281 31.1384 5.25574 31.0325 5.13526 30.8997C5.01478 30.767 4.92358 30.6104 4.8676 30.4401C4.81162 30.2698 4.7921 30.0897 4.81033 29.9113L6.13665 17.1868C6.16941 16.8714 6.31832 16.5794 6.55441 16.3677C6.79051 16.156 7.0969 16.0397 7.414 16.0414H11.6889C11.8659 16.0427 12.0407 16.0808 12.2022 16.1532C12.3637 16.2256 12.5084 16.3308 12.6271 16.4621C12.7458 16.5935 12.836 16.748 12.8918 16.916C12.9476 17.084 12.9679 17.2617 12.9513 17.438Z"
                                    fill="white"
                                />
                                <path
                                    d="M31.1412 31.3124H26.8727C26.5556 31.3141 26.2492 31.1978 26.0131 30.9861C25.777 30.7744 25.6281 30.4825 25.5954 30.1671L24.2754 17.4382C24.2572 17.2599 24.2767 17.0797 24.3327 16.9095C24.3887 16.7392 24.4799 16.5826 24.6003 16.4498C24.7208 16.3171 24.8679 16.2112 25.032 16.1391C25.1961 16.0669 25.3735 16.0301 25.5528 16.031H29.8213C30.1384 16.0293 30.4448 16.1456 30.6809 16.3573C30.917 16.569 31.0658 16.861 31.0986 17.1764L32.4185 29.9052C32.4368 30.0835 32.4173 30.2637 32.3613 30.434C32.3053 30.6043 32.2141 30.7609 32.0936 30.8936C31.9732 31.0263 31.8261 31.1322 31.662 31.2044C31.4979 31.2765 31.3204 31.3134 31.1412 31.3124Z"
                                    fill="white"
                                />
                                <path
                                    d="M35.9526 39H1.27673C1.05811 38.9999 0.843169 38.9437 0.65249 38.8368C0.461811 38.7298 0.301765 38.5757 0.187685 38.3892C0.0736059 38.2027 0.00930737 37.99 0.00093677 37.7716C-0.00743383 37.5531 0.0404066 37.3362 0.139881 37.1415L1.41723 34.64C1.52409 34.4309 1.68654 34.2552 1.88673 34.1324C2.08692 34.0096 2.3171 33.9444 2.55195 33.9439H34.671C34.9077 33.9432 35.14 34.0083 35.3419 34.132C35.5438 34.2557 35.7073 34.433 35.8142 34.6443L37.0916 37.1457C37.1901 37.3404 37.2372 37.5571 37.2282 37.7752C37.2192 37.9932 37.1546 38.2053 37.0404 38.3912C36.9262 38.5772 36.7662 38.7308 36.5758 38.8373C36.3854 38.9439 36.1708 38.9999 35.9526 39Z"
                                    fill="white"
                                />
                                <path
                                    d="M1.72177 8.04541H36.1975C36.4127 8.04564 36.6243 8.10021 36.8127 8.20406C37.0011 8.30791 37.1603 8.45766 37.2754 8.63943C37.3905 8.82121 37.4578 9.0291 37.4711 9.24384C37.4844 9.45857 37.4432 9.67319 37.3514 9.86777L35.9953 12.7333C35.8918 12.9517 35.7284 13.1363 35.5241 13.2655C35.3199 13.3948 35.0831 13.4635 34.8414 13.4635H3.08003C2.83831 13.4635 2.60158 13.3948 2.39733 13.2655C2.19308 13.1363 2.02969 12.9517 1.92616 12.7333L0.567903 9.86777C0.476107 9.67319 0.434948 9.45857 0.448242 9.24384C0.461535 9.0291 0.528849 8.82121 0.643943 8.63943C0.759037 8.45766 0.918179 8.30791 1.1066 8.20406C1.29503 8.10021 1.50663 8.04564 1.72177 8.04541Z"
                                    fill="white"
                                />
                                <path
                                    d="M29.2697 5.41386H8.30198C8.10302 5.41438 7.90668 5.36842 7.72862 5.27964C7.55057 5.19086 7.39571 5.06171 7.2764 4.90249C7.15708 4.74327 7.07661 4.55838 7.0414 4.36256C7.00619 4.16673 7.01721 3.96539 7.07359 3.77458L7.92516 0.909054C8.00435 0.646061 8.16621 0.415598 8.38671 0.251848C8.60722 0.0880986 8.87463 -0.000220176 9.14929 4.12208e-07H28.3969C28.6715 -0.000220176 28.9389 0.0880986 29.1595 0.251848C29.38 0.415598 29.5418 0.646061 29.621 0.909054L30.4917 3.77458C30.548 3.96487 30.5591 4.16565 30.5242 4.36098C30.4893 4.55632 30.4094 4.74085 30.2908 4.89993C30.1722 5.05902 30.0182 5.18828 29.841 5.27749C29.6637 5.3667 29.4682 5.41339 29.2697 5.41386Z"
                                    fill="white"
                                />
                                <path
                                    d="M21.4416 31.3125H15.8021C15.6242 31.3133 15.4481 31.2768 15.2852 31.2056C15.1222 31.1343 14.9759 31.0298 14.8556 30.8987C14.7354 30.7677 14.6438 30.6129 14.5869 30.4444C14.5299 30.2759 14.5087 30.0974 14.5247 29.9202L15.6978 17.1871C15.727 16.869 15.8744 16.5735 16.1109 16.3587C16.3473 16.1439 16.6557 16.0255 16.9751 16.0269H20.2728C20.5922 16.0255 20.9006 16.1439 21.137 16.3587C21.3735 16.5735 21.5209 16.869 21.5502 17.1871L22.7232 29.916C22.7399 30.0938 22.7191 30.2732 22.6621 30.4425C22.6052 30.6118 22.5133 30.7673 22.3926 30.8989C22.2718 31.0305 22.1247 31.1353 21.9609 31.2066C21.7971 31.2778 21.6202 31.3139 21.4416 31.3125Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </Link>

                    <button className="bg-transparent border-none outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={33}
                            height={32}
                            viewBox="0 0 33 32"
                            fill="none"
                        >
                            <path
                                d="M23.6383 5.65698H27.3184L19.2783 14.6935L28.7368 26.9903H21.3309L15.5303 19.5324L8.89312 26.9903H5.21074L13.8104 17.3247L4.73682 5.65698H12.3307L17.574 12.4738L23.6383 5.65698ZM22.3465 24.8242H24.3859L11.2227 7.70936H9.03442L22.3465 24.8242Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center py-[160px]">
                    <div className="bg-[#181719] rounded-[120px] shadow-[0px_4px_171px_0px_rgba(242_233_255_0.10)] max-w-[1078px] max-h-[689px] flex">
                        <div className="flex-[.5] bg-[#141414] rounded-[120px] py-[166px] px-[54px] flex flex-col gap-[10px]">
                            <h2 className="text-white text-[76px] font-normal leading-[60.8px] -tracking-[6.84px] capitalize max-w-[8ch]">
                                Get in on the Alpha
                            </h2>
                            <div className="w-[11px] h-[46px] bg-[#FE01BE] rounded-[43px]" />

                            <p className="text-[#FE01BE] text-[26px] font-semibold tracking-[1.3px] lowercase border-b-[3px] border-b-white border-dotted w-max pb-[5px]">
                                alpha groups
                            </p>
                            <p className="text-[#F2E9FF80] text-[26px] font-normal tracking-[1.3px] lowercase border-b-[1px] border-b-white border-dotted w-max pb-[5px]">
                                event campaigns
                            </p>
                            <p className="text-[#F2E9FF80] text-[26px] font-normal tracking-[1.3px] lowercase border-b-[1px] border-b-white border-dotted w-max pb-[5px]">
                                Member DAO
                            </p>
                        </div>

                        <div className="flex-[.5] flex items-center justify-center px-[61px]">
                            <p
                                className={
                                    "text-white text-[32px] font-medium tracking-[1.6px] lowercase"
                                }
                            >
                                join token gated alpha groups and get plugged
                                into a network{" "}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-16 py-[160px]">
                    <h1 className="text-center text-white text-[68px] font-semibold leading-[80%] -tracking-[6.12px] lowercase">
                        roadmap
                    </h1>

                    <div className="grid grid-cols-2 gap-[10px] max-w-[1078px]">
                        <div className="col-span-2 bg-white/10 rounded-[120px] shadow-[0px_4px_171px_0px_rgba(242_233_255_0.10)] h-[689px] flex items-center justify-center px-[54px]">
                            <div className="flex flex-col justify-center gap-[10px]">
                                <h2 className="text-white text-[76px] font-medium leading-[80%] -tracking-[6.84px] capitalize">
                                    {"Brand-Partner"}
                                    <br /> {"Management Platform"}
                                </h2>

                                <div className="w-[11px] h-[46px] bg-[#FE01BE] rounded-[43px]" />

                                <p className="text-white text-[32px] font-medium tracking-[1.6px] lowercase">
                                    Pair creators and brands in a transparent
                                    and seamless payout that benefits creators
                                    and their communities in alignment in
                                    loyalty guilds
                                </p>
                            </div>
                        </div>

                        <div className="col-span-1 h-[689px] bg-[#F2E9FF] rounded-[120px] shadow-[0px_4px_171px_0px_rgba(242_233_255_0.10)] flex items-center justify-center px-[54px]">
                            <div className="flex flex-col justify-center gap-[10px]">
                                <h2 className="text-[#141414] text-[76px] font-medium leading-[80%] -tracking-[6.84px] capitalize">
                                    Curation Market
                                </h2>

                                <div className="w-[11px] h-[46px] bg-[#D2B4FC] rounded-[43px]" />

                                <p className="text-[#141414] text-[32px] font-medium tracking-[1.6px] lowercase">
                                    get brand sponsors seamlessly through event
                                    campaigns
                                </p>
                            </div>
                        </div>

                        <div className="col-span-1 h-[689px] bg-[#CF58E7] rounded-[120px] shadow-[0px_4px_171px_0px_rgba(242_233_255_0.10)] flex items-center justify-center px-[54px]">
                            <div className="flex flex-col justify-center gap-[10px]">
                                <h2 className="text-[#141414] text-[76px] font-medium leading-[80%] -tracking-[6.84px] capitalize">
                                    Leaderboard snapshot
                                </h2>

                                <div className="flex items-end gap-[10px]">
                                    <div className="w-[11px] h-[46px] bg-white rounded-[43px]" />
                                    <div className="w-[11px] h-[32px] bg-white rounded-[43px]" />
                                    <div className="w-[11px] h-[11px] bg-white rounded-[43px]" />
                                </div>

                                <p className="text-[#141414] text-[32px] font-medium tracking-[1.6px] lowercase">
                                    the most active members get rewarded
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="flex items-center justify-center py-[190px]">
                <div className="w-[1124px] h-[629px] bg-[#422B83] rounded-[80px] flex items-center justify-center">
                    <form className="flex flex-col items-center gap-[46px]">
                        <div className="flex flex-col items-center">
                            <p className="text-white text-[152px] font-semibold leading-[80%] -tracking-[13.68px] capitalize">
                                Stay in
                            </p>
                            <p className="text-black text-[152px] font-semibold leading-[80%] -tracking-[13.68px] capitalize">
                                loop
                            </p>
                        </div>

                        <input
                            type="text"
                            className="w-[393px] bg-transparent border-b-[5px] border-white/50 text-white/50 placeholder:text-white/50 text-center text-2xl font-semibold leading-[80%] -tracking-[2.16px] pb-[4px]"
                            placeholder="your email"
                        />

                        <button className="flex items-center justify-center gap-[10px] py-1 border-[1px] border-white/10 rounded-[170px] bg-white/5 w-[182px]">
                            <p className="text-white/50 font-medium text-xl">
                                Submit
                            </p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"
                                    fill="white"
                                    fillOpacity="0.2"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
