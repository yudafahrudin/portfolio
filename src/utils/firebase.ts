import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
} from "@constants/config";
import { initializeApp } from "@firebase/app";

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    projectId: FIREBASE_PROJECT_ID,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
};

export const firebase = initializeApp(firebaseConfig);
