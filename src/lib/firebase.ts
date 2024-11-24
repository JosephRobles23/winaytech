import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBioduKTzpjEDqxQ7ysqRqZpyZmGZsBs5Q",
  authDomain: "ieee-cis-uni-6b2a2.firebaseapp.com",
  projectId: "ieee-cis-uni-6b2a2",
  storageBucket: "ieee-cis-uni-6b2a2.appspot.com",
  messagingSenderId: "70687061438",
  appId: "1:70687061438:web:f4238d358740a77db635ef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);