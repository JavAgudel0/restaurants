import React from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, Image } from 'react-native'
import { Button } from 'react-native-elements'
import Loading from '../../Components/Loading'
import { useNavigation} from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()

    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image
                source={require("../../assets/restaurant_logo.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text
                style={styles.title}
            >
                Consulta tu perfil en Resturants
            </Text>
            <Text
                style={styles.description}
            >
                ¿Como describirias tu mejor restaurante? Busca y visualiza los mejores restaurantes de forma sencilla, vota cual te ha gustado mas y comenta como ha sido tu experiencia.
            </Text>
            <Button
                buttonStyle={styles.button}
                title="Ver tu perfil"
                onPress={() => navigation.navigate("login")}
            />
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    viewBody:{
        marginHorizontal: 30
    },
    image:{
        height: 300,
        width: "100%",
        marginBottom: 10
    },
    title:{
        fontWeight: "bold",
        fontSize:19,
        marginVertical:10,
        textAlign:"center"
    },
    description:{
        textAlign:"justify",
        marginBottom:20,
        color: "#A65273"
    },
    button:{
        backgroundColor: "#442484"
    }
})
