import { getApiBase } from "@/config";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const swipeConfidenceThreshold = 10000;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function swipePower(offset: number, velocity: number) {
	return Math.abs(offset) * velocity;
}

export function verifyTokenLocally(expires_at: number) {
	const currentUnixTime = Math.floor(Date.now() / 1000);
	return currentUnixTime < expires_at;
}

export async function verifyTokenServerSide(access_token: string, refresh_token: string): Promise<{ authenticated: boolean; new_access_token: string; new_refresh_token: string }> {
	try {
		const res = await axios.post(
			`${getApiBase()}/auth/verify`,
			{
				refresh_token,
			},
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			},
		);

		const data = res.data;

		let new_access_token = "";
		let new_refresh_token = "";

		if ("access_token" in data && "refresh_token" in data) {
			new_access_token = data.access_token;
			new_refresh_token = data.refresh_token;
		}

		return { authenticated: true, new_access_token, new_refresh_token };
	}
	catch (err: any) {
		const msg = err.response.data.detail;
		console.error(msg);
		return { authenticated: false, new_access_token: "", new_refresh_token: "" };
	}
}
