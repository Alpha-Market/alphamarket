import Image from "next/image";

export default function EventList() {
    return (
        <div className="grid grid-cols-2 sm:flex sm:flex-col">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e) => (
                <Event />
            ))}
        </div>
    );
}

const Event = () => {
    return (
        <div className="px-3 py-6 flex flex-col border first-of-type:border-t-0 border-stroke-1">
            <Image
                src="/banner_test.png"
                alt="Event Banner Image"
                width={1}
                height={69}
                className="object-cover w-full h-[69px] rounded-[6px] mb-4"
            />

            <h3 className="text-white text-base font-medium mb-3">
                Ordinals & ZK apps
            </h3>

            <div className="flex items-center gap-3 mb-3">
                <p className="text-secondary-1 text-xs font-medium uppercase">
                    HOST{" "}
                    <span className="text-white">Alex Block</span>
                </p>

                <span className="w-[1px] h-2 bg-stroke-1" />

                <p className="text-secondary-1 text-xs font-medium uppercase">
                    02/12
                </p>

                <span className="w-[1px] h-2 bg-stroke-1" />

                <p className="text-secondary-1 text-xs font-medium uppercase">
                    6PM EST
                </p>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-[80px] bg-[#0D0D0D]">
                    <p className="text-secondary-1 text-xs font-medium uppercase">
                        0.0.1 BTC
                    </p>
                </div>

                <div className="p-2 rounded-[80px] bg-[#0D0D0D]">
                    <p className="text-secondary-1 text-xs font-medium uppercase">
                        1 spot left
                    </p>
                </div>
            </div>

            <button className="button-primary-base max-w-[130px]">
                <p className="text-black text-sm font-semibold uppercase -tracking-[.98px]">
                    sponsor space
                </p>
            </button>
        </div>
    );
};
