import { useEffect, useState } from "react"
import { getSocket } from "../../utils/sockets/socket";



const Messages = () => {

    const socket: any = getSocket()

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("messages", (msgs: any) => {
            console.log("Received from server:", msgs);
            setMessages(msgs);
        });

        // cleanup jab component unmount ho
        return () => {
            socket.off("messages");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== "") {
            socket.emit("message", message); // server ko event bhejna
            setMessage("");
        }
    };

    

    return (
        <div>
            <div style={{ padding: "20px" }}>
                <h1>React Chat</h1>

                <div>
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>

                <ul>
                    {messages.map((msg, i) => (
                        <li key={i}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Messages