import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Bag, ProfileIcon, PersonIcon} from '../assets';
import LocationIcon from 'react-native-vector-icons/Entypo';
import HeartIcon from 'react-native-vector-icons/AntDesign';

import {colors} from '../constants/Colors';
import {fonts} from '../constants/Fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BottomBarHome from 'react-native-vector-icons/Foundation';
import OffersIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocsIcon from 'react-native-vector-icons/Ionicons';
import MessageAlertIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoutIcon from 'react-native-vector-icons/MaterialIcons';

interface ProfileScreenData {
  id: number;
  icon: string;
  title: string;
}

const DATA: ProfileScreenData[] = [
  {
    id: 1,
    icon: 'home',
    title: 'Home',
  },
  {
    id: 2,
    icon: 'brightness-percent',
    title: 'Offers',
  },
  {
    id: 3,
    icon: 'message-alert',
    title: 'Privacy Policy',
  },
  {
    id: 4,
    icon: 'document-text',
    title: 'Term and Condition',
  },

  {
    id: 5,
    icon: 'logout',
    title: 'Logout',
  },
];

const getIconComponent = (iconName: string, color: string, size: number) => {
  switch (iconName) {
    case 'home':
      return <BottomBarHome name="home" size={size} color={color} />;
    case 'brightness-percent':
      return <OffersIcon name="brightness-percent" size={size} color={color} />;
    case 'message-alert':
      return (
        <MessageAlertIcon name="message-alert" size={size} color={color} />
      );
    case 'document-text':
      return <DocsIcon name="document-text" size={size} color={color} />;
    case 'logout':
      return <LogoutIcon name="logout" size={size} color={color} />;
    default:
      return null;
  }
};

const ProfileScreen = ({navigation}: any) => {
    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    const handleToggleBtn = (item: ProfileScreenData) => {
        setSelectedButton(item.id); // Set the clicked button as the selected button
    //   navigation.navigate(item.title)
    }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileHeaderContainer}>
          <Image source={ProfileIcon} style={styles.profileIcon} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Hi, Sachin</Text>
            <View style={styles.locationContainer}>
              <LocationIcon
                name="location-pin"
                size={20}
                color={colors.lightTextColor}
              />
              <Text style={styles.locationText}>Nagpur, Maharashtra</Text>
            </View>
          </View>
        </View>
        <View style={styles.orderEditProfile}>
          <View style={styles.orderContainer}>
            <Image source={Bag} style={styles.orderIcon} />
            <Text style={styles.orderText}>Order</Text>
          </View>
          <View style={styles.editContainer}>
            <Image source={PersonIcon} style={styles.editIcon} />
            <Text style={styles.editText}>Edit Profile</Text>
          </View>
          <View style={styles.favoriteContainer}>
            <HeartIcon name="heart" size={20} color={colors.red} />
            <Text style={styles.favoriteText}>Favorite</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          {DATA.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemContainer}
              onPress={() => handleToggleBtn(item)}>
                <View style={[styles.iconContainer, {backgroundColor: selectedButton === item.id ? colors.red : colors.pink}]}>
              {getIconComponent(item.icon,  selectedButton === item.id ? colors.white : colors.redPink, 20)}

                </View>
              <Text style={[styles.itemText,{color: selectedButton === item.id ? colors.red : colors.black}]}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,

    height: responsiveHeight(100),
    // paddingRight: 10,
    // gap:10
    // alignItems: 'center',
  },
  profileHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    alignItems: 'center',
  },
  profileIcon: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  headerTextContainer: {
    flexDirection: 'column',
    gap: Platform.OS === 'ios' ? 6 : -1,

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
  orderEditProfile: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    padding: 20,
    gap: 15,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    shadowColor: colors.lightYellow,
  },
  orderContainer: {
    // backgroundColor: colors.red,
    padding: 12,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.lightTextColor,
    gap: 5,
    marginLeft: 7,
    // borderWidth: 1,
  },
  orderIcon: {
    width: 26,
    height: 26,
  },
  orderText: {
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
    fontSize: responsiveFontSize(2),
  },
  editContainer: {
    padding: 12,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.lightTextColor,
    gap: 5,
  },
  editIcon: {
    width: 26,
    height: 26,
  },
  editText: {
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
    fontSize: responsiveFontSize(2),
  },
  favoriteContainer: {
    padding: 12,
    alignItems: 'center',
    gap: 5,
  },
  favoriteIcon: {
    width: 26,
    height: 26,
  },
  favoriteText: {
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
    fontSize: responsiveFontSize(2),
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    // marginHorizontal: 10,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // marginVertical: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: colors.textColor,
    gap: 15,
    // borderRadius: 20,
    // shadowOffset: {width: 2, height: 2},
    // shadowOpacity: 0.5,
    // shadowRadius: 15,
    // elevation: 10,
    // shadowColor: colors.lightYellow,
  },
  itemText: {
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
    fontSize: responsiveFontSize(2.5),
  },
  iconContainer: {
    width: 40, // increase width and height for better visibility
    height: 40, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.redPink, // your desired background color
    borderRadius: 20, // make it circular
    // color: colors.redPink
  },
});

export default ProfileScreen;
