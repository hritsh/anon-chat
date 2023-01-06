import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = () => {
	const signIn = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			cookies.set("auth-token", result.user.refreshToken);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="auth">
			<p>Sign In with Google to Continue</p>
			<button onClick={signIn}>Sign In</button>
		</div>
	);
};
