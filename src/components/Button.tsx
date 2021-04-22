import React from 'react';
import {
     View,
     StyleSheet,
     TouchableOpacity,
     Text,
     TouchableOpacityProps

 } from 'react-native';

 import colors from '../styles/colors';
import fonts from '../styles/fonts';

// import { Container } from './styles';
interface Button extends TouchableOpacityProps{
    title: string
}

export function Button ({ title, ...rest }: Button) {
  return(
      <TouchableOpacity style={styles.container}
        {...rest}
      >
          <Text style={styles.text}>
              {title}
          </Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{    
        backgroundColor: colors.green,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
     
    },
    text:{
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading
    }
})