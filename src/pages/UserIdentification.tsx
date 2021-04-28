import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

// import { Container } from './styles';

export function UserIdentification() {

    const [isFocused, setIsFocosed] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [Name, setName] = useState<string>()
    const navigation = useNavigation()

    function handleInputBlur() {
        setIsFocosed(false)
        setIsFilled(!!Name)

    }

    function handleInputFocus() {
        setIsFocosed(true)
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value)
        setName(value)
    }

    async function handleSubmit() {
        if (!Name)
            return Alert.alert('Me diz como posso chamar você 😀')

            try {
                await AsyncStorage.setItem('@plantmanager:user', Name)
                navigation.navigate('Confirmation', {
                    title: 'Prontinho',  
                    subTitle: 'Agora vamos começara  cuidar das suas plantinhas com muito carinho',
                    buttonTitle: 'Começar',
                    icon: 'smile',
                    nextScren: 'PlantSelect'
                })
                
            } catch  {
                Alert.alert('Não foi possível salvar o seu nome 😥')
            }

    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <Text style={styles.emoji}>
                                {isFilled ? '😄' : '😃'}
                            </Text>
                            <Text style={styles.title}>
                                Como podemos{'\n'}
                       chamar você?
                   </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) &&
                                    { borderColor: colors.green }
                                ]}
                                placeholder="Digite o seu nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />

                            <View style={styles.footert}>
                                <Button
                                    onPress={handleSubmit}
                                    title='Confirmar'
                                />
                            </View>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%',
    },

    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'

    },

    emoji: {
        fontSize: 35
    },

    title: {
        fontFamily: fonts.heading,
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 32
    },

    input: {
        borderBottomWidth: 1,
        borderColor: colors.heading,
        color: colors.gray,
        width: '100%',
        fontSize: 18,
        marginTop: 30,
        padding: 10,
        textAlign: 'center'

    },

    footert: {
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 20
    }


})

