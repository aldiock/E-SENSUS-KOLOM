import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC443cRkAilGevysFeG4UhKeN-6MjJzQpA",
  authDomain: "e-sensus-kolom2.firebaseapp.com",
  projectId: "e-sensus-kolom2",
  storageBucket: "e-sensus-kolom2.appspot.com",
  messagingSenderId: "27457865886",
  appId: "1:27457865886:web:721fc6679230b1af6e938f",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
