import { useState, useReducer, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import { AuthError } from "firebase/auth";

interface State {
  document: DocumentData | null;
  isPending: boolean;
  error: AuthError | null;
  success: boolean;
}

interface Action {
  type:
    | "IS_PENDING"
    | "ADDED_DOCUMENT"
    | "UPDATED_DOCUMENT"
    | "DELETED_DOCUMENT"
    | "ERROR";
  payload?: DocumentData | boolean | string | null;
}

let initialState: State = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const useFirestore = (theCollection: string) => {
  const [response, dispatch] = useReducer(reducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection reference
  const ref = collection(projectFirestore, theCollection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action: Action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };
  // add a document to collection
  const addDocument = async (doc: DocumentData) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = serverTimestamp();
      const addedDocument = await addDoc(ref, { ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error: any) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  // delete a document from the collection
  const deleteDocument = async (id: string) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const theRef = doc(projectFirestore, theCollection, id);
      await deleteDoc(theRef);
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (error: any) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "Could not delete" });
    }
  };

  const updateDocument = async (id: string, updates: DocumentData) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const docRef = doc(projectFirestore, theCollection, id);

      const updatedDocument = await updateDoc(docRef, updates);
      dispatchIfNotCancelled({
        type: "UPDATED_DOCUMENT",
        payload: null,
      });
      return updatedDocument;
    } catch (error: any) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
      return null;
    }
  };

  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
