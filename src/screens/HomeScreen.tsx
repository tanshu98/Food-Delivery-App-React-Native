import React from 'react';
import {Platform, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import HomeHeader from '../components/HomeHeader';
import HomeTopComponent from '../components/HomeTopComponent';
import HomeCarousal from '../components/HomeCarousal';
import BestChoises from '../components/BestChoises';
import TodaySpecial from '../components/TodaySpecial';
import { colors } from '../constants/Colors';


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'rgba(0,0,0,0)'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <HomeHeader />
        {/* <HomeTopComponent /> */}
        {/* <HomeCarousal /> */}
        {/* <BestChoises /> */}
        {/* <TodaySpecial /> */}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(100),
    backgroundColor: colors.white,
    paddingTop:
      Platform.OS === 'android' ? responsiveHeight(3) : responsiveHeight(6),
  },
});