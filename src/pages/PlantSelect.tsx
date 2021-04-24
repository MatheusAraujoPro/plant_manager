import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';

import { EnviromentsButton } from '../components/EnviromentButton';
import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import api from '../services/api'
import { Load } from '../components/Load'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

// import { Container } from './styles';

export function PlantSelect() {
    interface EnviromentsData {
        key: string,
        title: string
    }

    interface PlantsProps {
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



    const [enviroments, setEnviroments] = useState<EnviromentsData[]>([])
    const [plants, setplants] = useState<PlantsProps[]>([])
    const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([])
    const [enviroment, setEnviroment] = useState('all')
    const [loading, setLoading] = useState(true)

    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadAll, setLoadAll] = useState(false)


    function handleEnviromentSelected(enviroment: string) {
        setEnviroment(enviroment)

        if (enviroment == 'all')
            return setFilteredPlants(plants)

        const filtered = plants.filter(plant =>
            plant.environments.includes(enviroment)
        )

        setFilteredPlants(filtered)

    }

    async function fetchPlants() {
        const { data } = await api
            .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
        if (!data)
            return setLoading(false)
        if (page > 1) {

            /* Se a página que vier for próxima
               junte tudo que estava antes com
               o que veio agora
            */
            setplants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        } else {
            setplants(data)
            setFilteredPlants(data)
        }

        setLoading(false)
        setLoadingMore(false)
    }

    function handleFetchMore(distance: number) {
        if (distance < 1)
            return

        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)
        fetchPlants()
    }

    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api
                .get('plants_environments?_sort=title&_order=asc')
            setEnviroments([
                {
                    key: 'all',
                    title: 'todos'
                },
                ...data
            ])
        }

        fetchEnviroment()
    }, [])

    useEffect(() => {
        fetchPlants()
    }, [])

    if (loading)
        return <Load />
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar a sua planta?
                 </Text>
            </View>
            <View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentsList}
                    data={enviroments}

                    renderItem={({ item }) => (
                        <EnviromentsButton
                            title={item.title}
                            active={item.key === enviroment}
                            onPress={() => handleEnviromentSelected(item.key)}

                        />
                    )}
                />
            </View>

            <View style={styles.plant}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={styles.contentContainerStyle}
                    data={filteredPlants}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) =>{
                        handleFetchMore(distanceFromEnd)
                    }}
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.green_dark} />
                        : <></>
                    }

                    renderItem={({ item }) => (
                        <PlantCardPrimary data={item} />
                    )}
                />


            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 15,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginTop: 20,
        lineHeight: 25

    },
    subtitle: {
        fontSize: 15,
        fontFamily: fonts.text,
        color: colors.heading,
        lineHeight: 20

    },

    enviromentsList: {
        justifyContent: 'center',
        height: 40,
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plant: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    contentContainerStyle: {

    }
})

