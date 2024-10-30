import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { HomeSlice,Product,getTodaySpecial } from '../redux/slices/HomeSlice'



const HomeScreen = ({navigation}:any) => {
    const dispatch = useDispatch<AppDispatch>();
    const {products, error,loading} = useSelector((state: RootState)=> state.HomeSlice)

    console.log("products----",products);
    
    const handleNavigate = () => {
        navigation.navigate('todaySpecialScreen',{data:products})
    }
    useEffect(()=> {
        dispatch(getTodaySpecial());
    },[dispatch])
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'rgba(0,0,0,0)'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        >
        <HomeHeader navigation={navigation} />
        <HomeTopComponent />
        <HomeCarousal />
        <BestChoises />
        <TodaySpecial navigation={navigation} data={products} handleNavigate={handleNavigate}/>
        <RestaurantNearby navigation={navigation}/>
      </ScrollView>
    </View>
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