import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ForgetPasscodeBanner, QuestionMark} from '../assets';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LeftArrowIcon from 'react-native-vector-icons/AntDesign';
import {colors} from '../constants/Colors';
import {fonts} from '../constants/Fonts';
import PhoneIcon from 'react-native-vector-icons/MaterialIcons';

// Yup validation schema
const validationSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required'),
});

const ForgetPasscodeScreen = ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <View style={styles.forgetPasscodeContainer}>
        <ImageBackground source={ForgetPasscodeBanner} style={styles.topView}>
          <TouchableOpacity>
            <LeftArrowIcon name="left" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.forgetPasscodeText}>Forget Passcode</Text>
        </ImageBackground>
        <Image source={QuestionMark} style={styles.questionMarkContainer} />
      </View>

      <Formik
        initialValues={{mobileNumber: ''}}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log('Form values', values);
        //   navigation.navigate('');
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.mobileInputContainer}>
            <Text style={styles.mobileNumberText}>Mobile No</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Mobile Number"
                style={styles.mobileInput}
                onChangeText={handleChange('mobileNumber')}
                onBlur={handleBlur('mobileNumber')}
                value={values.mobileNumber}
                keyboardType="numeric"
              />
              <PhoneIcon name="phone" size={20} color={colors.lightTextColor} />
            </View>
            {touched.mobileNumber && errors.mobileNumber && (
              <Text style={styles.errorText}>{errors.mobileNumber}</Text>
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={()=>handleSubmit()}
            >
              <Text style={styles.submitButtonText}>SEND OTP</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    width: responsiveWidth(100),
    height: responsiveWidth(40),
    opacity: 1,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  forgetPasscodeContainer: {
    alignItems: 'center',
    gap: 40,
  },
  forgetPasscodeText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  questionMarkContainer: {},
  mobileInputContainer: {
    gap: 15,
    marginHorizontal: 20,
    marginVertical: 35,
  },
  mobileNumberText: {
    color: colors.black,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.montserrat.semiBold,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightTextColor,
    borderRadius: 10,
    padding: Platform.OS === 'ios' ? 15 : 9,
    width: responsiveWidth(80),
  },
  mobileInput: {
    color: colors.textColor,
    fontFamily: fonts.montserrat.regular,
    fontSize: responsiveFontSize(1.7),
    width: responsiveWidth(70),
    margin: Platform.OS === 'ios' ? -4 : -2,
  },
  submitButton: {
    backgroundColor: colors.green,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 160,
    shadowColor: colors.green,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  errorText: {
    color: 'red',
    fontSize: responsiveFontSize(1.8),
    marginTop: 5,
  },
});

export default ForgetPasscodeScreen;