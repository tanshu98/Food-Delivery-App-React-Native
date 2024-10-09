import React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {splashBg} from '../assets';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const SplashScreen = () => {
  return (
    <View style={styles.safeAreaContainer}>
      <ImageBackground
        source={splashBg}
        resizeMode="cover"
        style={styles.splashContainer}></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
});

export default SplashScreen;
