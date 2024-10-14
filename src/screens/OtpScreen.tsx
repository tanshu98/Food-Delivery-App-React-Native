import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
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


const OtpScreen = ({navigation}: {navigation: any}) => {
  const [userOtp, setUserOtp] = useState('');
  const [otp, setOtp] = useState('');

  const handleOtpChange = (otp: string) => {
    setUserOtp(otp);
  };
  const generateOtp = (): string => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    console.log('otp', otp);
    setOtp(otp);
    return otp;
  };
  useEffect(() => {
    generateOtp();
  }, []);

  const handleSubmit = () => {
    if (userOtp.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'Please enter the OTP 🙂',
        });
      } else if (userOtp === otp) {
        Toast.show({
          type: 'success',
          text1: 'Congratulations🤩 You have successfully Signed up🥰 ',
        });
        navigation.navigate('loginScreen');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid OTP. Please try again 😕',
        });
      }
  };
  return (
    <ScrollView
      style={styles.safeAreaContainer}
      keyboardShouldPersistTaps="handled">
      <ImageBackground
        source={otpBanner}
        resizeMode="cover"
        style={styles.OtpScreenBg}>
        <SafeAreaView style={styles.OtpContainer}>
          <Text style={styles.otpText}>OTP Verification</Text>
          <Image source={OtpIcon} />
          <View style={styles.otpTextContainer}>
            <Text style={styles.sendOtpText}>Enter the OTP sent to</Text>
            <Text style={styles.sendOtpNumber}>+91 987654321</Text>
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
          {/* </KeyboardAvoidingView> */}
          <View style={styles.resendOtp}>
            <Text style={styles.resendOtpText}>Resend OTP</Text>
            <View style={styles.reloadIcon}>
              <ReloadIcon name="reload1" size={18} color={colors.white} />
            </View>
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
