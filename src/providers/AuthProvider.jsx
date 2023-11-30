import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { updateUserMembership } from "../Subscription/utils";


export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (newUserData) => {
        setUser(newUserData);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const onLogin = async (currentUser) => {
        const currentTime = Date.now();
        await axiosPublic.patch(`/updatesubscription/${currentUser.email}`, {
          lastLoginTime: currentTime,
          accumulatedLoginDuration: 0
        });
      };

    //function for handle subscription
    const checkAndUpdateSubscription = async (currentUser) => {
        const response = await axiosPublic.get(`/user/${currentUser.email}`);
        const userData = response.data;
      
        if (userData.membershipStatus === 'premium') {
          const currentTime = Date.now();
          const lastLoginTime = userData.lastLoginTime;
          const accumulatedLoginDuration = userData.accumulatedLoginDuration || 0;
          const newAccumulatedDuration = accumulatedLoginDuration + (currentTime - lastLoginTime);
      
          const durationInMilliseconds = userData.membershipTaken * 60 * 1000;
      
          if (newAccumulatedDuration > durationInMilliseconds) {
            // Update the user's subscription status to null if the time has elapsed
            await updateUserMembership(axiosPublic, currentUser.email, null, null);
          } else {
            // Update only the accumulated login duration
            await updateUserMembership(axiosPublic, currentUser.email, userData.membershipStatus, userData.membershipTaken);
          }
        }
      };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
         
            console.log('current user', currentUser);

            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setUser(currentUser);
                            setLoading(false);
                        }
                    })

                    onLogin(currentUser)

                    checkAndUpdateSubscription(currentUser);
            }
            else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
                setLoading(false);
            }
           // setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser, 
        updateUser,
        signIn, 
        googleSignIn,
        logOut,
        setUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;