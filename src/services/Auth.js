import React, { createContext, useEffect, useState } from 'react';
import app from './firebase.js';

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser({
                    displayName: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    photoUrl: user.photoUrl,
                    uid: user.uid
                })
            }
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const AuthContext = createContext(null);
export { AuthContext }