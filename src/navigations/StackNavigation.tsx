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
      <Stack.Navigator initialRouteName='loginScreen'>
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
          </>
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default StackNavigation;
