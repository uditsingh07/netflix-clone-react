import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCTE7urbnUdVxPPkoQpzurFvHQvLSghfbk",
  authDomain: "netflix-clone-react-74d6b.firebaseapp.com",
  projectId: "netflix-clone-react-74d6b",
  storageBucket: "netflix-clone-react-74d6b.appspot.com",
  messagingSenderId: "653582052236",
  appId: "1:653582052236:web:b2772cef49b3f4c78fc4a9",
  measurementId: "G-3QP6Z2MP2F"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()


export { auth }
export default db;