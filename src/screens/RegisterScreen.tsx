import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
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
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CountryCodes from '../components/CountryCodes';
import {colors} from '../constants/Colors';
import {fonts} from '../constants/Fonts';
import PhoneIcon from 'react-native-vector-icons/MaterialIcons';
import UserIcon from 'react-native-vector-icons/MaterialIcons';
import EmailIcon from 'react-native-vector-icons/MaterialIcons';
import {OtpInput} from 'react-native-otp-entry';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const RegisterScreen = ({navigate}: any) => {
  const [selectedState, setSelectedState] = useState(null);
  return (
    <View style={styles.registerContainer}>
      <StatusBar
        backgroundColor={'rgba(0,0,0,0)'}
        translucent={true}
        barStyle={'light-content'}
      />
      <Image source={registerBg} style={styles.bgContainer} />
      <View style={styles.registerForm}>
        <View style={styles.nameContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Name"
              placeholderTextColor={colors.black}
              style={styles.input}
              // onChangeText={handleChange('name')}
              // value={name}
            />
            <UserIcon
              name="person"
              size={20}
              color={colors.lightTextColor}
              style={styles.iconStyle}
            />
          </View>
        </View>

        {/* Mobile Input Field */}
        <View style={styles.codesMobileInputContainer}>
          <CountryCodes />
          <View style={styles.mobileInputContainer}>
            <TextInput
              placeholder="Mobile No"
              placeholderTextColor={colors.black}
              style={styles.input}
              keyboardType="number-pad"
              // onChangeText={handleChange('mobileNumber')}
              // value={mobileNumber}
            />
            <PhoneIcon name="phone" size={20} color={colors.lightTextColor} />
          </View>
        </View>

        {/* Email Input Field */}
        <View style={styles.emailContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={colors.black}
              style={styles.input}
              keyboardType="email-address"
              // onChangeText={handleChange('email')}
              // value={email}
            />
            <EmailIcon
              name="email"
              size={20}
              color={colors.lightTextColor}
              style={styles.iconStyle}
            />
          </View>
        </View>
        <View style={styles.passwordInputContainer}>
          <Text style={styles.passwordInputTitle}>Passcode</Text>
          <OtpInput
            numberOfDigits={6}
            focusColor="green"
            // onTextChange={handleChange('passcode')}
            onFilled={text => console.log(`OTP is ${text}`)}
          />
          {/* {touched.passcode && errors.passcode && (
                  <Text style={styles.errorText}>{errors.passcode}</Text>
                )} */}
        </View>
        <View style={styles.passwordInputContainer}>
          <Text style={styles.passwordInputTitle}>Confirm Passcode</Text>
          <OtpInput
            numberOfDigits={6}
            focusColor="green"
            // onTextChange={handleChange('passcode')}
            onFilled={text => console.log(`OTP is ${text}`)}
          />
          {/* {touched.passcode && errors.passcode && (
                  <Text style={styles.errorText}>{errors.passcode}</Text>
                )} */}
        </View>
        <View style={styles.stateDropdown}>
          <RNPickerSelect
            placeholder={{
              label: 'Select State',
              value: null,
              color: colors.black,
            }}
            onValueChange={value => setSelectedState(value)}
            items={[
              {label: 'State 1', value: 'state1'},
              {label: 'State 2', value: 'state2'},
              {label: 'State 3', value: 'state3'},
            ]}
          />
        </View>
        <View style={styles.termsConditionContainer}>
          <BouncyCheckbox
            // isChecked={isChecked}
            fillColor={colors.red}
            // onPress={handleCheckBoxChange}
            iconStyle={{
              borderRadius: 45,
            }}
          />
          <TouchableOpacity>
            <Text style={styles.termsText}>Agree Terms & conditions</Text>
          </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity
                style={styles.loginButton}
                onPress={() =>console.log('Login Pressed')}>
                <Text style={styles.loginButtonText}>LOGIN</Text>
              </TouchableOpacity>
              </View>
      </View>
    </View>
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
    marginVertical: 20,
  },
  nameContainer: {
    // marginBottom: 20, // Space between fields
    marginVertical: 15,
  },
  emailContainer: {
    marginBottom: 20, // Space between fields
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightTextColor,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(2.5),
    marginLeft: 10, // Space between icon and input field
  },
  codesMobileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightTextColor,
    paddingVertical: 5,
  },
  mobileInputContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    // marginLeft: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
  passwordInputContainer: {},
  passwordInputTitle: {
    marginVertical: 15,
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(2.2),
    // fontWeight: '600',
    color: colors.black,
  },
  forgotPasscode: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(2.2),
    // fontWeight: '600',
    color: colors.red,
    alignSelf: 'flex-end',
    marginVertical: 15,
  },
  stateDropdown: {
    marginVertical: 15,
  },
  termsConditionContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  termsText: {
    // color: colors.darkBlue,
    fontSize: responsiveFontSize(2),
  },
  loginButton: {
    backgroundColor: colors.green,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // height: 50,
    marginTop: 15,
    shadowColor: colors.green,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
    // fontWeight:'700'
  },
});

export default RegisterScreen;
