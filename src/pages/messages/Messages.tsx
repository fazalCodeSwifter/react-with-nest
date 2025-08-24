import { getSocket } from "../../utils/sockets/socket";
import { localUserStorage } from "../../storage/storage";

import { useEffect, useRef, useState } from "react";
import AllUsers from "./AllUsers"
import ShowFriends from "./ShowFriends"
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { addMessage, setMessages } from "../../store/messageSlice";


const Messages = () => {

    const socket: any = getSocket()

    const [message, setMessage] = useState("");
    // const [messages, setMessages] = useState<IMessage[] | null>(null);
    const messages = useSelector((state: RootState) => state.messageStore.messages)
    const dispatch = useDispatch<AppDispatch>()
    const [currentChatId, setCurrentChatId] = useState(localStorage.getItem("currentUser:key"));

    const userdata = localUserStorage.getUserDataInStorage()
    const endRef = useRef<HTMLDivElement | null>(null);



    useEffect(() => {
        socket.on("received_message", (msgs: any) => {
            console.log("Received from server in useEffect:", msgs);
            dispatch(addMessage(msgs))
        });

        return () => {
            socket.off("received_message");
        };
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const sendMessage = () => {
        const user = localUserStorage.getUserDataInStorage()

        if (message.trim() !== "") {
            socket.emit("sent_message", { senderId: user.userId, reciverId: Number(currentChatId), message: message }, (msg: any) => {
                dispatch(addMessage(msg))
                console.log("after send message recived---", msg);

            });
            setMessage("");
        }
    };
    useEffect(() => {
        const handleUserMessages = (messages: any) => {
            dispatch(setMessages(messages));
        };

        socket.on("user_messages", handleUserMessages);

        return () => {
            socket.off("user_messages", handleUserMessages);
        };
    }, [socket, dispatch]);


    const getCurrentId = (id: any) => {
        setCurrentChatId(id);
        socket.emit("get_user_messages", { userId: id });
    };




    return (

        <div>
            <div className="w-full h-[92vh] @container flex bg-base-100/5">
                <div className="flex-1 hidden @5xl:block h-full">
                    <h1 className="my-5 text-2xl font-bold mx-5">Show All Friends</h1>

                    <ShowFriends getCurrentId={getCurrentId} />

                </div>
                {/* ------------------------------------------------------------------------------------------------- */}
                {
                    !!messages ?
                        (
                            <div className="flex-4 h-full px-8">
                                <div className="relative h-full">
                                    <div className="w-full h-24 flex items-center pl-8">
                                        <h1 className="text-3xl text-base-100 font-bold">Fazal Shah</h1>
                                    </div>

                                    <div className="h-[70vh] flex flex-col overflow-scroll">
                                        {
                                            !!messages ?
                                                (
                                                    messages.map((item: any, i) => (
                                                        <div key={i} className={`chat ${item.senderId === userdata.userId ? "chat-end" : "chat-start"}`}>
                                                            <div className="chat-bubble">{item.message}</div>
                                                        </div>

                                                    ))
                                                )
                                                :
                                                (
                                                    <div className="h-full z-50 w-full bg-amber-600">
                                                        <h1 className="text-4xl  font-bold">Chat Now</h1>
                                                    </div>
                                                )
                                        }
                                        <div ref={endRef}></div>
                                    </div>

                                    <div className="absolute bottom-0 flex justify-center items-center p-5 w-full">
                                        <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Enter your text here..." className="input w-full mx-2" />
                                        <button onClick={sendMessage} className="btn">send</button>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="flex-4 h-full px-8 flex justify-center items-center">
                                <h1 className="text-5xl font-bold tracking-widest"> Chat App </h1>
                            </div>
                        )
                }
                {/* ------------------------------------------------------------------------------------------------- */}

                <div className="flex-2 h-full px-5 overflow-scroll">
                    <h1 className=" text-2xl font-bold my-5">All Users.</h1>
                    <AllUsers />
                </div>
            </div>
        </div>
    )
}

export default Messages



// INSERT INTO nestjs_practice.UserFollowings(followerId, followingId)
// VALUES (5, 1);
// SELECT * FROM nestjs_practice.UserFollowings;