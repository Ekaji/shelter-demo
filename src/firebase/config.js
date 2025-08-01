// import { initializeApp } from 'firebase/app'
// // import { getAnalytics } from "firebase/analytics";
// import { getAuth } from 'firebase/auth'
// import { getFirestore } from 'firebase/firestore'
// import { getStorage } from 'firebase/storage'

// const firebaseConfig = {
//   apiKey: "AIzaSyBgUaKTsyKt67XyP-L8aBRnom6PU7Yypbg",
//   authDomain: "shelter-demo-1f01d.firebaseapp.com",
//   projectId: "shelter-demo-1f01d",
//   storageBucket: "shelter-demo-1f01d.firebasestorage.app",
//   messagingSenderId: "434501504569",
//   appId: "1:434501504569:web:1fe78eb69d087226f647e8",
//   measurementId: "G-PXQN2E97QR"
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// // const analytics = getAnalytics(app);

// // Initialize services
// const auth = getAuth(app)
// const db = getFirestore(app)
// const storage = getStorage(app)

// export { auth, db, storage, app }


// firebase/config.js
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBgUaKTsyKt67XyP-L8aBRnom6PU7Yypbg",
  authDomain: "shelter-demo-1f01d.firebaseapp.com",
  projectId: "shelter-demo-1f01d",
  storageBucket: "shelter-demo-1f01d.firebasestorage.app",
  messagingSenderId: "434501504569",
  appId: "1:434501504569:web:1fe78eb69d087226f647e8",
  measurementId: "G-PXQN2E97QR"
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { firebase, db, auth, storage, app }