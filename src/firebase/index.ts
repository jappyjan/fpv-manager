import {collection, getFirestore} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const FIRESTORE_PROJECT_ID = "fvp-manager"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9AgAn1H-ufCMMGEVl1ipIDP-ml-HeB1g",
    authDomain: "fvp-manager.firebaseapp.com",
    projectId: FIRESTORE_PROJECT_ID,
    storageBucket: "fvp-manager.appspot.com",
    messagingSenderId: "65900746415",
    appId: "1:65900746415:web:437c649ced6cf24312665a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const firestoreDatabase = getFirestore(app);
export const firestoreCollection = collection(firestoreDatabase, 'my-collection-name');
