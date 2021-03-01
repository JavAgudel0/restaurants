import React, {useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'

import { closeSession, getCurrentUser } from '../../utils/actions'
import Loading from '../../Components/Loading'
import InfoUser from '../../Components/account/InfoUser'
import AccountOptions from '../../Components/account/AccountOptions'

export default function UserLogged() {
    const toastRef = useRef()
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)
    const [reloadUser, setReloadUser] = useState(false)

    useEffect(() => {
        setUser(getCurrentUser())
        setReloadUser(false)
    }, [reloadUser])

    return (
        <View style={styles.container}> 
            {
                user &&(
                <View>
                    <InfoUser 
                        user = {user} 
                        setLoading={setLoading} 
                        setLoadingText={setLoadingText}
                    />
                    <AccountOptions
                        user={user}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                </View>
                )
            }
            <Button
            buttonStyle={styles.btnCloseSession}
            titleStyle={styles.btnCloseSessionTitle}
                title="Cerrar Sesion"
                onPress={() =>{
                    closeSession()
                    navigation.navigate("restaurants")
                }}
            />
            <Toast ref={toastRef} position = "center" opacity = {0.9} />
            <Loading isVisible={ loading } text={loadingText}/>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backgroundColor: "#f9f9f9"
    }, 
    btnCloseSession:{
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#442484",
        borderBottomWidth: 1,
        borderBottomColor: "#442484",
        paddingVertical: 10
    },
    btnCloseSessionTitle: {
        color: "#442484"
    }
})
