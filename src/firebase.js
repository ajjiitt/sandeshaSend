import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyD1MVC7Cq1Qwu8gF6bpiQ27AbWwkk9miW0",
    authDomain: "whats-app-clone-7e417.firebaseapp.com",
    projectId: "whats-app-clone-7e417",
    storageBucket: "whats-app-clone-7e417.appspot.com",
    messagingSenderId: "1076165575484",
    appId: "1:1076165575484:web:054014c0e1adbcfa6a5439",
    measurementId: "G-S8HF5WNGP2"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth,provider};
  export default db;