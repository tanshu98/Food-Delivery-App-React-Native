import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';
import OfferScreen from '../screens/OfferScreen';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/Colors';
import BottomBarHome from 'react-native-vector-icons/Foundation';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import CartIcon from 'react-native-vector-icons/FontAwesome6';
import OffersIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveWidth } from 'react-native-responsive-dimensions';





const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const screenOptions = {
    headerShown: false,
    tabBarStyle: styles.navigatorOptions,
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, color, focused }) => (
            focused ? (
              <View style={styles.eachTabStyleFocused}>
                <BottomBarHome name="home" size={size} color={colors.white} />
                <Text style={styles.eachTabHeaderFocused}>Home</Text>
              </View>
            ) : (
              <BottomBarHome name="home" size={size} color={color} />
            )
          ),
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Search"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, color, focused }) => (
            focused ? (
              <View style={styles.eachTabStyleFocused}>
                <SearchIcon name="search1" size={size} color={colors.white} />
                <Text style={styles.eachTabHeaderFocused}>Cart</Text>
              </View>
            ) : (
              <SearchIcon name="search1" size={size} color={color} />
            )
          ),
        }}
        component={SearchScreen}
      />

      <Tab.Screen
        name="Cart"
        options={{

          tabBarLabel: '',
          tabBarIcon: ({ size, color, focused }) => (
            focused ? (
              <View style={styles.eachTabStyleFocused}>
                <CartIcon name="cart-shopping" size={size} color={colors.white} />
                <Text style={styles.eachTabHeaderFocused}>Category</Text>
              </View>
            ) : (
              <CartIcon name="cart-shopping" size={size} color={color} />
            )
          ),
        }}
        component={CartScreen}
      />

      <Tab.Screen
        name="Offers"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, color, focused }) => (
            focused ? (
              <View style={styles.eachTabStyleFocused}>
                <OffersIcon name="brightness-percent" size={size} color={colors.white} />
                <Text style={styles.eachTabHeaderFocused}>Profile</Text>
              </View>
            ) : (
              <OffersIcon name="brightness-percent" size={size} color={color} />
            )
          ),
        }}
        component={OfferScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  eachTabStyleFocused: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 50,
    width: responsiveWidth(30),
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 40,
    justifyContent: 'space-around',
  },
  eachTabHeaderFocused: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
    // lineHeight: 17.7,
  },
  navigatorOptions: {
    backgroundColor: colors.white,
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    paddingHorizontal: 25,
    height: Platform.OS === 'ios' ? 100 : 90,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default BottomTabNavigation;
