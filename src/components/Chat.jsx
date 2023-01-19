import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/chat.css";

export const Chat = ({ room }) => {
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const messagesRef = collection(db, "messages");

	useEffect(() => {
		const queryMessages = query(messagesRef, where("room", "==", room));
		const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
			let messages = [];
			snapshot.forEach((doc) => {
				messages.push({ ...doc.data(), id: doc.id });
			});
			setMessages(messages);
		});
		return () => unsubscribe();
	});

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
			<div className="header">
				<h1>Room name: {room.toUpperCase()}</h1>
			</div>
			<div className="messages">
				{messages.map((message) => (
					<div key={message.id} className="message">
						<span className="user">{message.user}</span>
						{message.text}
					</div>
				))}
			</div>
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
