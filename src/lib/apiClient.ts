import type { InternalAxiosRequestConfig } from "axios";
import { getApiBaseForNextApiRoute } from "@/config";
import { accessTokenAtom, jotaiStore } from "@/store";
import axios from "axios";

export const apiClient = axios.create({
	baseURL: getApiBaseForNextApiRoute(),
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export async function interceptorRequestConfig(config: InternalAxiosRequestConfig<any>) {
	const access_token = jotaiStore.get(accessTokenAtom);
	config.headers.Authorization = `Bearer ${access_token}`;
	return config;
}

export async function interceptorErrorConfig(error: any) {
	return Promise.reject(error);
}

apiClient.interceptors.request.use(
	interceptorRequestConfig,
	interceptorErrorConfig,
);
