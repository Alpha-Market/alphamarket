import "./globals.css";
import Provider from "@/context/Provider";
import { interFont } from "@/util/fonts";
import { cn } from "@/util/util";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn(interFont.className)}>
            <body className="w-screen h-screen overflow-hidden flex">
                <Provider>
                    {children}
                </Provider>
            </body>
        </html>
    );
}
