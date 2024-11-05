import Image from "next/image";
import { CategoryChip } from "../HostProfileScreen/HostDetailsBlock";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export default function HostList() {
    const [hostList, setHostList] = useState<User[]>([]);

    useEffect(() => {
        const getHostList = async () => {
            const collecRef = collection(db, "users");
            const q = query(collecRef, where("role", "==", "host"));
            const snapshot = await getDocs(q);

            let t: User[] = [];
            snapshot.forEach((doc) => {
                if (doc.exists()) {
                    t.push(doc.data() as any);
                }
            });

            setHostList([...t]);
        };

        getHostList();
    }, []);

    return (
        <div className="grid grid-cols-2 sm:flex sm:flex-col">
            {hostList.map((host) => (
                <Link key={host.id} href={`/host?id=${host.id}`}>
                    <Host host={host} />
                </Link>
            ))}
        </div>
    );
}

const Host = ({ host }: { host: User }) => {
    return (
        <div className="py-6 px-3 flex items-center gap-4 border first-of-type:border-t-0 border-stroke-1 cursor-pointer">
            <Image
                src={host.pfp_url}
                alt="Host Profile Picture"
                width={102}
                height={102}
                className="w-[102px] h-[102px] object-cover rounded-[6px]"
            />

            <div className="flex-1 flex flex-col gap-[14px]">
                {host.twitterHandle && (
                    <div className="flex items-center gap-[6px] max-w-fit border border-stroke-1 rounded-[4px] p-2">
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
                            @{host.twitterHandle}
                        </span>
                    </div>
                )}

                <p className="text-white text-base font-medium">
                    {host.displayName || host.email}
                </p>

                {host.categories && typeof host.categories === "object" && (
                    <div className="flex items-center gap-1">
                        {host.categories.map((c) => (
                            <CategoryChip category={c} key={c} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
