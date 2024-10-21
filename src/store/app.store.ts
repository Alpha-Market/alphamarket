import { create } from 'zustand';

type AppStore = {
    isWalletConnected: boolean;
    isLogin: boolean;
};

export const useAppStore = create<AppStore>((set) => ({
    isWalletConnected: false,
    isLogin: false,
}));
