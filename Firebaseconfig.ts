// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC5cl1uDtvV_npoeanDaCG_qB4eW5PUTcw',
  authDomain: 'runwith-1622d.firebaseapp.com',
  projectId: 'runwith-1622d',
  storageBucket: 'runwith-1622d.firebasestorage.app',
  messagingSenderId: '221570016133',
  appId: '1:221570016133:web:04500d6debaa148c5cdaec',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
