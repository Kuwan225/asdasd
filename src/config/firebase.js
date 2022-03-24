import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB7SSI6orXt6DdrYGxMYlplQ_I4j3G4iLA",
  authDomain: "todolist-firebase-6b656.firebaseapp.com",
  projectId: "todolist-firebase-6b656",
  storageBucket: "todolist-firebase-6b656.appspot.com",
  messagingSenderId: "204306655748",
  appId: "1:204306655748:web:586b62ff2a5d2129e06351",
  measurementId: "G-Q797CKD1WH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export default { app, analytics, database };
