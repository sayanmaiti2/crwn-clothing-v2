import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  auth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  // useEffect(async () => {
  //   const response = await getRedirectResult(auth);
  //   if (response) {
  //     console.log(response);
  //     const userDocRef = await createUserDocumentFromAuth(response.user);
  //   }
  // }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    // console.log(user);
    await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <button onClick={logGoogleUser}>Sign In with Google</button>
      <SignUpForm/>
    </div>
  );
};

export default SignIn;
