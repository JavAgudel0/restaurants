import { size } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { validateEmail } from '../../utils/helpers'

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFromValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")


    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text})        
    }

    const registerUser = () => {
        if(!validateData()) {
            return
        }

        console.log("Si funcionan las validaciones")
    }

    const validateData = () => {
        setErrorConfirm("")
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true

        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes ingresar un email valido.")
            isValid = false
        }

        if (size(formData.password) < 6) {
            setErrorPassword("Debes ingresar una contraseña de al menos 6 caracteres.")
            isValid = false
        }
        if (size(formData.confirm) < 6) {
            setErrorConfirm("Debes ingresar una confirmacion de contraseña de al menos 6 caracteres.")
            isValid = false
        }
        if (formData.password !== formData.confirm) {
            setErrorPassword("Las contraseñas no son iguales")
            setErrorConfirm("Las contraseñas no son iguales")
            isValid = false
        }
        return isValid
    }

    return (
        <View style={styles.form}>
            <Input
                placeholder="Ingresa tu email"
                containerStyle={styles.input} 
                onChange = {(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue= {formData.email}
            />
            <Input
                placeholder="Ingresa tu contraseña"
                containerStyle={styles.password}
                password = {true}
                secureTextEntry={!showPassword}
                onChange = {(e) => onChange(e, "password")}
                // keyboardType=""
                errorMessage={errorPassword}
                defaultValue= {formData.password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress= {() => setShowPassword(!showPassword)}

                    />
                }                
            />
            <Input
                placeholder="Confirma tu contraseña"
                containerStyle={styles.password}
                password = {true}
                secureTextEntry={!showPassword}
                onChange = {(e) => onChange(e, "confirm")}
                // keyboardType=""
                errorMessage={errorConfirm}
                defaultValue= {formData.confirm}
                rightIcon={
                    <Icon
                    type="material-community"
                    name={ showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress= {() => setShowPassword(!showPassword)}

                    />
                }                
            />
            <Button
                title="Registrar nuevo usuario"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => registerUser()}
            />
        </View>
    )
}

const defaultFromValues = () => {
    return {email: "", password: "", confirm: "" }
}

const styles = StyleSheet.create({
    form: {
        marginTop: 30,
    },
    input: {
        width: "100%",
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#442484"
    },
    icon: {
        color: "#c1c1c1"
    }
})
