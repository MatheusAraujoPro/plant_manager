import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Image,
    Platform,
    ScrollView,
    TouchableOpacity

} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useRoute }  from '@react-navigation/core';
import DatetimePiecker, { Event } from '@react-native-community/datetimepicker'

import { SvgFromUri } from 'react-native-svg'
import waterDrop from '../assets/waterdrop.png'
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { format, isBefore } from 'date-fns';

// import { Container } from './styles';

interface Params{
    plant:{
        id: string,
        name: string,
        about: string,
        water_tips: string,
        photo: string,
        environments: [string],
        frequency: {
            times: string,
            repeat_every: string
        }
    }

}

export function PlantSave() {


    const [selectedDateTime, setSelectedDateTime] = useState(new Date())
    const [showDateTimePicker, setShowDateTimePicker] = useState(Platform.OS === 'ios')

    const route = useRoute()
    const { plant } = route.params as Params

    function handleOnChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            setShowDateTimePicker(oldState => !oldState)
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date())
            return Alert.alert('Escolha uma hora no futuro! ⏰')
        }

        if(dateTime)
            setSelectedDateTime(dateTime)
        
    }

    function handleOpenDateTimePickerForAndroid(){
        setShowDateTimePicker(oldState => !oldState)
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                />
                <Text style={styles.plantName}>
                    {plant.name}
                </Text>
                <Text style={styles.plantAbout}>
                   {plant.about}
                </Text>
            </View>

            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image
                        source={waterDrop}
                        style={styles.tipImaghe}
                    />

                    <Text style={styles.tipText}>
                       {plant.water_tips}
                     </Text>
                </View>

                <Text style={styles.alertLabel}>               
                    Escolha qual dia quer ser lembrado
                </Text>

                {   showDateTimePicker &&(
                    <DatetimePiecker 
                    value={selectedDateTime}
                    mode='time'
                    display='spinner'
                    onChange={handleOnChangeTime}
                />)}
                {
                    Platform.OS === 'android' && (
                        <TouchableOpacity
                            style={styles.dateTimePickerButton}
                            onPress={handleOpenDateTimePickerForAndroid}
                        >
                            <Text style={styles.dateTimePickerText}>
                              {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                            </Text>
                        </TouchableOpacity>
                    )
                }

                <Button 
                    title="Cadastrar Planta"
                    onPress={() => {}}
                />

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,      
        justifyContent: 'space-between',
        backgroundColor: colors.shape

    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15

    },
    plantInfo:{
        flex: 1,      
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 50,
        backgroundColor: colors.shape

    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 12,
        marginTop: 10

    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 10

    },
    plantControllers: {

    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 65
    

    },
    tipImaghe: {
        height: 56,
        width: 56
    },
    tipText: {
        flex: 1,
        fontFamily: fonts.text,
        color: colors.blue,
        marginLeft: 20,
        fontSize: 10,
        textAlign: 'justify'

    },
    alertLabel: {       
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        position: 'relative',
        bottom: 30

    },

    dateTimePickerButton:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        position: 'relative',
        bottom: 15

    },

    dateTimePickerText:{
        color: colors.heading,
        fontSize: 17,
        fontFamily: fonts.text


    }  

})