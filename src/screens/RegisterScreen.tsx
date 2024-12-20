import React, {useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {registerBg} from '../assets';
import {
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CountryCodes from '../components/CountryCodes';
import {colors} from '../constants/Colors';
import {fonts} from '../constants/Fonts';
import PhoneIcon from 'react-native-vector-icons/MaterialIcons';
import UserIcon from 'react-native-vector-icons/MaterialIcons';
import EmailIcon from 'react-native-vector-icons/MaterialIcons';
import {OtpInput} from 'react-native-otp-entry';
import RNPickerSelect from 'react-native-picker-select';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {registerUser, User} from '../redux/slices/AuthSlice';
import {AppDispatch} from '../redux/store/store';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface RegisterScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

interface Values {
  state: string;
  name: string;
  mobile_no: string;
  email: string;
  password: string;
  country_code: string;
  role: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  mobileNumber: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number is not valid'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  passcode: Yup.string()
    .required('Passcode is required')
    .min(6, 'Passcode must be at least 6 digits'),
  confirmPasscode: Yup.string()
    .oneOf([Yup.ref('passcode')], 'Passcodes must match')
    .required('Confirm passcode is required'),
  state: Yup.string().required('State is required'),
  termsAgreement: Yup.boolean().oneOf(
    [true],
    'You must agree to the terms and conditions',
  ),
});

const RegisterScreen = ({navigation}: RegisterScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedState, setSelectedState] = useState(null);
  const [countryCode, setCountryCode] = useState('+91');

  const handleSubmit = async (values: any) => {

    const userData = {
      name: values.name,
      mobile_no: values.mobileNumber,
      email: values.email,
      password: values.passcode,
      country_code: countryCode,
      state: values.state,
      role: 'CUSTOMER',
    };
    const signupUser = await dispatch(registerUser(userData));

    // @ts-ignore
    if (signupUser?.error?.message != 'Rejected') {
      const otpData = {
        mobile_no: userData.mobile_no,
        country_code: userData.country_code,
      };

      await AsyncStorage.setItem('otpInfo', JSON.stringify(otpData));

      Toast.show({
        type: 'success',
        text1: 'Signup Successful🤩🥳.',
      });

      
      navigation.navigate('otpScreen',{otpData})
    } else {
      Toast.show({
        type: 'error',
        text1: 'Signup failed! Please try again.',
        text2: signupUser?.payload 
      });
    }
  };

  return (
    <ScrollView bounces={false} overScrollMode='never'>
      <View style={styles.registerContainer}>
        <StatusBar
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
          barStyle={'light-content'}
        />
        <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Image source={registerBg} style={styles.bgContainer} />
        </TouchableOpacity>
        <Formik
          initialValues={{
            name: '',
            mobileNumber: '',
            email: '',
            passcode: '',
            confirmPasscode: '',
            state: '',
            termsAgreement: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={styles.registerForm}>
              <View style={styles.nameContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor={colors.black}
                    style={styles.input}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  <UserIcon
                    name="person"
                    size={20}
                    color={colors.lightTextColor}
                    style={styles.iconStyle}
                  />
                </View>
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              <View style={styles.codesMobileInputContainer}>
                <CountryCodes setCountryCode={setCountryCode} />
                <View style={styles.mobileInputContainer}>
                  <TextInput
                    placeholder="Mobile No"
                    placeholderTextColor={colors.black}
                    style={styles.input}
                    keyboardType="number-pad"
                    onChangeText={handleChange('mobileNumber')}
                    onBlur={handleBlur('mobileNumber')}
                    value={values.mobileNumber}
                    maxLength={10}
                  />
                  <PhoneIcon
                    name="phone"
                    size={20}
                    color={colors.lightTextColor}
                  />
                </View>
                {touched.mobileNumber && errors.mobileNumber && (
                  <Text style={styles.errorText}>{errors.mobileNumber}</Text>
                )}
              </View>

              <View style={styles.emailContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={colors.black}
                    style={styles.input}
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email.toLowerCase()}
                  />
                  <EmailIcon
                    name="email"
                    size={20}
                    color={colors.lightTextColor}
                    style={styles.iconStyle}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.passwordInputContainer}>
                <Text style={styles.passwordInputTitle}>Passcode</Text>
                <OtpInput
                  numberOfDigits={6}
                  focusColor="green"
                  onTextChange={handleChange('passcode')}
                  onFilled={text => setFieldValue('passcode', text)}
                  secureTextEntry={true}
                />
                {touched.passcode && errors.passcode && (
                  <Text style={styles.errorText}>{errors.passcode}</Text>
                )}
              </View>

              <View style={styles.passwordInputContainer}>
                <Text style={styles.passwordInputTitle}>Confirm Passcode</Text>
                <OtpInput
                  numberOfDigits={6}
                  focusColor="green"
                  onTextChange={handleChange('confirmPasscode')}
                  onFilled={text => setFieldValue('confirmPasscode', text)}
                  secureTextEntry={true}
                />
                {touched.confirmPasscode && errors.confirmPasscode && (
                  <Text style={styles.errorText}>{errors.confirmPasscode}</Text>
                )}
              </View>

              <View style={styles.stateDropdown}>
                <RNPickerSelect
                  placeholder={{
                    label: 'State',
                    value: null,
                    // color: colors.black,
                  }}
                  onValueChange={value => {
                    setFieldValue('state', value);
                    setSelectedState(value);
                  }}
                  items={[
                    {label: 'Maharashtra', value: 'Maharashtra'},
                    {label: 'Telangana', value: 'Telangana'},
                    {label: 'Gujarat', value: 'Gujarat'},
                  ]}
                  value={values.state}
                  style={{
                    inputIOS: {
                      color: colors.black, 
                    },
                    inputAndroid: {
                      color: colors.black,
                    },
                    placeholder: {
                      color: colors.black,
                    },
                  }}
                />
                {touched.state && errors.state && (
                  <Text style={styles.errorText}>{errors.state}</Text>
                )}
              </View>

              <View style={styles.termsConditionContainer}>
                <BouncyCheckbox
                  isChecked={values.termsAgreement}
                  fillColor={colors.red}
                  onPress={() =>
                    setFieldValue('termsAgreement', !values.termsAgreement)
                  }
                  iconStyle={{
                    borderRadius: 0,
                    width: 25,
                    height: 25,
                  }}
                  size={25}
                />
                <TouchableOpacity>
                  <Text style={styles.termsText}>
                    Agree to Terms & Conditions
                  </Text>
                </TouchableOpacity>
              </View>
              {touched.termsAgreement && errors.termsAgreement && (
                <Text style={styles.errorText}>{errors.termsAgreement}</Text>
              )}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => handleSubmit()}>
                <Text style={styles.loginButtonText}>REGISTER NOW</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
  },
  bgContainer: {},
  registerForm: {
    flex: 1,
    marginHorizontal: 25,
  },
  nameContainer: {
    marginVertical: Platform.OS === 'ios' ? 12 : 5,
  },
  emailContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightTextColor,
    paddingVertical: Platform.OS === 'ios' ? 20 : 15,
  },
  input: {
    flex: 1,
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(2.5),
    marginLeft: 10,
  },
  codesMobileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightTextColor,
    paddingVertical: Platform.OS === 'ios' ? 20 : 12,
  },
  mobileInputContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: 10,
  },
  passwordInputContainer: {},
  passwordInputTitle: {
    marginVertical: 15,
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(2.2),
    color: colors.black,
  },
  stateDropdown: {
    marginVertical: 15,
  },
  termsConditionContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  termsText: {
    fontSize: responsiveFontSize(2),
  },
  loginButton: {
    backgroundColor: colors.green,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  loginButtonText: {
    fontSize: responsiveFontSize(2),
    color: colors.white,
    fontFamily: fonts.montserrat.bold,
  },
  errorText: {
    fontSize: responsiveFontSize(1.8),
    color: colors.red,
  },
});

export default RegisterScreen;
