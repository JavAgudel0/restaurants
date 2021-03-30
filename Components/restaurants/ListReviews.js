import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase/app'
import { Button } from 'react-native-elements'
import Restaurant from '../../screens/restaurants/Restaurant'

export default function ListReviews({ navigation, idRestaurant }) {
    const [userLogged, setUserLogged] = useState(false)

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    })

    return (
        <View>
            {
                userLogged ? (
                    <Button
                        onPress={() => navigation.navigate("add-review-restaurant", { idRestaurant })}
                        buttonStyle={styles.btnAddReview}
                        titleStyle={styles.btnTitleAddReview}
                        title="Escribe una opinion..."
                        icon={{
                            type: "material-community",
                            name: "square-edit-outline",
                            color: "#a376c7"
                        }}
                    />
                ) : (
                    <Text 
                        style={styles.maxLoginText}
                        onPress={() => navigation.navigate("login")}
                    >
                        Para escribir una opinion es necesario iniciar sesion. {" "}
                        <Text style={styles.loginText}>
                            Pulsa aqui para iniciar sesion
                        </Text>
                    </Text>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent",
        marginBottom: 15  
    },
    btnTitleAddReview: {
        color: "#a376c7"
    },
    maxLoginText: {
        textAlign:"center",
        color: "#a376c7",
        padding: 20
    },
    loginText: {
        fontWeight: "bold"
    }
})
