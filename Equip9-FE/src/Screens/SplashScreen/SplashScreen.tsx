// import React from 'react';
// import {SafeAreaView, View, StyleSheet, Text, Image} from 'react-native';

// const SplashScreen = () => {
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
//       <View style={styles.container}>
//         <Text
//           style={{
//             alignSelf: 'center',
//             fontSize:32,
//             fontWeight:'bold'
//           }}>EQUIP9</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor:'white',
//     alignSelf:'center'
//   },
// });

import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import { theme } from '../../Theme/Theme';

const SplashScreen = ({navigation}) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 2,
        tension: 160,
        useNativeDriver: true,
      }),
    ]).start(() => {
     
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {opacity: fadeAnim, transform: [{scale: scaleAnim}]},
        ]}>
        <Text style={styles.logoText}>EQUIP9</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:theme.lightBlue,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.white,
  },
});

export default SplashScreen;
