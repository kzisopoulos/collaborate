import {
  onDisconnect,
  onValue,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import { createContext } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { projectFirestore, statusDB } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export const OnlineStatusContext = createContext({});

export const OnlineStatusProvider = ({ children }: any) => {
  const { user } = useAuthContext();
  if (user) {
    const userStatusDBRef = ref(statusDB, "/status/" + user.uid);
    let isOfflineForDatabase = {
      online: false,
      last_changed: serverTimestamp(),
    };
    let isOnlineForDatabase = {
      online: true,
      last_changed: serverTimestamp(),
    };

    const isConnectedReference = ref(statusDB, ".info/connected");

    onValue(isConnectedReference, (snapshot) => {
      if (snapshot.val() === false) {
        updateDoc(doc(projectFirestore, "users", user.uid), {
          online: false,
          last_changed: serverTimestamp(),
        });
        return;
      }
      onDisconnect(userStatusDBRef)
        .set(isOfflineForDatabase)
        .then(() => {
          set(userStatusDBRef, isOnlineForDatabase);
          updateDoc(doc(projectFirestore, "users", user.uid), {
            online: true,
            last_changed: serverTimestamp(),
          });
        });
    });
  }

  return (
    <OnlineStatusContext.Provider value={{}}>
      {children}
    </OnlineStatusContext.Provider>
  );
};
