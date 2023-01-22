import { useEffect, useState } from "react";

import { projectFirestore } from "../firebase/config";

import { onSnapshot, doc, DocumentData } from "firebase/firestore";

export const useDocument = (theCollection: string, id: string) => {
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // realtime data for document:

  useEffect(() => {
    const docRef = doc(projectFirestore, theCollection, id);

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("No such document exists.");
        }
      },
      (error) => {
        console.log(error.message);
        setError("Failed to get document");
      }
    );
    return () => {
      unsub();
    };
  }, [theCollection, id]);

  return { document, error };
};
