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
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileScreenProps {
  navigation: any;
  AuthCheck: ()=> void;
}

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

const ProfileScreen = ({navigation, AuthCheck}: ProfileScreenProps) => {
    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    const handleToggleBtn = async (item: ProfileScreenData) => {
        try {
          setSelectedButton(item.id);
      
          if (item.title === 'Logout') {
            await AsyncStorage.removeItem('loginToken');
            
            const token = await AsyncStorage.getItem('loginToken');
            if (!token) {
              console.log('Token successfully removed');
            AuthCheck();
            } else {
              console.log('Token removal failed');
            }
            return;
          }
      
          navigation.navigate(item.title);
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };
      
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
          <TouchableOpacity style={styles.orderContainer} onPress={() => navigation.navigate('order')}>
            <Image source={Bag} style={styles.orderIcon} />
            <Text style={styles.orderText}>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editContainer} onPress={() => navigation.navigate('editProfile')}>
            <Image source={PersonIcon} style={styles.editIcon} />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteContainer} onPress={() => navigation.navigate('favorite')}>
            <HeartIcon name="heart" size={20} color={colors.red} />
            <Text style={styles.favoriteText}>Favorite</Text>
          </TouchableOpacity>
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
    padding: 18,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.4,
    borderBottomColor: colors.textColor,
    gap: 15,
  },
  itemText: {
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
    fontSize: responsiveFontSize(2.5),
  },
  iconContainer: {
    width: 40, 
    height: 40, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.redPink,
    borderRadius: 20, 
  },
});

export default ProfileScreen;
