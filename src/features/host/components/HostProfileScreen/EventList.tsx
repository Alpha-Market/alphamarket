import { useUserStore } from "@/store/user.store";
import { Campaign } from "@/types";
import Image from "next/image";

export default function EventList() {
    const user = useUserStore((state) => state.user);

    console.log({user});
    
    return (
        <div className="grid grid-cols-2 sm:flex sm:flex-col">
            {user?.campaigns &&
                typeof user.campaigns === "object" &&
                user?.campaigns.map((campaign) => (
                    <Event
                        key={campaign.id}
                        event={campaign}
                        hostName={user.displayName || user.email}
                    />
                ))}
        </div>
    );
}

const Event = ({ event, hostName }: { event: Campaign; hostName: string }) => {
    return (
        <div className="px-3 py-6 flex flex-col border first-of-type:border-t-0 border-stroke-1">
            <Image
                src={event.pfp_url}
                alt="Event Banner Image"
                width={1}
                height={69}
                className="object-cover w-full h-[69px] rounded-[6px] mb-4"
            />

            <h3 className="text-white text-base font-medium mb-3">
                {event.title}
            </h3>

            <div className="flex items-center gap-3 mb-3">
                <p className="text-secondary-1 text-xs font-medium uppercase">
                    HOST <span className="text-white">{hostName}</span>
                </p>

                <span className="w-[1px] h-2 bg-stroke-1" />

                <p className="text-secondary-1 text-xs font-medium uppercase">
                    {event.event_date}
                </p>

                <span className="w-[1px] h-2 bg-stroke-1" />

                <p className="text-secondary-1 text-xs font-medium uppercase">
                    {event.event_time} EST
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
