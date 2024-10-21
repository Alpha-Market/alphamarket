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

    // if (loading) {
    //     return (
    //         <html lang="en" className={cn(interFont.className)}>
    //             <body className="w-screen h-screen overflow-hidden flex">
    //                 <div className="w-full h-full flex items-center justify-center">
    //                     <motion.span className="absolute animate-rotateL w-max h-max">
    //                         <svg
    //                             xmlns="http://www.w3.org/2000/svg"
    //                             viewBox="0 0 100 100"
    //                             width={100}
    //                             height={100}
    //                             style={{
    //                                 shapeRendering: "auto",
    //                                 display: "block",
    //                                 background: "transparent",
    //                             }}
    //                         >
    //                             <g data-idx={1}>
    //                                 <circle
    //                                     strokeDasharray="164.93361431346415 56.97787143782138"
    //                                     r={35}
    //                                     strokeWidth={6}
    //                                     stroke="black"
    //                                     fill="none"
    //                                     cy={50}
    //                                     cx={50}
    //                                     data-idx={2}
    //                                 ></circle>
    //                                 <g data-idx={4} />
    //                             </g>
    //                         </svg>
    //                     </motion.span>
    //                 </div>
    //             </body>
    //         </html>
    //     );
    // }

    return (
        <html lang="en" className={cn(interFont.className)}>
            <body className="w-screen h-screen overflow-hidden flex">
                <UserHydration userInfo={userInfo} />
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
