import { auth, provider, db } from "../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, Timestamp } from "firebase/firestore";

const Login = () => {
    const signInWithGoole = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setDoc(doc(db, "users", result.user.uid), {
                    uid: result.user.uid,
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    createdAt: Timestamp.fromDate(new Date()),
                    isOnline: true,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center ">
            <div className="p-5 text-black text-center relative inline-block bg-white  rounded-lg  overflow-hidden shadow-xl transform transition-all ">
                <p className="mb-3"> Sign In With Google To Your Account </p>
                <button className="underline" onClick={signInWithGoole}>
                    Sign In With Google
                </button>
            </div>
        </div>
    );
};

export default Login;
