import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function useAuth() {
	const router = useRouter();

	const signUp = async (email: string, password: string) => {
		try {
			const res = await axios.post("/api/auth/signup", {
				email,
				password,
			});

			return res.data;
		}
		catch (err: any) {
			const errorCode = err.code;
			const errorMessage = err.message;

			toast.error(errorMessage);
			console.log("[useAuth/signUp]", errorCode, "->", errorMessage);
			throw new Error("Error in signup no redirecting");
		}
	};

	const signIn = async (email: string, password: string) => {
		try {
			await axios.post("/api/auth/signin", {
				email,
				password,
			});
		}
		catch (err: any) {
			const msg = err.response.data.error;
			toast.error(msg);
			console.log("[useAuth/signIn]", err);
			throw new Error("Error in sign in no redirecting");
		}
	};

	const signInWithTwitter = async () => {
		try {
			const res = await axios.get("/api/auth/twitter");
			const oauthURL = res.data.oauth_url;

			window.open(oauthURL, "_blank");
		}
		catch (err: any) {
			console.log(err);
			toast.error(err);
		}
	};

	const signOut = async () => {
		try {
			await axios.post("/api/auth/signout");
			router.push("/");
		}
		catch (err) {
			console.log("[useAuth/signOut]", err);
			toast.error("Error in signout no redirecting");
		}
	};

	return {
		signUp,
		signIn,
		signInWithTwitter,
		signOut,
	};
}

export default useAuth;
