import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore}  from 'firebase/firestore'
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket:process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MSID,
  appId: process.env.APPID
};
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app)
 const db   = getFirestore(app)
 export {auth , app, db}