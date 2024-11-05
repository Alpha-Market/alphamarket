import { getUserById } from "@/actions/User.action";
import { User } from "@/types";
import { useEffect, useState } from "react";

export default function useGetUserById(uid: string) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<User | null>(null);

    useEffect(() => {
        getUserById(uid).then((user) => {
            setData(user);
            setLoading(false);
        });
    }, []);

    return {
        data,
        loading,
    };
}
