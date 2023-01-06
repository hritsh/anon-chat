import "./App.css";
import { useState } from "react";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
	const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
	const [room, setRoom] = useState(null);
	return isAuth ? (
		<div>
			<Auth />
		</div>
	) : (
		<div>
			{room ? (
				<div>
					<h1>Room: {room}</h1>
				</div>
			) : (
				<div className="room">
					<label>Enter Room Name: </label>
					<input />
					<button>Join / Create</button>
				</div>
			)}
		</div>
	);
}

export default App;
