import { User } from '@/types';
import { create } from 'zustand';

type UserStore = {
    user: User | null;
};

export const useUserStore = create<UserStore>((set) => ({
    user: null
}));
