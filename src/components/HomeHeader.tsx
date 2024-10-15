import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {ProfileIcon} from '../assets';
import LocationIcon from 'react-native-vector-icons/Entypo';
import NotificationIcon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../constants/Colors';
import { fonts } from '../constants/Fonts';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { Badge } from 'react-native-paper';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={ProfileIcon} />
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Hi, Sachin</Text>
        <View style={styles.locationContainer}>
          <LocationIcon name="location-pin" size={20} color={colors.lightTextColor} />
          <Text style={styles.locationText}>Nagpur, Maharashtra</Text>
        </View>
      </View>
      <NotificationIcon name="notifications-none" size={35} color={colors.black} style={styles.notificationIcon} />
      <Badge style={styles.badge} size={20}>3</Badge>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 5,
  },
  headerTextContainer: {
    flexDirection: 'column',
    gap: Platform.OS === 'ios' ? 5 : 0,
    marginRight: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  headerText: {
    color: colors.black,
    fontFamily: fonts.bai.black,
    fontSize: responsiveFontSize(2.5),
  },
  locationText: {
    color: colors.textColor,
    fontFamily: fonts.montserrat.bold,
    fontSize: responsiveFontSize(2),
  },
  notificationIcon: {
    marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
  badge: {
    backgroundColor: colors.red,
    color: colors.white,
    height:20,
    width:20,
    borderRadius:7,
    fontSize: 10,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 33 : 32,
    right: Platform.OS === 'ios' ? 28 : 32,
  },
});

export default HomeHeader;
