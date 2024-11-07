import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {OtpIcon, OtpVerificationBg} from '../assets';
import LeftArrowIcon from 'react-native-vector-icons/AntDesign';
import {colors} from '../constants/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {fonts} from '../constants/Fonts';
import {OtpInput} from 'react-native-otp-entry';
import Toast from 'react-native-toast-message';
import ReloadIcon from 'react-native-vector-icons/AntDesign';
import {handleSendOtp, handleVerifyOtp} from '../redux/slices/AuthSlice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store/store';
import notifee, {AndroidImportance} from '@notifee/react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface UserData {
  mobile_no: string;
  country_code: string;
  otp: string;
}
interface OtpVerificationScreenProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: UserData;
  };
}

const OtpVerificationScreen = ({
  navigation,
  route,
}: OtpVerificationScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [userOtp, setUserOtp] = useState('');
  const [otp, setOtp] = useState(route.params.otp);

  const handleOtpChange = (otp: string) => {
    setUserOtp(otp);
  };

  const generateOtp = async () => {
    const userDetails = {
      mobile_no: route.params.mobile_no,
      country_code: route.params.country_code,
    };
    const resendOtp = await dispatch(handleSendOtp(userDetails));

    // @ts-ignore
    if (resendOtp?.error?.message != 'Rejected') {
      onDisplayNotification(resendOtp?.payload?.data?.otp);
      const newOtp = resendOtp?.payload?.data?.otp; // Extract the new OTP
      setOtp(newOtp); // Update the OTP in state
      Toast.show({
        type: 'success',
        text1: 'Otp sent successfully. Please check your inbox.',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong. Please try again 😕',
      });
    }
  };

  const handleSubmit = async () => {
    const otpVerification = await dispatch(
      handleVerifyOtp({
        ...route.params,
        otp: userOtp,
      }),
    );

    // @ts-ignore
    if (otpVerification?.error?.message != 'Rejected') {
      Toast.show({
        type: 'success',
        text1: 'Otp is verified Successfully🤩🥳.',
      });
      navigation.navigate('setNewPasscodeScreen', {...route.params});
    } else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong. Please try again 😕',
      });
    }
  };

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

  useEffect(() => {
      onDisplayNotification(otp);
  },[])
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'rgba(0,0,0,0)'}
        translucent={true}
        barStyle={'light-content'}
      />
      <ImageBackground source={OtpVerificationBg} style={styles.topView}>
        <View style={styles.otpHeaderContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LeftArrowIcon name="left" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.otpVerificationText}>OTP Verification</Text>
        </View>
        <View style={styles.otpIconContainer}>
          <Image source={OtpIcon} style={styles.otpIcon} />
          <View style={styles.otpTextContainer}>
            <Text style={styles.sendOtpText}>Enter the OTP sent to</Text>
            <Text style={styles.sendOtpNumber}>{route.params.mobile_no}</Text>
          </View>
        </View>
        <View style={styles.otpInputContainerMain}>
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
        </View>
      </ImageBackground>
      <View style={styles.resendOtp}>
        <Text style={styles.resendOtpText}>Resend OTP</Text>
        <TouchableOpacity style={styles.reloadIcon} onPress={generateOtp}>
          <ReloadIcon name="reload1" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.otpVerifyButton}>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.otpVerifyButtonText}>VERIFY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    width: responsiveWidth(100),
    height: responsiveWidth(110),
    opacity: 1,
    gap: 10,
    paddingVertical: 50,
  },
  otpHeaderContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  otpVerificationContainer: {
    alignItems: 'center',
    gap: 40,
  },
  otpVerificationText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.regular,
  },
  otpIconContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  otpIcon: {},
  otpTextContainer: {
    gap: 10,
    marginVertical: 40,
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
  otpInputContainerMain: {
    alignItems: 'center',
    marginVertical: -40,
  },
  otpInputContainer: {
    width: '60%',
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
  resendOtp: {
    marginVertical: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    textAlign: 'center',
    marginLeft: 20,
  },
  resendOtpText: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.montserrat.semiBold,
  },
  reloadIcon: {
    backgroundColor: colors.darkRed,
    padding: 15,
    borderRadius: 25,
    fontWeight: 'bold',
  },
  otpVerifyButton: {
    marginHorizontal: 15,
    backgroundColor: colors.green,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 100,
    shadowColor: colors.green,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  otpVerifyButtonText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
});

export default OtpVerificationScreen;
