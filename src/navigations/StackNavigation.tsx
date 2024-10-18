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
import { colors } from '../constants/Colors';
import { fonts } from '../constants/Fonts';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import TodaySpecialScreen from '../screens/TodaySpecialScreen';
import RestaurantNearByScreen from '../screens/RestaurantNearByScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsActive(!isActive);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='bottomNavigation'>
        {!isActive ? (
          <Stack.Screen
            options={{headerShown: false}}
            name="splashScreen"
            component={SplashScreen}
          />
        ) : (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="onboardingScreen"
              component={OnboardingScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="loginScreen"
              component={LoginScreen}
            />
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
             <Stack.Screen
              options={{headerShown: false}}
              name="bottomNavigation"
              component={BottomNavigation}
            />
              {/* <Stack.Screen
              options={navigation}{{headerShown: true,
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

              }}
              name="checkoutScreen"
              component={CheckoutScreen}
            /> */}

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
            
          </>
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default StackNavigation;
