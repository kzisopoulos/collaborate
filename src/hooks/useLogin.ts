import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export const useLogin = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await setPersistence(projectAuth, browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(projectAuth, email, password);
        })
        .catch((error) => {
          throw Error(error.message);
        });
      // update the online status
      const docRef = doc(projectFirestore, "users", res.user.uid);
      await updateDoc(docRef, { online: true });
      // // dispatch the login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCanceled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error: any) {
      if (!isCanceled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCanceled((prev) => false);
  }, []);

  return { login, error, isPending };
};
