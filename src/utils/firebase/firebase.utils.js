// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn09c-mgCRIst8GB4KqEk3k6TyB6HzmUo",
  authDomain: "crwn-clothing-9b161.firebaseapp.com",
  projectId: "crwn-clothing-9b161",
  storageBucket: "crwn-clothing-9b161.appspot.com",
  messagingSenderId: "302134494687",
  appId: "1:302134494687:web:8f8d6ddc83492d1e53f06a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if(!userAuth) return;
  
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // If user does not exists, then set user doc
  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt =new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        photoURL,
        ...additionalInformation
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }

  return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
