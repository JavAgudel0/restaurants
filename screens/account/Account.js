import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Loading from '../../Components/Loading'
import { getCurrentUser } from '../../utils/actions'


import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

export default function Account() {
    const [login, setLogin] = useState(null)
    
    useEffect(() => {
       const user = getCurrentUser()
       user !== null ? setLogin(true) : setLogin(false)
    }, [])

    if(login == null){
        return <Loading isVisible={true} text="Cargando..."/>
    }

    return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})
