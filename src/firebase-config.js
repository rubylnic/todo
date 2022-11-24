import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyChT6lEECwMAP1zcDj1jUkAKpXwhF00gAc",
    authDomain: "todo-10778.firebaseapp.com",
    projectId: "todo-10778",
    storageBucket: "todo-10778.appspot.com",
    messagingSenderId: "7623694103",
    appId: "1:7623694103:web:8f4acf3a74321e92b88952"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage();

export const db = getFirestore(app);
