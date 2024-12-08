"use client";

import { createContext, type ReactNode } from "react";

export const AuthContext = createContext<{ user: any }>({ user: null });

export function AuthProvider({ children }: { children: ReactNode }) {
	return (
		<AuthContext.Provider value={{ user: {} }}>
			{children}
		</AuthContext.Provider>
	);
}
