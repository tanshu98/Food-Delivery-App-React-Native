import React from 'react';
import {Platform, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import HomeHeader from '../components/HomeHeader';
import HomeTopComponent from '../components/HomeTopComponent';
import HomeCarousal from '../components/HomeCarousal';
import BestChoises from '../components/BestChoises';
import TodaySpecial from '../components/TodaySpecial';
import { colors } from '../constants/Colors';
import KeyboardWrapper from '../components/KeyboardWrapper';
import RestaurantNearby from '../components/RestaurantNearby';


const HomeScreen = ({navigation}:any) => {
  return (
    // <KeyboardWrapper>
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'rgba(0,0,0,0)'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{flexGrow: 1}}
        >
        <HomeHeader navigation={navigation} />
        <HomeTopComponent />
        <HomeCarousal />
        <BestChoises />
        <TodaySpecial navigation={navigation}/>
        <RestaurantNearby navigation={navigation}/>
      </ScrollView>
    </View>
    // </KeyboardWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop:
      Platform.OS === 'android' ? responsiveHeight(3) : responsiveHeight(6),
  },
});