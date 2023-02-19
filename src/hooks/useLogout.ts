import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
export const useLogout = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // sign the user out
      if (user) {
        const { uid } = user;
        const docRef = doc(projectFirestore, "users", uid);
        // update the user to be offline
        await updateDoc(docRef, { online: false });
        await signOut(projectAuth);
        // dispatch the logout action
        dispatch({ type: "LOGOUT" });
      }

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

  return { logout, error, isPending };
};
