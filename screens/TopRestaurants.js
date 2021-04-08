import React, { useState, useCallback} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { getTopRestaurants } from '../utils/actions'
import Loading from '../Components/Loading'

export default function TopRestaurants() {
    const [restaurants, setRestaurants] = useState(null)
    const [loading, setLoading] = useState(false)
    
    console.log(restaurants)

    useFocusEffect(
        useCallback(() => {
            async function getData(){
                setLoading(true)
                const response = await getTopRestaurants(10)
                if (response.statusResponse) {
                    setRestaurants(response.restaurants)
                }
                setLoading(false)
            }
            getData()
        }, [])
    )



    return (
        <View>
            <Text>TopRestaurants</Text>
            <Loading isVisible={loading} text="Por favor espere..."/>
        </View>
        
    )
}

const styles = StyleSheet.create({})
