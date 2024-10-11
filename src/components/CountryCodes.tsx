import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {fonts} from '../constants/Fonts';

import { colors } from "../constants/Colors";

const CountryCodes = () => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [flag, setFlag] = useState("🇮🇳");

  useEffect(() => {
    setCountryCode("+91");
    setFlag("🇮🇳");
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.touchable}>
        {flag ? <Text>{flag}</Text> : null}
        <Text style={styles.countryCode}>
          {countryCode || "Select Country"}
        </Text>
        <MaterialIcons
          name={"arrow-drop-down"}
          color={colors.black}
          size={20}
        />
        <View
          style={{
            width: 1.5,
            height: "100%",
            backgroundColor: colors.lightTextColor,
          }}
        />
      </TouchableOpacity>

      {show && (
        <CountryPicker
          show={show}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setFlag(item.flag);
            setShow(false);
          }}
          popularCountries={["en", "ua", "pl"]}
          lang="en"
          style={{
            modal: {
              height: responsiveHeight(50),
              width: responsiveWidth(90),
              alignSelf: "center",
              backgroundColor: colors.white,
              borderRadius: 10,
              overflow: "hidden",
            },
            backdrop: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },

            itemsList: {
              maxHeight: responsiveHeight(70),
            },
            textInput: {
              height: 40,
              borderRadius: 5,
              borderColor: colors.lightTextColor,
              borderWidth: 1,
              paddingHorizontal: 10,
            },
            countryButtonStyles: {
              height: 60,
              justifyContent: "center",
              padding: 10,
            },
            searchMessageText: {
              color: "gray",
            },
            countryMessageContainer: {
              padding: 10,
            },
            flag: {
              fontSize: 20,
            },
            dialCode: {
              fontSize: 16,
            },
            countryName: {
              fontSize: 16,
              color: "black",
            },
          }}
        />
      )}
    </View>
  );
};

export default CountryCodes;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(30),
  },
  touchable: {
    flexDirection: "row",
    padding: 5,
    borderRadius: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    width: responsiveWidth(90),
    gap: 10,
  },
  countryCode: {
    color: colors.black,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.montserrat.semiBold,
  },
});
