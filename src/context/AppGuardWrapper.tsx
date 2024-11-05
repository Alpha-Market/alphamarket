import LoadingOverlay from "@/components/UI/common/LoadingOverlay";
import { auth } from "@/lib/firebase";
import { useUserStore } from "@/store/user.store";
import { signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

const PUBLIC_PATHS = ["/", "/auth"];
const PRIVATE_PATHS = ["/onboarding", "/home", "/host"];

export default function AppGuardWrapper({ children }: PropsWithChildren) {
    const pathname = usePathname();
    const router = useRouter();
    const signoutBtn = false;
    const loadingUser = useUserStore((state) => state.loadingUser);
    const user = useUserStore((state) => state.user);

    if (loadingUser) {
        return <LoadingOverlay size={35} className="bg-black" />;
    }
    
    if (!PUBLIC_PATHS.includes(pathname) && !PRIVATE_PATHS.includes(pathname)) {
        return (
            <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
                <h1 className="text-white text-4xl font-medium">404</h1>
                <p className="text-white text-base font-medium">
                    No page found
                </p>
            </div>
        );
    }

    if (user) {
        if (PUBLIC_PATHS.includes(pathname)) {
            router.push("/home?tab=home");
            return;
        }

        return children;
    } else {
        if (PRIVATE_PATHS.includes(pathname)) {
            router.push("/");
            return;
        }

        return children;
    }

    if (signoutBtn) {
        return (
            <button
                onClick={() => {
                    signOut(auth);
                }}
            >
                Signout
            </button>
        );
    }
}
