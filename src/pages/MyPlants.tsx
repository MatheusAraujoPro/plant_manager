import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import waterDrop from '../assets/waterdrop.png'
import { FlatList } from 'react-native-gesture-handler';
import { PlantProps, loadPlants } from '../lib/Storage';
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

// import { Container } from './styles';

export function MyPlants() {
    const [MyPlants, setMyPlants] = useState<PlantProps[]>([])
    const [loading, setLoading] = useState(true)
    const [nextWatered, setNextWatered] = useState<string>()

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlants()

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateNotifications).getTime(),
                new Date().getTime(),
                { locale: pt }

            )

            setNextWatered(
                `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas`
            )

            setMyPlants(plantsStoraged)
            setLoading(false)
            console.log(MyPlants);
            
        }

        loadStorageData()

    }, [])

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotLight}>
                <Image
                    source={waterDrop}

                />
                <Text style={styles.spotLightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Proxima a ser regada
                </Text>
                <FlatList
                 data={MyPlants}
                 keyExtractor={(item) => String(item.id)}
                 renderItem={({ item })=>(
                     <PlantCardSecondary
                        data={item}                        
                     />
                 )}
                 showsVerticalScrollIndicator={false}
                 contentContainerStyle={{flex: 1}}

                />
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 30,
        backgroundColor: colors.background
    },
    spotLight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    spotLightImage: {
        height: 60,
        width: 60

    },
    spotLightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        textAlign: 'justify'

    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle:{
        fontSize: 15,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }

})