import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
	const signIn = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			cookies.set("auth-token", result.user.refreshToken);
			setIsAuth(true);
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
