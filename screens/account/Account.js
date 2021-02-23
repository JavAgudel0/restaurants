import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase/app'
require('firebase/auth')

import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import { firebaseApp } from '../../utils/firebase'

firebase.firestore(firebaseApp)

export default function Account() {
    const [login, setLogin] = useState(null)
    
    firebase.auth().onAuthStateChanged((user) => {
        user !== null ? (setLogin(true)) : setLogin(false)
    })

    if(login == null){
        return <Text>Cargando...</Text>
    }

    return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})
