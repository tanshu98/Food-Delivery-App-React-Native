import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {OtpIcon, otpBanner} from '../assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../constants/Colors';
import {fonts} from '../constants/Fonts';
import {OtpInput} from 'react-native-otp-entry';
import ReloadIcon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store/store';
import { handleSendOtp,handleVerifyOtp } from '../redux/slices/AuthSlice';
import notifee, { AndroidImportance } from '@notifee/react-native';

interface OtpData {
  mobile_no: string;
  country_code: string;
}

interface OtpScreenProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      userOtp: OtpData;
    };
  };
}

const OtpScreen = ({navigation, route}: OtpScreenProps) => {
    const dispatch = useDispatch<AppDispatch>();
  const [userOtp, setUserOtp] = useState('');
  const [otp, setOtp] = useState('');

  const [details, setDetails] = useState({
    mobile_no: '',
    country_code: '',
    otp: '',
  });
  

  const handleOtpChange = (otp: string) => {
    setDetails(prev => ({
      ...prev,
      otp: otp,
    }))
  };
  const generateOtp = () => {
    sendOtpHandler();
  };
  useEffect(() => {
    sendOtpHandler();
  }, []);

  async function onDisplayNotification(otp: string) {
    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance:AndroidImportance.HIGH
    });

    await notifee.displayNotification({
      title: 'Otp is generated successfully',
      body: otp,
      android: {
        channelId,
      importance:AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
    });
  }



  const sendOtpHandler =async ()=> {

    //  Get Otp Info from Async storage, This has 2 fields - mobile_no and country_code
    //  Store it in a variable named otpDetails
    // set this variable as the value of details.
    // So aapn otp che je values hote te aapn details madhe store krru ..now otp filed is currently empty

    // When u run the handleSendOtp function, this will generate the otp from backened..and we will pass the otp to handleSendOtp.

    const otpInfo = (await AsyncStorage.getItem('otpInfo')) ?? undefined;
    const otpDetails = otpInfo && JSON.parse(otpInfo);

    setDetails(prev => ({
      ...prev,
      mobile_no: otpDetails?.mobile_no,
      country_code: otpDetails?.country_code,
    }))
    

    const registerOtp = await dispatch(handleSendOtp(otpDetails));
    
    // @ts-ignore
    if(registerOtp?.error?.message != 'Rejected') {
        onDisplayNotification(registerOtp?.payload?.data?.otp);
    } else {
        Toast.show({
            type: 'error',
            text1: 'Something went wrong. Please try again 😕',
          });
    }

  }

  const handleSubmit =async () => {
    const verifyOtpData = await dispatch(handleVerifyOtp(details));
    // @ts-ignore
    if(verifyOtpData?.error?.message != 'Rejected') {
        Toast.show({
            type: 'success',
            text1: 'otp is verified Successfully🤩🥳.',
          });
        navigation.navigate('loginScreen');
    } else {
        Toast.show({
            type: 'error',
            text1: 'Something went wrong. Please try again 😕',
          });
    }
  };
  return (
    <ScrollView
      style={styles.safeAreaContainer}
      keyboardShouldPersistTaps="handled">
      <StatusBar
        backgroundColor={'rgba(0,0,0,0)'}
        translucent={true}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={otpBanner}
        resizeMode="cover"
        style={styles.OtpScreenBg}>
        <SafeAreaView style={styles.OtpContainer}>
          <Text style={styles.otpText}>OTP Verification</Text>
          <Image source={OtpIcon} />
          <View style={styles.otpTextContainer}>
            <Text style={styles.sendOtpText}>Enter the OTP sent to</Text>
            <Text style={styles.sendOtpNumber}>{details?.mobile_no}</Text>
          </View>
          <OtpInput
            numberOfDigits={4}
            focusColor={colors.black}
            focusStickBlinkingDuration={500}
            onTextChange={handleOtpChange}
            autoFocus={true}
            theme={{
              containerStyle: styles.otpInputContainer,
              pinCodeContainerStyle: styles.otpInputBox,
              pinCodeTextStyle: styles.otpTextStyle,
            }}
          />
          <View style={styles.resendOtp}>
            <Text style={styles.resendOtpText}>Resend OTP</Text>
            <TouchableOpacity style={styles.reloadIcon} onPress={generateOtp}>
              <ReloadIcon name="reload1" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.otpSubmitButton}>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.otpSubmitButtonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  OtpScreenBg: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: colors.red,
    opacity: 0.9,
  },
  OtpContainer: {
    flex: 1,
    marginVertical: 60,
    alignItems: 'center',
    gap: 25,
  },
  otpText: {
    color: colors.white,
    fontSize: responsiveFontSize(4),
    fontFamily: fonts.bai.semiBold,
  },
  resendOtp: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    textAlign: 'center',
    marginLeft: 20,
  },
  reloadIcon: {
    backgroundColor: colors.darkRed,
    padding: 15,
    borderRadius: 25,
  },
  otpTextContainer: {
    gap: 10,
  },
  sendOtpText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.montserrat.semiBold,
  },
  sendOtpNumber: {
    color: colors.white,
    fontSize: responsiveFontSize(3),
    fontFamily: fonts.montserrat.semiBold,
    textAlign: 'center',
  },
  resendOtpText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.montserrat.semiBold,
  },
  otpInputContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInputBox: {
    borderWidth: 1,
    borderColor: colors.lightTextColor,
    backgroundColor: colors.white,
    width: responsiveWidth(12),
    height: responsiveHeight(7),
    textAlign: 'center',
    borderRadius: 8,
  },
  otpTextStyle: {
    fontSize: responsiveFontSize(2.5),
    color: colors.black,
  },
  otpSubmitButton: {
    width: responsiveWidth(90),
    backgroundColor: colors.green,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 190,
    shadowColor: colors.green,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  otpSubmitButtonText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
});

export default OtpScreen;
