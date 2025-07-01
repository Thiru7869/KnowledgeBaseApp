// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVhk8XFdOTbrttcjE9CvSH0lTDZO23pNQ",
  authDomain: "wiki-69cfd.firebaseapp.com",
  projectId: "wiki-69cfd",
  storageBucket: "wiki-69cfd.appspot.com",
  messagingSenderId: "115515027327",
  appId: "1:115515027327:web:3855c5a67090bf5a47f44a"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Firebase Services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

// Exporting all services
export { auth, provider, githubProvider, db, storage };
