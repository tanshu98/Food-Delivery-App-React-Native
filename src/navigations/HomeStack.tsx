import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RestaurantNearByScreen from '../screens/RestaurantNearByScreen';
import {colors} from '../constants/Colors';
// import TodaySpecial from '../components/TodaySpecial';
import { fonts } from '../constants/Fonts';
import TodaySpecialScreen from '../screens/TodaySpecialScreen';
const Home = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Home.Navigator
      screenOptions={{headerShown: false}}
      // initialRouteName="profile"
    >
      <Home.Screen name="home" component={HomeScreen} />
      <Home.Screen
        name="notificationScreen"
        component={NotificationScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: 'Notifications',
          headerTitleAlign: 'left',
          headerTitleStyle: {fontSize: 18, fontFamily: fonts.bai.medium},
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-outline"
                size={25}
                color={colors.black}
                style={{fontWeight: '800', paddingRight: 15}}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Home.Screen
        name="restaurantNearbyScreen"
        component={RestaurantNearByScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: 'Restaurant Nearby',
          headerTitleAlign: 'left',
          headerTitleStyle: {fontSize: 20, fontFamily: fonts.bai.medium},
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-outline"
                size={25}
                color={colors.black}
                style={{fontWeight: '800', paddingRight: 15}}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Home.Screen
        name="profileScreen"
        component={ProfileScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: 'Profile',
          headerTitleAlign: 'left',
          headerTitleStyle: {fontSize: 20, fontFamily: fonts.bai.medium},
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-outline"
                size={25}
                color={colors.black}
                style={{fontWeight: '800', paddingRight: 15}}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Home.Screen
        name="todaySpecialScreen"
        component={TodaySpecialScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: 'Today Special',
          headerTitleAlign: 'left',
          headerTitleStyle: {fontSize: 20, fontFamily: fonts.bai.medium},
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-outline"
                size={25}
                color={colors.black}
                style={{fontWeight: '800', paddingRight: 15}}
              />
            </TouchableOpacity>
          ),
        })}/>
    </Home.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
