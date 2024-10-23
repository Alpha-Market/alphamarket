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
import axios from "axios";

const useAuth = () => {
    const signUp = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            const res = await axios.post("/api/auth/create-jwt", {
                uid: user.uid,
                email: user.email,
            });

            const data = res.data;

            if ((data["status"] = "success")) {
                const token = data["token"];

                await axios.post("/api/auth/set-jwt", {
                    token,
                });
            } else {
                throw new Error("Error in creating jwt");
            }

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

            const res = await axios.post("/api/auth/create-jwt", {
                uid: user.uid,
                email: user.email,
            });

            const data = res.data;

            if ((data["status"] = "success")) {
                const token = data["token"];

                await axios.post("/api/auth/set-jwt", {
                    token,
                });
            } else {
                throw new Error("Error in creating jwt");
            }

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

            // This gives you a Twitter Access Token and Secret.
            const credential = TwitterAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const secret = credential?.secret;

            // The signed-in user info.
            const user = result.user;

            const res = await axios.post("/api/auth/create-jwt", {
                uid: user.uid,
                email: user.email,
            });

            const data = res.data;

            if ((data["status"] = "success")) {
                const token = data["token"];

                await axios.post("/api/auth/set-jwt", {
                    token,
                });
            } else {
                throw new Error("Error in creating jwt");
            }

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
