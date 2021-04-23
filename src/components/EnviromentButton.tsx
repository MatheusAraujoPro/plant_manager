import React from 'react';
import {
  View,
  StyleSheet,
  Text,

} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { color } from 'react-native-reanimated';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

// import { Container } from './styles';
interface EnviromentsButton extends RectButtonProps {
  title: string,
  active?: boolean
}

export function EnviromentsButton({
  title,
  active = false,
  ...rest
}: EnviromentsButton) {
  return (
    <RectButton
      style={[
        styles.container,
        active && styles.containerActive
      ]}
      {...rest}
    >
     <Text  style={[
       styles.text,
       active && styles.textActive
       ]}>{title}</Text>

    </RectButton>

  )
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.shape,
    height: 40,
    width:76,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10

  }, 
  text:{
    color: colors.heading,
    fontFamily: fonts.text

  },
  containerActive:{
    color: colors.green,
    backgroundColor: colors.green_light
  },
  textActive:{
    color: colors.green_dark,
    fontFamily: fonts.heading    
    
  }
})
