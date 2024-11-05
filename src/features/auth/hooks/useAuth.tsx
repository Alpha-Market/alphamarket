import {
    hydrateNewUser,
    hydrateOldUser,
    hydrateTwitterUser,
} from "@/features/auth/lib/hydration";
import { auth } from "@/lib/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    TwitterAuthProvider,
} from "firebase/auth";
import toast from "react-hot-toast";

const useAuth = () => {
    const signUp = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            await hydrateNewUser(user);
        } catch (err: any) {
            const errorCode = err.code;
            const errorMessage = err.message;

            toast.error(errorMessage);
            console.log("[useAuth/signUp]", errorCode, "->", errorMessage);

            throw new Error("Error in signup no redirecting to onboard");
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            await hydrateOldUser(user);
        } catch (err: any) {
            const errorCode = err.code;
            const errorMessage = err.message;

            toast.error(errorMessage);
            console.log("[useAuth/signIn]", errorCode, "->", errorMessage);

            throw new Error("Error in signin no redirecting to home");
        }
    };

    const signInWithTwitter = async () => {
        try {
            const provider = new TwitterAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            await hydrateTwitterUser(user);
        } catch (err: any) {
            const errorCode = err.code;
            const errorMessage = err.message;

            toast.error(errorMessage);
            console.log(
                "[useAuth/signInWithTwitter]",
                errorCode,
                "->",
                errorMessage
            );
        }
    };

    return {
        signUp,
        signIn,
        signInWithTwitter,
    };
};

export default useAuth;
