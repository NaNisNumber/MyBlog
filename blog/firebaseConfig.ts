import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCxllJsCPY47ZKp_wethmoGjRCixZwotNI",
  authDomain: "myblogauth-a0cd4.firebaseapp.com",
  projectId: "myblogauth-a0cd4",
  storageBucket: "myblogauth-a0cd4.appspot.com",
  messagingSenderId: "729244698356",
  appId: "1:729244698356:web:10e6f79e45effbdae240a1",
  measurementId: "G-QXFJGW5P4W",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, app };
