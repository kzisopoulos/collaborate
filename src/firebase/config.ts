import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "collab-f3cc5.firebaseapp.com",
  projectId: "collab-f3cc5",
  storageBucket: "collab-f3cc5.appspot.com",
  messagingSenderId: "534517306982",
  appId: "1:534517306982:web:8be85390537c4fc3f07fa7",
  databaseURL: process.env.REACT_APP_REALTIME_DATABASE_URL,
};

// step 1: initialize firebase
const app = initializeApp(firebaseConfig);

// step 2: initialize individual services
const projectFirestore = getFirestore(app);
const projectAuth = getAuth();
const projectStorage = getStorage();
const statusDB = getDatabase(app);

// step 3: create a firebase timestamp object

export { projectFirestore, projectAuth, projectStorage, statusDB };
