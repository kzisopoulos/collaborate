import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export const useCollection = (
  theCollection: string,
  _query: any = "",
  _orderBy: any = ""
) => {
  const [documents, setDocuments] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  // const query = useRef(_query).current;
  // const orderBy = useRef(_orderBy).current;
  useEffect(() => {
    let ref = collection(projectFirestore, theCollection);
    // if (query) {
    //   ref = ref.where(...query);
    // }
    // if (orderBy) {
    //   ref = ref.orderBy(...orderBy);
    // }
    // if (theCollection === "projects") {
    //   ref = query(ref, orderBy("createdAt", "desc"));
    // }
    // if (theCollection === "users") {
    //   ref = query(ref, orderBy("online", "desc"));
    // }

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
  }, [theCollection, query, orderBy]);

  return { documents, error };
};
