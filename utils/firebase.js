import firebase from 'firebase/app'
require('firebase/firestore')


const firebaseConfig = {
    apiKey: "AIzaSyAXY_BsGLxNXy2INhC6lXZreueTpwU-Y9I",
    authDomain: "restaurants-6be8b.firebaseapp.com",
    projectId: "restaurants-6be8b",
    storageBucket: "restaurants-6be8b.appspot.com",
    messagingSenderId: "547992657580",
    appId: "1:547992657580:web:1bfc9b53cca4fd93378909"
}
  
  export const firebaseApp = firebase.initializeApp(firebaseConfig)