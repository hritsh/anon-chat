import { useState } from "react";

export const Chat = () => {
	const [newMessage, setNewMessage] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(newMessage);
	};
	return (
		<div className="chat-app">
			<form className="new-message-form" onSubmit={handleSubmit}>
				<input className="new-message-input" placeholder="Type a message..." onChange={(e) => setNewMessage(e.target.value)} />
				<button className="send-button" type="submit">
					Send
				</button>
			</form>
		</div>
	);
};
