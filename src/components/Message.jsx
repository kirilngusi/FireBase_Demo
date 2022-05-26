import React from "react";
import { Timestamp } from "@firebase/firestore";

const Message = ({ msg }) => {
    // console.log(new Date(msg.createdAt.seconds * 1000).toLocaleDateString());

    return (
        <div
            className="flex items-center mt-2  overflow-wrap pr-10 break-words pl-3"
            style={{ width: "100%" }}
        >
            <img
                src={msg.photoURL}
                alt="err"
                className="rounded-full cursor-pointer"
                width={40}
                height={40}
            />
            <div className="ml-2 ">
                <div className="text-green-600">{msg.displayName}</div>
                <div
                    className="text-white break-words "
                    style={{ width: "300px" }}
                >
                    {msg.text}
                </div>
            </div>
        </div>
    );
};

export default Message;
