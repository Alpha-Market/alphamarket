import Provider from "@/context/Provider";
import { cn } from "@/lib/utils";
import { interFont } from "@/util/fonts";
import "./globals.css";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn(interFont.className)}>
            <body className="w-screen h-screen overflow-hidden flex">
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
