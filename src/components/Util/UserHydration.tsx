"use client";

import type { User } from "@/types";

import type { PropsWithChildren } from "react";

import { accessTokenAtom, refreshTokenAtom, userAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

type Props = PropsWithChildren & {
	user: User;
	access_token: string;
	refresh_token: string;
};

export default function UserHydration({ user, access_token, refresh_token, children }: Props) {
	const setUser = useSetAtom(userAtom);
	const setAccessToken = useSetAtom(accessTokenAtom);
	const setRefreshToken = useSetAtom(refreshTokenAtom);

	useEffect(() => {
		setUser(user);
		setAccessToken(access_token);
		setRefreshToken(refresh_token);
	}, [user, access_token, refresh_token]);

	return <>{children}</>;
}
