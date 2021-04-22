import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackRoutes from './stack.routes'

// import { Container } from './styles';

const routes = () => (
    <NavigationContainer>
        <StackRoutes/>
    </NavigationContainer>
)
  


export default routes