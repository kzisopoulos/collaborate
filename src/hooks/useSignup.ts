import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import {
  validateEmail,
  validateInput,
  validateMatchingPassword,
} from "../utils/validators";
const useSignup = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  // function to sign the user up
  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordCheck: string
  ) => {
    setError(null);
    setIsPending(true);
    try {
      validateInput(firstName);
      validateInput(lastName);
      validateEmail(email);
      validateMatchingPassword(password, passwordCheck);
      // try to sign up the user
      const res = await createUserWithEmailAndPassword(
        projectAuth,
        email,
        password
      );
      if (!res) {
        throw new Error("Could not complete signup");
      }
      // upload user thumbnail
      // const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      // const storage = getStorage();
      // const imgRef = ref(storage, uploadPath);
      // await uploadBytes(imgRef, thumbnail);
      // const imgURL = await getDownloadURL(imgRef);
      await updateProfile(res.user, {
        displayName: `${firstName} ${lastName}`,
      });
      await setDoc(doc(projectFirestore, "users", res.user.uid), {
        online: true,
        displayName: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
      });
      // dispatch login action:
      dispatch({ type: "LOGIN", payload: res.user });
      if (!isCanceled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error: any) {
      if (!isCanceled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => {
      return setIsCanceled((prev) => false);
    };
  }, []);
  return { error, isPending, signup };
};

export default useSignup;
