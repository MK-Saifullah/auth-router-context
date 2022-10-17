import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

const UserContext = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    
// Create user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

//Sign in user
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

//Log out the user
        const logOut = () => {
            return signOut(auth);
        }

// Show Email login on Navbar
    useEffect( () => {
       const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('Auth state changed', currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, []);

//Sign in with Google account
    const SignInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }


    const authInfo = {user, createUser, signInUser, logOut, SignInWithGoogle, loading}
    return (
        <AuthContext.Provider value = {authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;