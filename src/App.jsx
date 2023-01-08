import "./App.css";
import { useState, useRef } from "react";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
const cookies = new Cookies();

function App() {
	const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
	const [room, setRoom] = useState(null);
	const roomInputRef = useRef(null);
	return isAuth ? (
		<div>
			<Auth setIsAuth={setIsAuth} />
		</div>
	) : (
		<div>
			{room ? (
				<Chat />
			) : (
				<div className="room">
					<label>Enter Room Name: </label>
					<input ref={roomInputRef} />
					<button onClick={() => setRoom(roomInputRef.current.value)}>Join / Create</button>
				</div>
			)}
		</div>
	);
}

export default App;
