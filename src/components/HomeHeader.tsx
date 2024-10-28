import React, { useEffect, useState } from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ProfileIcon} from '../assets';
import LocationIcon from 'react-native-vector-icons/Entypo';
import NotificationIcon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../constants/Colors';
import { fonts } from '../constants/Fonts';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { Badge } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HomeHeaderProps {
    navigation: any;
}   

const HomeHeader = ({navigation}: any) => {

    const [token, setToken] = useState<string | null>(null); 
    const [userName, setUserName] = useState<string>('');

    const loginToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('loginUserData');
            // console.log('token', storedToken);
            setToken(storedToken);
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
   
    }

    useEffect(()=> {
        loginToken();
    })

    useEffect(() => {
        if (token) {
            try {
                const user = JSON.parse(token);
                if (user && user.full_name) {
                    setUserName(`${user.full_name.charAt(0).toUpperCase()}${user.full_name.slice(1)}`);
                } else {
                    setUserName(''); 
                }
            } catch (error) {
                console.error('Error parsing token:', error);
            }
        }
    }, [token]); 
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('profileScreen')}>
      <Image source={ProfileIcon} />
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Hi, {userName}</Text>
        <View style={styles.locationContainer}>
          <LocationIcon name="location-pin" size={20} color={colors.lightTextColor} />
          <Text style={styles.locationText}>Nagpur, Maharashtra</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('notificationScreen')}>
      <NotificationIcon name="notifications-none" size={35} color={colors.black} style={styles.notificationIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
paddingRight: 10,
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
