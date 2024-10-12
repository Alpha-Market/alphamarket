import { create } from 'zustand';

type AppStore = {
    isWalletConnected: boolean;
};

export const useAppStore = create<AppStore>((set) => ({
    isWalletConnected: false
}));
