import type { User } from "@/types";
import { apiClient } from "@/lib/apiClient";

export async function getHostList() {
	try {
		const res = await apiClient.get("/user/all?role=host");
		return res.data as User[];
	}
	catch (err) {
		console.log("[user.ts/getHostList()]", err);
		return [];
	}
}
