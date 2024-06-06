import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCg8H-5hzKeyjsKkk8WPcRytJ4wS4kDs9w",
  authDomain: "todo-app-69b0a.firebaseapp.com",
  projectId: "todo-app-69b0a",
  storageBucket: "todo-app-69b0a.appspot.com",
  messagingSenderId: "585699644902",
  appId: "1:585699644902:web:aeb62c653815b8f6a67227",
  measurementId: "G-VZG45LDLBV",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
