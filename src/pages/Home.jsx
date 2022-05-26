import React, { useState, useEffect, useRef, useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
    collection,
    addDoc,
    getDocs,
    Timestamp,
    onSnapshot,
    query,
    orderBy,
    where,
} from "firebase/firestore";

import { db, auth } from "../firebaseConfig";
import Message from "../components/Message";
import SendMessage from "../components/SendMessage";
import Navbar from "../components/Navbar";
import Login from "./Login";

import { AuthContext } from "../context/authContext";

const Home = () => {
    const { user } = useContext(AuthContext);

    const [msgs, setMsgs] = useState([]);
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);

    const logoutUser = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                console.log(error);
                // An error happened.
            });
    };

    const addMessage = async (e) => {
        try {
            e.preventDefault();
            await addDoc(collection(db, "chat"), {
                createdAt: Timestamp.fromDate(new Date()),
                uid: user.uid,
                displayName: user.displayName,
                text,
                photoURL: user.photoURL,
            });
            setText("");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    useEffect(() => {
        const msgsRef = collection(db, "chat");
        const q = query(msgsRef, orderBy("createdAt", "asc"));

        //real time collection data
        onSnapshot(q, (querySnapshot) => {
            let msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push({ ...doc.data() });
            });
            setMsgs(msgs);
        });
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [msgs]);

    return (
        <div className="bg-darkslategray h-max overflow-hidden w-full ">
            {!user && <Login />}
            <div className="flex sm:flex-col">
                <div className="h-screen  bg-darkslategraynav sm:hidden">
                    <Navbar />
                </div>
                <div className=" w-[calc(100%_-_10rem)] sm:w-full">
                    <div className="flex flex-col h-screen">
                        <div className=" h-screen overflow-y-scroll overflow-x-hidden mb-3">
                            <div className=" p-3 sticky top-0 bg-darkslategraynav border-b border-gray-500 mb-3  pb-3  flex flex-row-reverse justify-between  justify-items-center">
                                <button
                                    onClick={logoutUser}
                                    className="text-white w-20 rounded h-10	"
                                    style={{
                                        backgroundColor: "#005a9b",
                                    }}
                                >
                                    Logout
                                </button>

                                <div className="text-lg text-white items-center	flex">
                                    Welcome to community chat
                                </div>
                            </div>
                            {msgs.length &&
                                msgs.map((msg, index) => (
                                    <Message msg={msg} key={index} />
                                ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="border-t border-gray-500">
                            <SendMessage
                                addMessage={addMessage}
                                setText={setText}
                                text={text}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
