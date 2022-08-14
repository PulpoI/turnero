import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkfWOG500MwalRRh5GUthZ2kgKAg5e_l8",
  authDomain: "turnero-4301d.firebaseapp.com",
  projectId: "turnero-4301d",
  storageBucket: "turnero-4301d.appspot.com",
  messagingSenderId: "506162778598",
  appId: "1:506162778598:web:67ca9a0e51a87cc4174627",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
