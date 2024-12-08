import { userAtom } from "@/store";
import { useAtom } from "jotai";

export default function useUser() {
	const [user, setUser] = useAtom(userAtom);
	return [user, setUser] as const;
}
