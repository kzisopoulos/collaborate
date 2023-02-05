import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (theCollection: string) => {
  const [documents, setDocuments] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ref = collection(projectFirestore, theCollection);

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results: any = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data");
      }
    );

    // unsubscribe on unamount
    return () => unsub();
  }, [theCollection]);

  return { documents, error };
};
