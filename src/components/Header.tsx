import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import colors from '../styles/colors'
import userImg from '../assets/profile.jpg'
import fonts from '../styles/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'

// import { Container } from './styles';

export function Header() {

    const [userName, setUserName] = useState<string>()

    useEffect(()=>{
        async function loadStorageUserName(){
            const name = await AsyncStorage.getItem('@plantmanager:user')
            setUserName(name || '')
           
        }
        loadStorageUserName()
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.gretting}>Olá,</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>

            <View>
                <Image 
                    style={styles.image}
                    source={userImg}
                />
            </View>
        
        </View>
  )
}

const styles = StyleSheet.create({
    container: {     
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
        
    },
    gretting:{
        fontSize: 25,
        color: colors.heading,
        fontFamily: fonts.text

    },
    userName:{

        fontSize: 25,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40
    },
    image:{
        width: 80,
        height: 80,
        borderRadius: 40
    }

})

