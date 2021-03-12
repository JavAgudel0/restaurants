import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty, size } from 'lodash'

import { reauthenticate, updatePassword } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangePasswordForm({ setShowModal, toastRef }) {
    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)    
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)


    const onSubmit = async () => {
        if (!validateForm()) {
            return
        }
        
        setLoading(true)
        const resultReauthenticate = await reauthenticate(currentPassword)
        if (!resultReauthenticate.statusResponse) {
            setLoading(false)
            setErrorCurrentPassword("Contraseña incorrecta.")  
            return
        }

        const resultUpdatePassword = await updatePassword(newPassword)
        setLoading(false)

        if (!resultUpdatePassword.statusResponse) {
            setErrorNewPassword("Hubo un problema cambiando la contraseña. Intente mas tarde.")  
            return
        }

        toastRef.current.show("Se ha actualizado la contraseña", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        let isValid = true
        
        if (isEmpty(currentPassword)) {
            setErrorCurrentPassword("Debes ingresar tu contraseña actual.")
            isValid = false
        }
        if (size(newPassword)<6) {
            setErrorNewPassword("Debes ingresar una nueva contraseña de al menos 6 caracteres.")
            isValid = false
        }
        if (size(confirmPassword)<6) {
            setErrorConfirmPassword("Debes ingresar una confirmacion de contraseña de al menos 6 caracteres.")
            isValid = false
        }
        if (newPassword !== confirmPassword) {
            setErrorNewPassword("Las nuevas contraseñas no son iguales")
            setErrorConfirmPassword("Las nuevas contraseñas no son iguales")
            isValid = false
        }
        if (currentPassword === newPassword) {
            setErrorNewPassword("Debes ingresar una contraseña diferente al actual")
            setErrorCurrentPassword("Debes ingresar una contraseña diferente al actual")
            setErrorConfirmPassword("Debes ingresar una contraseña diferente al actual")
            isValid = false
        }

        return isValid 
    }

    return (
        <View style={styles.view}>
                        
            <Input
                placeholder="Ingresa tu contraseña actual..."
                containerStyle={styles.input}
                defaultValue={currentPassword}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name= {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{color: "#C2C2C2"}}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Ingresa tu nueva contraseña..."
                containerStyle={styles.input}
                defaultValue={newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name= {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{color: "#C2C2C2"}}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Ingresa tu confirmacion de nueva contraseña..."
                containerStyle={styles.input}
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name= {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{color: "#C2C2C2"}}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}            
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10        
    },
    btnContainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#442484"
    }
})
