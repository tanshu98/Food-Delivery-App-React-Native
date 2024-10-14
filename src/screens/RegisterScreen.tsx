import React, {useState} from 'react';
import {
  Image,
  Platform,
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
  responsiveWidth,
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
import KeyboardWrapper from '../components/KeyboardWrapper';

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  mobileNumber: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number is not valid'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  passcode: Yup.string().required('Passcode is required').min(6, 'Passcode must be at least 6 digits'),
  confirmPasscode: Yup.string()
    .oneOf([Yup.ref('passcode')], 'Passcodes must match')
    .required('Confirm passcode is required'),
  state: Yup.string().required('State is required'),
  termsAgreement: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
});

const RegisterScreen = ({navigation}: any) => {
  const [selectedState, setSelectedState] = useState(null);

  return (
    <KeyboardWrapper>
      <View style={styles.registerContainer}>
        <StatusBar
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
          barStyle={'light-content'}
        />
        <Image source={registerBg} style={styles.bgContainer} />

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
          onSubmit={values => {
            console.log(values);
            navigation.navigate('loginScreen');
          }}>
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
                <CountryCodes />
                <View style={styles.mobileInputContainer}>
                  <TextInput
                    placeholder="Mobile No"
                    placeholderTextColor={colors.black}
                    style={styles.input}
                    keyboardType="number-pad"
                    onChangeText={handleChange('mobileNumber')}
                    onBlur={handleBlur('mobileNumber')}
                    value={values.mobileNumber}
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
                    value={values.email}
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
                />
                {touched.confirmPasscode && errors.confirmPasscode && (
                  <Text style={styles.errorText}>{errors.confirmPasscode}</Text>
                )}
              </View>

              <View style={styles.stateDropdown}>
                <RNPickerSelect
                  placeholder={{
                    label: 'Select State',
                    value: null,
                    color: colors.black,
                  }}
                  onValueChange={value => {
                    setFieldValue('state', value);
                    setSelectedState(value);
                  }}
                  items={[
                    {label: 'State 1', value: 'state1'},
                    {label: 'State 2', value: 'state2'},
                    {label: 'State 3', value: 'state3'},
                  ]}
                  value={values.state}
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
                    width:25,
                    height:25,
                  }}
                  size={25}
                />
                <TouchableOpacity>
                  <Text style={styles.termsText}>Agree to Terms & Conditions</Text>
                </TouchableOpacity>
              </View>
              {touched.termsAgreement && errors.termsAgreement && (
                <Text style={styles.errorText}>{errors.termsAgreement}</Text>
              )}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={()=>handleSubmit()}>
                <Text style={styles.loginButtonText}>REGISTER NOW</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardWrapper>
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
    marginVertical: Platform.OS === 'ios' ? 12 : 5

  },
  emailContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightTextColor,
    paddingVertical: Platform.OS === 'ios' ? 20 : 15
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
