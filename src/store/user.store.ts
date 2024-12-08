import type { User } from "@/types";

import { create } from "zustand/react";

interface UserStore {
	user: User | null;
	loadingUser: boolean;
	hostInfo: User | null;
}

export const useUserStore = create<UserStore>(set => ({
	user: null,
	loadingUser: true,
	hostInfo: null,
}));
