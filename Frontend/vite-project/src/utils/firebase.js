// Import the functions you need from the SDKs you need
import { getAuth , GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY ,
  authDomain: "loginecommerce-ecb70.firebaseapp.com",
  projectId: "loginecommerce-ecb70",
  storageBucket: "loginecommerce-ecb70.firebasestorage.app",
  messagingSenderId: "1093233906731",
  appId: "1:1093233906731:web:02c112d196bd30e35a066e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth , provider }