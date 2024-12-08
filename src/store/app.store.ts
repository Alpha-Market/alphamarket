import { create } from "zustand/react";

interface AppStore {
	access_token: string;
	refresh_token: string;
	isWalletConnected: boolean;
	isLogin: boolean;
}

export const useAppStore = create<AppStore>(set => ({
	access_token: "",
	refresh_token: "",
	isWalletConnected: false,
	isLogin: false,
}));
