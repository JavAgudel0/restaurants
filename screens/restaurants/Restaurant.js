import React, {useState, useCallback, useRef, useEffect} from 'react'
import { View, ScrollView, Dimensions, Alert,StyleSheet, Text } from 'react-native'
import {Icon, ListItem, Rating} from 'react-native-elements'
import { map } from 'lodash'
import { useFocusEffect} from '@react-navigation/native'
import firebase from 'firebase/app'
import Toast  from 'react-native-easy-toast'

import Loading from '../../Components/Loading'
import { deleteFavorite,addDocumentWithoutId, getCurrentUser, getDocumentById, getIsFavorite } from '../../utils/actions'
import CarouselImage from '../../Components/CarouselImage'
import { callNumber, formatPhone, sendEmail, sendWhatsapp } from '../../utils/helpers'
import MapRestaurant from '../../Components/restaurants/MapRestaurant'
import ListReviews from '../../Components/restaurants/ListReviews'

const widthScreen = Dimensions.get("window").width

export default function Restaurant({navigation, route}) {
    const {id, name} = route.params
    const toastRef = useRef()

    const [restaurant, setRestaurant] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [userLogged, setUserLogged] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(false)

    firebase.auth().onAuthStateChanged(user => {
        user ? setUserLogged(true) : setUserLogged(false)
        setCurrentUser(user)
    })

    navigation.setOptions({ title: name})

    useEffect(() => {
        (async () => {
            if (userLogged && restaurant) {
                const response = await getIsFavorite(restaurant.id)
                response.statusResponse && setIsFavorite(response.isFavorite)
            }
        })()
    }, [userLogged, restaurant])

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getDocumentById("restaurants", id)
                if (response.statusResponse) {
                    setRestaurant(response.document)
                } else{
                    setRestaurant({})
                    Alert.alert("Ocurrio un problema cargando el restaurante. Intente mas tarde")
                }
            })()
        }, [])
    )

    const addFavorite = async() => {
        if (!userLogged) {
            toastRef.current.show("Para agregar el restaurante a favoritos debes estar loggeado")
            return
        }
        setLoading(true)
        const response = await addDocumentWithoutId("favorites", {
            idUser: getCurrentUser().uid,
            idRestaurant: restaurant.id
        })
        setLoading(false)
        if (response.statusResponse) {
            setIsFavorite(true)
            toastRef.current.show("Restaurante añadido a favoritos.", 3000)            
        }else{
            toastRef.current.show("No se pudo añadir el restaurante a favoritos.", 3000)            
        }
    }

    const removeFavorite = async() => {
        setLoading(true)
        const response = await deleteFavorite(restaurant.id)
        setLoading(false)

        if (response.statusResponse) {
            setIsFavorite(false)
            toastRef.current.show("Restaurante eliminado a favoritos.", 3000)            
        }else{
            toastRef.current.show("No se pudo eliminar el restaurante a favoritos.", 3000)            
        }
    }

    if (!restaurant) {
        return <Loading isVisible={true} text="Cargando..."/>
    }

    return (
        <ScrollView style={styles.viewBody}>
            
            <CarouselImage
                images={restaurant.images}
                height={250}
                width={widthScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
            <View style={styles.viewFavorite}>
                <Icon                
                    type="material-community"
                    name={ isFavorite ? "heart": "heart-outline"}
                    onPress={isFavorite ? removeFavorite : addFavorite} 
                    color={"#442484"}
                    size={35}
                    underlayColor="transparent"
                />
            </View>
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}
            />
            <RestaurantInfo
            name={restaurant.name}
            location={restaurant.location}
            address={restaurant.address}
            email={restaurant.email}
            phone={formatPhone(restaurant.callingCode, restaurant.phone)}
            currentUser={currentUser}
            callingCode={restaurant.callingCode}
            phoneNoFormat={restaurant.phone}
            />
            <ListReviews
                navigation={navigation}
                idRestaurant={restaurant.id}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text="Por favor espere..."/>
        </ScrollView>
    )
}

function RestaurantInfo ({name, location, address, email, phone, currentUser, callingCode, phoneNoFormat}) {
const listInfo = [
    { type: "address", text: address, iconLeft: "map-marker", iconRight: "message-text-outline"},
    { type: "phone", text: phone, iconLeft: "phone", iconRight: "whatsapp",},
    { type: "email", text: email, iconLeft: "at" }
]

const actionLeft = (type) => {
    if (type == "phone") {
        callNumber(phone)
    }else if (type == "email") {
        if (currentUser) {
            sendEmail(email, "Interesado", `Soy ${currentUser.displayName}, estoy interesado en sus servicios`)
        }else {
            sendEmail(email, "Interesado", `Estoy interesado en sus servicios`)
        }
    }
}

const actionRight = (type) => {
    if (type == "phone") {
        
        if (currentUser) {
            sendWhatsapp(`${callingCode}${phoneNoFormat}`,`Soy ${currentUser.displayName}, estoy interesado en sus servicios`)
        }else {
            sendWhatsapp(`${callingCode}${phoneNoFormat}`, `Estoy interesado en sus servicios`)
        }
    }else if (type == "address") {
        console.log("Send push notification.")
    }
}

return(
    <View style={styles.viewRestaurantInfo}>
        <Text style={styles.restaurantInfoTitle}>Informacion sobre el restaurante</Text>
        <MapRestaurant
            location={location}
            name={name}
            height={150}
        />
        {
            map(listInfo, (item, index) => (
                <ListItem
                    key={index}
                    style={styles.containerListItem}
                >
                    <Icon
                        type="material-community"
                        name={item.iconLeft}
                        color="#442484"
                        onPress={() => actionLeft(item.type)}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{item.text}</ListItem.Title>
                    </ListItem.Content>
                    {
                        item.iconRight && (
                            <Icon
                                type="material-community"
                                name={item.iconRight}
                                color="#442484"
                                onPress={() => actionRight(item.type)}
                            />
                        )
                    }
                    
                </ListItem>
            ))
        }
    
    </View>
)
}

function TitleRestaurant ({name, description, rating}) {
    return(
        <View style={styles.viewRestaurantTitle}>
            <View style={styles.viewRestaurantContainer}>
                <Text style={styles.nameRestaurant}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
                </View>
                <Text style={styles.descriptionRestaurant}>{description}</Text>            
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    viewRestaurantTitle: {
        padding: 15        
    },
    viewRestaurantContainer: {
        flexDirection: "row"
    },
    descriptionRestaurant: {
        marginTop: 8,
        color: "gray",
        textAlign: "justify"
    },
    rating: {
        position: "absolute",
        right: 0
    },
    nameRestaurant: {
        fontWeight: "bold"
    },
    viewRestaurantInfo: {
        margin: 15,
        marginTop: 25,        
    },
    restaurantInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    }, 
    containerListItem: {
        borderBottomColor: "#a376c7",
        borderBottomWidth: 1
    },
    viewFavorite: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "#FFF",
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15
    }
})
