import { firebaseApp } from './firebase'
import firebase from 'firebase'
require('firebase/firestore')
require('firebase/auth')

const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => {
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })    
    return isLogged
}

export const getCurrentUser = () =>{
    return firebase.auth().currentUser
}

export const registerUser = async (email, password) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        // result.statusResponse = 
        result.error = "Este correo ya ha sido registrado"
    }
    return result
}

export const closeSession = () =>{
    return firebase.auth().signOut()
}

export const loginWithEmailAndPassword = async (email, password) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o contraseña no validos"
    }
    return result
}