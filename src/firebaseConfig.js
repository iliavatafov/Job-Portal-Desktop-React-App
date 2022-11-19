import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB16K3ygROeYMeJ6PsbKRzhk8xtMUlXmMw",
  authDomain: "perfectjobs-lite.firebaseapp.com",
  projectId: "perfectjobs-lite",
  storageBucket: "perfectjobs-lite.appspot.com",
  messagingSenderId: "690877692657",
  appId: "1:690877692657:web:9fbee8daadf976ce790750",
  measurementId: "G-R0BX9ZDM9K",
};

export const app = initializeApp(firebaseConfig);
export const fireDB = getFirestore(app);
