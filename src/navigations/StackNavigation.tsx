import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OtpScreen from '../screens/OtpScreen';
import Toast from 'react-native-toast-message';
import ForgetPasscodeScreen from '../screens/ForgetPasscodeScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import SetNewPasscodeScreen from '../screens/SetNewPasscodeScreen';
import BottomNavigation from './BottomNavigation';
import CheckoutScreen from '../screens/CheckoutScreen';
import {colors} from '../constants/Colors';
import {fonts} from '../constants/Fonts';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import TodaySpecialScreen from '../screens/TodaySpecialScreen';
import RestaurantNearByScreen from '../screens/RestaurantNearByScreen';
import OrderScreen from '../screens/OrderScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import Favorite from '../screens/Favorite';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const AuthCheck = async () => {
    const token = await AsyncStorage.getItem('loginToken');
    if (token) {
      setIsLogin(true);
      console.log('TOKENNNNN----', token);
    } else {
      setIsLogin(false);
    }

    console.log('isLogin----', isLogin);
  };

  useEffect(() => {
    AuthCheck();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsActive(!isActive);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="loginScreen"> */}
      {!isActive ? (
        <Stack.Screen
          options={{headerShown: false}}
          name="splashScreen"
          component={SplashScreen}
        />
      ) : isLogin ? (
        <Stack.Navigator initialRouteName="bottomNavigation">
          <Stack.Screen
            options={{headerShown: false}}
            name="bottomNavigation"
            component={BottomNavigation}
            // AuthCheck={AuthCheck}
          />
          <Stack.Screen
            name="checkoutScreen"
            component={CheckoutScreen}
            options={({navigation}) => ({
              headerShown: true,
              title: 'Checkout',
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
          <Stack.Screen
            name="profileScreen"
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
          >{props=> <ProfileScreen {...props} AuthCheck={AuthCheck} />}</Stack.Screen>
          <Stack.Screen
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

          <Stack.Screen
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
            })}
          />

          <Stack.Screen
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

          <Stack.Screen
            name="order"
            component={OrderScreen}
            options={({navigation}) => ({
              headerShown: true,
              title: 'Order',
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

          <Stack.Screen
            name="editProfile"
            component={EditProfileScreen}
            options={({navigation}) => ({
              headerShown: true,
              title: 'Edit Profile',
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

          <Stack.Screen
            name="favorite"
            component={Favorite}
            options={({navigation}) => ({
              headerShown: true,
              title: 'Favorite',
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
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="loginScreen">

          <Stack.Screen
            options={{headerShown: false}}
            name="onboardingScreen"
            component={OnboardingScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="loginScreen"
          
          >{props=> <LoginScreen {...props} AuthCheck={AuthCheck} />}</Stack.Screen>
          <Stack.Screen
            options={{headerShown: false}}
            name="registerScreen"
            component={RegisterScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="otpScreen"
            component={OtpScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="forgetPasscodeScreen"
            component={ForgetPasscodeScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="otpVerificationScreen"
            component={OtpVerificationScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="setNewPasscodeScreen"
            component={SetNewPasscodeScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNavigation;
