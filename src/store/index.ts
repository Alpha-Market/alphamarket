import type { User } from "@/types";
import { atom, createStore } from "jotai";

export const jotaiStore = createStore();

export const accessTokenAtom = atom("");
accessTokenAtom.debugLabel = "Access Token";

export const refreshTokenAtom = atom("");
refreshTokenAtom.debugLabel = "Refresh Token";

export const isWalletConnectedAtom = atom("");
isWalletConnectedAtom.debugLabel = "isWalletConnected";

export const isLoginAtom = atom("");
isLoginAtom.debugLabel = "isLogin";

export const userAtom = atom<User | null>(null);
userAtom.debugLabel = "User";

export const viewedUserAtom = atom<User | null>(null);
viewedUserAtom.debugLabel = "Current Viewing User";
