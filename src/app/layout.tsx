import { getUserInfo } from "@/actions/User.action";
import UserHydration from "@/components/Util/UserHydration";
import Provider from "@/context/Provider";
import { cn } from "@/lib/utils";
import { interFont } from "@/util/fonts";
import "./globals.css";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const userInfo = await getUserInfo();

    return (
        <html lang="en" className={cn(interFont.className)}>
            <body className="w-screen h-screen overflow-hidden flex">
                <UserHydration userInfo={userInfo} />
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
