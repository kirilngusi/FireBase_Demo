import React, { createContext, useState, useEffect } from "react";
import Loading from "../components/Loading";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    // listen for auth status changes;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
    }, []);
    if (loading) {
        return <Loading />;
    }

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
