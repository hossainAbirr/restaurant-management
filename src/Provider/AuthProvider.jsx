import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true);
const auth = getAuth(app)

const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
}

const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
}

const logOut = () => {
    setLoading(true);
    return signOut(auth)
}

const profileUpdate = (name, photo) => {
    setLoading(true)
    return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo
    })
}

useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false)
    })
    return () => {
        unSubscribe();
    }
},[auth])


    const authInfo = {
        user,
        loading,
        createUser,
        logIn,
        logOut,
        profileUpdate
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;