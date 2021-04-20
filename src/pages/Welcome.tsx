import React from 'react';
import {
    SafeAreaView,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'

import wateringImg from '../assets/watering.png'
import colors from '../styles/colors'

// import { Container } from './styles';

export function Welcome() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencie {'\n'}
                suas plantas {'\n'}
                de forma fácil
            </Text>
            <Image
                source={wateringImg} 
                style={styles.img}
                resizeMode={'contain'}
            />

            <Text style={styles.subTitle}>
                Não esqueça mais de regar suas plantas.
                Nós cuidamos de lembrar você
                sempre que precisar.
            </Text>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}> > </Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 40,
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 14,
        paddingHorizontal: 20,
        color: colors.heading

    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 20,
        height: 56,
        width: 56

    },

    buttonText: {
        color: colors.white,
        fontSize: 24,
    },
    img: {
        height: Dimensions.get('window').width * 0.7
    }

})
