import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "pbs.twimg.com",
			},
			{
				protocol: "https",
				hostname: "xuibrqzqjkatbcshqgky.supabase.co",
			},
		],
	},
	transpilePackages: ["jotai-devtools"],
};

export default nextConfig;
