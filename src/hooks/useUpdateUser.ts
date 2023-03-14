import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import {
  createUserWithEmailAndPassword,
  updateEmail,
  updateProfile,
  User,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const useUpdateUser = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  // function to sign the user up
  const updateUser = async (
    user: User,
    firstName: string,
    lastName: string,
    email: string
    // thumbnail: File
  ) => {
    setError(null);
    setIsPending(true);

    try {
      // upload user thumbnail
      // const uploadPath = `thumbnails/${user.uid}/${thumbnail.name}`;
      // const storage = getStorage();
      // const imgRef = ref(storage, uploadPath);
      // await uploadBytes(imgRef, thumbnail);

      // const imgURL = await getDownloadURL(imgRef);
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        // photoURL: imgURL,
      });

      await updateEmail(user, email);

      await setDoc(doc(projectFirestore, "users", user.uid), {
        displayName: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
        online: true,
        // photoURL: imgURL,
      });
      // dispatch login action:
      dispatch({ type: "UPDATE", payload: user });
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
  return { error, isPending, updateUser };
};

export default useUpdateUser;
