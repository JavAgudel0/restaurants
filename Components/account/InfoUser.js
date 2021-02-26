import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'

import { loadImageFromGallery } from '../../utils/helpers'

export default function InfoUser({user}) {
    const changePhoto = async() => {
        console.log("Change Photo")
        const result = await loadImageFromGallery([1,1])
        console.log(result)
    }

    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size="large"
                onPress = {changePhoto}
                source={
                    user.photoUrl
                    ? {url: photoURL}
                    : require("../../assets/avatar-default.jpg")
                }
            />
            <View style={styles.infoUser}>
                <Text style={styles.displayName}>
                    {
                        user.displayName ? user.displayName : "Anonimo"
                    }
                </Text>
                <Text>
                    {user.email}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#F9F9F9",
        paddingVertical: 30
    },
    infoUser:  {
        marginLeft: 20
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 5
    }

})
