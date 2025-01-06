import { getUserData } from "@/actions/User.action";
import UserHydration from "@/components/Util/UserHydration";
import WalletConnectWrapper from "@/context/WalletConnectWrapper";
import { cookies } from "next/headers";

export default async function ProtectLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getUserData();
	const cookieStore = await cookies();
	const access_token = cookieStore.get("access_token")?.value || "";
	const refresh_token = cookieStore.get("refresh_token")?.value || "";

	return (
		<UserHydration user={user} access_token={access_token} refresh_token={refresh_token}>
			<WalletConnectWrapper>
				{children}
			</WalletConnectWrapper>
		</UserHydration>
	);
}
