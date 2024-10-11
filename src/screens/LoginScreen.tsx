import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {loginbgOne, loginbgTwo, sellerIconStore} from '../assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../constants/Colors';
import {fonts} from '../constants/Fonts';
import CountryCodes from '../components/CountryCodes';
import PhoneIcon from 'react-native-vector-icons/MaterialIcons';
import CustomerIcon from 'react-native-vector-icons/MaterialIcons';
import {loginStoreIcon} from '../assets';
import { customerIconWhite, customerIconRed } from '../assets';

import {OtpInput} from 'react-native-otp-entry';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('Customer');

  // return (

  //   <View style={styles.loginContainer}>
  //     <StatusBar
  //       backgroundColor={'rgba(0,0,0,0)'}
  //       translucent={true}
  //       barStyle={'light-content'}
  //     />
  //     <ImageBackground source={loginbgOne} style={styles.bgContainer}>
  //       <Image source={loginbgTwo} style={styles.bannerContainer} />
  //       <View style={styles.loginWelcomeBack}>
  //         <Text style={styles.title}>Login</Text>
  //         <Text style={styles.subTitle}>Welcome Back!</Text>
  //       </View>
  //     </ImageBackground>

  //     <View style={styles.loginForm}>
  //       <View style={styles.codesMobileInputContainer}>
  //         <CountryCodes />
  //         <View style={styles.mobileInputContainer}>
  //           <TextInput
  //             placeholder="Mobile No"
  //             placeholderTextColor={colors.black}
  //             style={styles.mobileInput}
  //           />
  //           <PhoneIcon name="phone" size={20} color={colors.lightTextColor} />
  //         </View>
  //       </View>
  //       <View style={styles.passwordInputContainer}>
  //         <Text style={styles.passwordInputTitle}>Passcode</Text>
  //         <OtpInput
  //           numberOfDigits={6}
  //           focusColor="green"
  //           focusStickBlinkingDuration={500}
  //           onTextChange={text => console.log(text)}
  //           onFilled={text => console.log(`OTP is ${text}`)}
  //           textInputProps={{
  //             accessibilityLabel: 'One-Time Password',
  //           }}
  //         />
  //         <Text style={styles.forgotPasscode}>Forgot Passcode?</Text>
  //       </View>

  //       {/* Customer and Seller Toggle */}
  //       <View style={styles.customerSellerContainer}>
  //         <TouchableOpacity style={styles.customerContainer}
  //           onPress={() => setSelectedUserType('Customer')}
          
  //         >
  //           <View style={styles.customerIconContainer}>
  //             {selectedUserType === 'Customer' ? (
  //                 <Image source={customerIconRed} />
  //             ): (<Image source={customerIconWhite} />)}
  //           </View>
  //           <Text style={styles.customerText}>Customer</Text>
  //         </TouchableOpacity>

  //         <TouchableOpacity
  //           onPress={() => setSelectedUserType('Seller')}
  //           style={styles.sellerContainer}>
  //           <View style={styles.sellerIconContainer}>
  //             {selectedUserType === 'Seller' ? (
  //               <Image source={sellerIconStore} />
  //             ) : (
  //               <Image source={loginStoreIcon} />
  //             )}
  //           </View>
  //           <Text style={[styles.sellerText]}>Seller</Text>
  //         </TouchableOpacity>
  //       </View>

  //       <TouchableOpacity style={styles.loginButton}>
  //         <Text style={styles.loginButtonText}>Login</Text>
  //       </TouchableOpacity>
  //       <View style={styles.registerContainer}>
  //         <TouchableOpacity style={styles.registerButton}>
  //           <Text style={styles.registerButtonText}>Register</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </View>
  // );

  const validationSchema = Yup.object().shape({
    mobileNumber: Yup.string()
      .required('Mobile Number is required')
      .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits'),
    passcode: Yup.string()
      .required('Passcode is required')
      .length(6, 'Must be exactly 6 digits'),
  });

  return (
    <ScrollView>
    <Formik
      initialValues={{mobileNumber: '', passcode: ''}}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Handle form submission
        console.log('Login details:', values);
      }}>
      {({handleSubmit, handleChange, values, errors, touched}) => (
        <View style={styles.loginContainer}>
          <StatusBar
            backgroundColor={'rgba(0,0,0,0)'}
            translucent={true}
            barStyle={'light-content'}
          />
          <ImageBackground source={loginbgOne} style={styles.bgContainer}>
            <Image source={loginbgTwo} style={styles.bannerContainer} />
            <View style={styles.loginWelcomeBack}>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.subTitle}>Welcome Back!</Text>
            </View>
          </ImageBackground>

          <View style={styles.loginForm}>
            <View style={styles.codesMobileInputContainer}>
              <CountryCodes />
              <View style={styles.mobileInputContainer}>
                <TextInput
                  placeholder="Mobile No"
                  placeholderTextColor={colors.black}
                  style={styles.mobileInput}
                  keyboardType="number-pad"
                  onChangeText={handleChange('mobileNumber')}
                  value={values.mobileNumber}
                />
                <PhoneIcon
                  name="phone"
                  size={20}
                  color={colors.lightTextColor}
                />
              </View>
            </View>
            {touched.mobileNumber && errors.mobileNumber && (
              <Text style={styles.errorText}>{errors.mobileNumber}</Text>
            )}

            <View style={styles.passwordInputContainer}>
              <Text style={styles.passwordInputTitle}>Passcode</Text>
              <OtpInput
                numberOfDigits={6}
                focusColor="green"
                onTextChange={handleChange('passcode')}
                onFilled={text => console.log(`OTP is ${text}`)}
              />
              {touched.passcode && errors.passcode && (
                <Text style={styles.errorText}>{errors.passcode}</Text>
              )}
              <Text style={styles.forgotPasscode}>Forgot Passcode?</Text>
            </View>

            <View style={styles.customerSellerContainer}>
              <TouchableOpacity
                style={styles.customerContainer}
                onPress={() => setSelectedUserType('Customer')}>
                <View style={styles.customerIconContainer}>
                  {selectedUserType === 'Customer' ? (
                    <Image source={customerIconRed} />
                  ) : (
                    <Image source={customerIconWhite} />
                  )}
                </View>
                <Text style={styles.customerText}>Customer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedUserType('Seller')}
                style={styles.sellerContainer}>
                <View style={styles.sellerIconContainer}>
                  {selectedUserType === 'Seller' ? (
                    <Image source={sellerIconStore} />
                  ) : (
                    <Image source={loginStoreIcon} />
                  )}
                </View>
                <Text style={styles.sellerText}>Seller</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={()=>handleSubmit()}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('registerScreen')}>
                <Text style={styles.registerButtonText}>Register Now?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
  },
  bgContainer: {
    // flex: 1,
    width: responsiveWidth(100),
    height: responsiveWidth(100),
    flexDirection: 'row',
  },
  bannerContainer: {
    width: responsiveWidth(50),
    height: responsiveWidth(100),
    position: 'absolute',
    right: 0,
    top: 60,
  },
  loginWelcomeBack: {
    zIndex: 999,
    position: 'absolute',
    top: responsiveHeight(28),
    left: responsiveWidth(4),
  },
  title: {
    fontSize: responsiveFontSize(7),
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: fonts.bai.regular,
  },
  subTitle: {
    fontSize: responsiveFontSize(2.4),
    marginLeft: 5,
    color: colors.white,
    fontFamily: fonts.bai.medium,
    fontWeight: '700',
  },
  loginForm: {
    flex: 1,
    marginHorizontal: 25,
    marginVertical: 20,
    // width:responsiveWidth(100),
    // height: responsiveHeight(100),
  },
  codesMobileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // borderColor: colors.lightTextColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightTextColor,
    // borderRadius: 5,
    paddingVertical: 10,
    // width: responsiveWidth(100),
  },
  mobileInputContainer: {
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 10,
    // gap:10,
    // width: responsiveWidth(80),
    // borderColor: colors.lightTextColor,
    // borderRadius: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 10
  },
  mobileInput: {
    flex: 1,
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(2.5),
    fontWeight: '600',
  },
  passwordInputContainer: {},
  passwordInputTitle: {
    marginVertical: 15,
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: colors.black,
  },
  forgotPasscode: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: colors.red,
    alignSelf: 'flex-end',
    marginVertical: 15,
  },
  customerSellerContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    marginVertical:10
  },
  customerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    justifyContent: 'center',
  },
  customerIconContainer: {
    // backgroundColor: colors.red,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  customerIcon: {
    color: colors.white,
    fontSize: 20,
  },
  customerText: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: colors.black,
  },

  iconStyle: {
    color: colors.white,
    fontSize: 20,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    justifyContent: 'center',
  },
  sellerIconContainer: {
    backgroundColor: colors.lightTextColor,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  sellerIcon: {
    color: colors.white,
    // fontSize: 18,
  },
  sellerText: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: colors.black,
  },
  loginButton: {
    backgroundColor: colors.red,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // height: 50,
    marginTop: 20,
    shadowColor: colors.red,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
    fontWeight:'700'
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
  },
  registerButton: {
    marginVertical: 5,
    textAlign: 'center',
  },
  registerButtonText: {
    color: colors.black,
    fontSize: responsiveFontSize(2.2),
    fontFamily: fonts.montserrat.semiBold,
  },
  errorText: {
    color: colors.red,
    fontSize: responsiveFontSize(2),
    marginTop: 5,
  },
});

export default LoginScreen;
