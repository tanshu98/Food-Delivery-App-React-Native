import React, { useState } from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SetNewPasscodeBg } from '../assets';
import LeftArrowIcon from 'react-native-vector-icons/AntDesign';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../constants/Colors';
import { fonts } from '../constants/Fonts';
import { OtpInput } from 'react-native-otp-entry';
import { Formik } from 'formik';
import * as Yup from 'yup';
import KeyboardWrapper from '../components/KeyboardWrapper';

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  newPasscode: Yup.string()
    .required('New Passcode is required')
    .length(6, 'Passcode must be 6 digits'),
  confirmPasscode: Yup.string()
    .oneOf([Yup.ref('newPasscode')], 'Passcodes must match')
    .required('Confirm Passcode is required')
});

const SetNewPasscodeScreen = ({ navigation }: { navigation: any }) => {
    
  const handleSubmit = (values: { newPasscode: string; confirmPasscode: string }) => {
    console.log('Passcode set successfully:', values);
    navigation.navigate('loginScreen');
  };

  return (
    <KeyboardWrapper>
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'rgba(0,0,0,0)'}
        translucent={true}
        barStyle={'light-content'}
      />
      <View style={styles.setNewPasscodeScreen}>
        <ImageBackground source={SetNewPasscodeBg} style={styles.topView}>
          <TouchableOpacity>
            <LeftArrowIcon name="left" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.setNewPasscodeText}>Set New Passcode</Text>
        </ImageBackground>
      </View>

      <Formik
        initialValues={{ newPasscode: '', confirmPasscode: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.newPasscodeContainer}>
              <Text style={styles.newPasscodeText}>New Passcode</Text>
              <OtpInput
                numberOfDigits={6}
                focusColor="green"
                onTextChange={handleChange('newPasscode')}
                onBlur={()=> handleBlur('newPasscode')}
                onFilled={text => console.log(`New Passcode: ${text}`)}
              />
              {touched.newPasscode && errors.newPasscode && (
                <Text style={styles.errorText}>{errors.newPasscode}</Text>
              )}
            </View>

            <View style={styles.newPasscodeContainer}>
              <Text style={styles.newPasscodeText}>Confirm Passcode</Text>
              <OtpInput
                numberOfDigits={6}
                focusColor="green"
                onTextChange={handleChange('confirmPasscode')}
                onBlur={()=> handleBlur('confirmPasscode')}
                onFilled={text => console.log(`Confirm Passcode: ${text}`)}
              />
              {touched.confirmPasscode && errors.confirmPasscode && (
                <Text style={styles.errorText}>{errors.confirmPasscode}</Text>
              )}
            </View>

            <View style={styles.forgotPasscodeButton}>
              <TouchableOpacity onPress={()=> handleSubmit()}>
                <Text style={styles.forgotPasscodeButtonText}>VERIFY</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
    </KeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setNewPasscodeScreen: {
    alignItems: 'center',
    gap: 40,
  },
  topView: {
    width: responsiveWidth(100),
    height: responsiveWidth(40),
    opacity: 1,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  setNewPasscodeText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  newPasscodeContainer: {
    marginVertical: 20,
    gap: 10,
    marginHorizontal: 15,
  },
  newPasscodeText: {
    color: colors.black,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  forgotPasscodeButton: {
    marginHorizontal: 15,
    backgroundColor: colors.green,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 300,
    shadowColor: colors.green,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  forgotPasscodeButtonText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  errorText: {
    color: colors.red,
    fontSize: responsiveFontSize(1.8),
    marginTop: 5,
  },
});

export default SetNewPasscodeScreen;
