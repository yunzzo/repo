import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth} from "firebase/auth"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';

const firebaseConfig = {
  "apiKey": "AIzaSyC04WysdVvib1HYbBwllZRH5jbd_xLRlWM",
  "authDomain": "repport-39fbe.firebaseapp.com",
  "projectId": "repport-39fbe",
  "storageBucket": "repport-39fbe.appspot.com",
  "messagingSenderId": "252791368015",
  "appId": "1:252791368015:web:170fb111a12efc450c3d3a",
  "measurementId": "G-YLMNZ10BJY"
}


const app = initializeApp(firebaseConfig);

const Auth = getAuth(app);



export const login = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(Auth, email, password);
  return user;
};

export const signup = async ({email, password}) => {
  const {user} = await createUserWithEmailAndPassword(Auth, email, password);
  return user;
}
