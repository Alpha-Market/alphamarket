import type { User } from "@/types";
import { getApiBase } from "@/config";

import axios from "axios";

import { cookies } from "next/headers";

export async function getUserData() {
	const cookieStore = await cookies();
	const access_token = cookieStore.get("access_token")?.value;

	try {
		const res = await axios.get(`${getApiBase()}/user`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return res.data.user as User;
	}
	catch (err) {
		console.log(err);
	}
}

export async function getUserDataById(id: string) {
	const cookieStore = await cookies();
	const access_token = cookieStore.get("access_token")?.value;

	const res = await axios.get(`${getApiBase()}/user/${id}`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	return res.data.user as User;
}
