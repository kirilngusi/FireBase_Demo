import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const SendMessage = ({ addMessage, setText, text }) => {
    const { user } = useContext(AuthContext);

    const handleKeypress = (e) => {
        if (e.key === "Enter") {
            addMessage();
        }
    };

    return (
        <div
            className=" mt-5"
            style={{
                height: "80px",
            }}
        >
            <div className="">
                <form className="flex content-center justify-between pl-5 pr-5">
                    <input
                        className="w-full h-12 rounded p-5"
                        disabled={!user}
                        type="text"
                        placeholder="Enter message"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={handleKeypress}
                    />

                    <button
                        className=" text-white sm:mr-15 text-center w-20 rounded ml-5"
                        onClick={addMessage}
                        disabled={!text}
                        style={{
                            backgroundColor: "#005a9b",
                        }}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendMessage;
