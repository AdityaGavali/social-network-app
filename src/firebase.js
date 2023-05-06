import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore}  from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCj1dzpFet7IUhJ0h2UJdXTxDb2aDkuW04",
  authDomain: "social-media-d1790.firebaseapp.com",
  projectId: "social-media-d1790",
  storageBucket: "social-media-d1790.appspot.com",
  messagingSenderId: "171126594714",
  appId: "1:171126594714:web:42d67bcc52e5c2ff045323"
};
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app)
 const db   = getFirestore(app)
 export {auth , app, db}