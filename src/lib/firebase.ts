import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA84olf8T94kDrsaxt3oV5tD5789x0wZng",
  authDomain: "notionproject-c6ccc.firebaseapp.com",
  projectId: "notionproject-c6ccc",
  storageBucket: "notionproject-c6ccc.appspot.com",
  messagingSenderId: "601291714346",
  appId: "1:601291714346:web:b3fcec3e563a7430c87853",
  measurementId: "G-51XZXX3GGX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const analytics = getAnalytics(app);
export const database = getFirestore(app);