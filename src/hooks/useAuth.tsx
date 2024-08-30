import { hydrateNewUser, hydrateOldUser } from "@/actions/User.action";
import { auth } from "@/libs/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

const useAuth = () => {
    const signUp = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(`Logged In\nUser -> ${JSON.stringify(user, null, 2)}`);
            await hydrateNewUser(user);
        } catch (err: any) {
            const errorCode = err.code;
            const errorMessage = err.message;

            toast.error(errorMessage);
            console.log("[useAuth/signUp]", errorCode, "->", errorMessage);
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await hydrateOldUser(user);
            console.log(`Logged In\nUser -> ${JSON.stringify(user, null, 2)}`);
        } catch (err: any) {
            const errorCode = err.code;
            const errorMessage = err.message;

            toast.error(errorMessage);
            console.log("[useAuth/signIn]", errorCode, "->", errorMessage);
        }
    };

    return {
        signUp,
        signIn
    };
};

export default useAuth;