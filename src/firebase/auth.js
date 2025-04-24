import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, sendEmailVerification, sendPasswordResetEmail, updatePassword, updateProfile } from "firebase/auth";


export const doCreateUserWithEmailAndPassword = async (email, password, fullName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update the user's profile with their full name
    await updateProfile(userCredential.user, {
        displayName: fullName
    });
    return userCredential;
}

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    return result;
}

export const doSignOut = () => {
    return signOut(auth);
}



// have to do 


export const doSendPasswordResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
}

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
}

export const doSendEmailVerification =  () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}`
    });
}



