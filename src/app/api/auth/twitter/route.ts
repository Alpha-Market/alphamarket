import { getApiBase } from "@/config";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const res = await axios.get(`${getApiBase()}/auth/twitter`);
		const oauth_url = res.data.oauth_url;
		return NextResponse.json({ oauth_url });
	}
	catch (err) {
		console.error(err);
		return NextResponse.json({ message: "Error in sign in using oauth" }, {
			status: 401,
		});
	}
}
