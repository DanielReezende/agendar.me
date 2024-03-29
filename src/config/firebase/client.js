import 'firebase/auth';
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};
const firebaseClient = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);

export const persistenceMode = firebase.auth.Auth.Persistence.LOCAL

export const getToken = () => firebaseClient.auth().currentUser?.getIdToken()

export { firebaseClient };
