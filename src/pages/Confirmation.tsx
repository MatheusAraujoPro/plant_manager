import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text
} from 'react-native';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

// import { Container } from './styles';

export function Confirmation() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😁
                </Text>
                <Text style={styles.title}>
                    Prontinho
                </Text>
                <Text style={styles.subtitle}>
                    Agora vamos começar a cuidar {'\n'}
                    das suas plantinhas
                </Text>

                <View style={styles.footer}>
                    <Button />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },
    emoji: {
        fontSize: 60,
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 32

    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 15,
        paddingVertical: 10,
        textAlign: 'center',
        color: colors.heading,


    },

    footer: {
        width: '100%',
        paddingHorizontal: 60,
        marginTop: 50
    
    }

})