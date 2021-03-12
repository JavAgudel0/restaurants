import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import firebase from 'firebase/app'

import Loading  from '../../Components/Loading'

export default function Restaurants({ navigation }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            userInfo ? setUser(true) : setUser(false)
        })
    }, [])

    if (user === null) {
        return <Loading isVisible={true} text="Cargando..."/>
    }


    return (
        <View style={styles.viewBody}>
            <Text>Restaurants...</Text>
            {
                user && 
                (<Icon
                    type="material-community"
                    name ="plus"
                    color="#442484"
                    reverse
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("add-restaurant")}
                />)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,

    },
    btnContainer: {
        position: "absolute",
        bottom: 5,
        right: 5,
        shadowColor: "black",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: .5
    }
})
