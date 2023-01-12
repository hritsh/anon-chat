import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase-config";

export const Chat = ({ room }) => {
	const [newMessage, setNewMessage] = useState("");
	const messagesRef = collection(db, "messages");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (newMessage.trim() === "") return;

		await addDoc(messagesRef, {
			text: newMessage,
			createdAt: serverTimestamp(),
			user: auth.currentUser.displayName,
			room,
		});

		setNewMessage("");
	};
	return (
		<div className="chat-app">
			<form className="new-message-form" onSubmit={handleSubmit}>
				<input
					className="new-message-input"
					placeholder="Type a message..."
					onChange={(e) => setNewMessage(e.target.value)}
					value={newMessage}
				/>
				<button className="send-button" type="submit">
					Send
				</button>
			</form>
		</div>
	);
};
