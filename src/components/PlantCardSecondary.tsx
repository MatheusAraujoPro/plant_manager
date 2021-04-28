import React from 'react';
import {
    View,
    StyleSheet,
    Text,

} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg'
import { color } from 'react-native-reanimated';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

// import { Container } from './styles';
interface PlantProps extends RectButtonProps {
    data: {
        name: string,
        photo: string,
        hour: String
    }
}



// import { Container } from './styles';

export function PlantCardSecondary({ data, ...rest }: PlantProps) {
    return (
        <RectButton
            style={styles.container}
            {...rest}
        >
            <SvgFromUri uri={data.photo} width={50} height={50} />            
            <Text style={styles.title}>
                {data.name}
            </Text>
            <View style={styles.details}>
                <Text style={styles.timeLabel}>
                    Regar às
                </Text>
                <Text style={styles.time}>
                    {data.hour}
                </Text>
            </View>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '100%',
        paddingVertical: 50,
        paddingHorizontal: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5,
        justifyContent: 'space-around'
    },

    title: {    
        position: 'absolute',
        left: 60,
        fontFamily: fonts.heading,
        fontSize: 13,
        color: colors.heading
    },
    details: {
        alignItems: 'flex-end'

    },
    timeLabel: {
        marginTop: 5,
        fontFamily: fonts.heading,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    }

})