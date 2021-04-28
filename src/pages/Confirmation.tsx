import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
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

interface Params {
    title: string
    subTitle: string
    buttonTitle: string
    icon: 'smile' | 'hug',
    nextScren: string
}

const emojis = {
    smile: '😁',
    hug: '🤭'
}

export function Confirmation() {
    const navigation = useNavigation()
    const routes = useRoute();
    const {
            title,
            subTitle,
            buttonTitle,
            icon,
            nextScren
    } = routes.params as Params

    function handleMoveOn() {
        navigation.navigate(nextScren)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                  {subTitle}
                </Text>

                <View style={styles.footer}>
                    <Button
                        title="Começar"
                        onPress={handleMoveOn}
                    />
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