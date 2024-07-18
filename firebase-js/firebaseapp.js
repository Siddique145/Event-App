import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoDcpP2Zcq2aSVnBxQGGGGsWkV-lG6ufE",
  authDomain: "event-planner-b49ca.firebaseapp.com",
  projectId: "event-planner-b49ca",
  storageBucket: "event-planner-b49ca.appspot.com",
  messagingSenderId: "638803909122",
  appId: "1:638803909122:web:fc74ecaac43f73c72f651b",
  measurementId: "G-ZHTGMPCZKJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export {
  auth,
  db,
  storage,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  getDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  collection,
  addDoc,
  signInWithEmailAndPassword,
  signOut,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  deleteDoc,
};
