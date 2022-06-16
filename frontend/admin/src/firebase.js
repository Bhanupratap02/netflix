/** @format */

import firebase from "firebase"
const firebaseConfig = {
  apiKey: "AIzaSyAAuxdu_Lq-4oq9JYunm5NZhzFJmMqWz3Y",
  authDomain: "netflix-9292b.firebaseapp.com",
  projectId: "netflix-9292b",
  storageBucket: "netflix-9292b.appspot.com",
  messagingSenderId: "709376229814",
  appId: "1:709376229814:web:14d9bccce4df57aa1a0117",
  measurementId: "G-NVDZP4EG6K",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
