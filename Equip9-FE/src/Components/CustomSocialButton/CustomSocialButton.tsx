import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { theme } from '../../Theme/Theme';

const CustomSocialButton = ({value}:{value:string}) => {
 const images = {
   Google: require('../../Assets/Images/google.png'),
   Facebook: require('../../Assets/Images/facebook.png'),
   Apple: require('../../Assets/Images/apple-1.png'),
 };

 
 const image = images[value];
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={image}
        style={{height:21, width:21}}
      />
    </TouchableOpacity>
  );
};

export default CustomSocialButton;

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: theme.LightCyanBlue,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 13,
    gap: 10,
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: theme.lightWhite,
    height: 24,
  },
});
