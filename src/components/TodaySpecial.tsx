import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../constants/Colors';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {fonts} from '../constants/Fonts';
import RightArrowIcon from 'react-native-vector-icons/AntDesign';
import {VegDumBiryani} from '../assets';
import BellIcon from 'react-native-vector-icons/FontAwesome5';
import {TodaySpecials} from '../redux/slices/HomeSlice';
interface IProps {
  navigation?: any;
  data: any;
  handleNavigate?: () => void;
  disableText?: boolean;
}

export const TodaySpecial = ({data, handleNavigate, disableText}: IProps) => {
  const renderItem = ({item}: {item: TodaySpecials}) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={VegDumBiryani} style={styles.itemImage} />
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>₹{item.discountPrice}</Text>
            <Text style={styles.oldPrice}>₹{item.price}</Text>
          </View>
          <View style={styles.restaurantContainer}>
            <BellIcon
              name="concierge-bell"
              size={20}
              color={colors.lightTextColor}
            />
            <Text style={styles.restaurantName}>{item.category}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      {data.length > 0 && (
        <View style={styles.container}>
          {!disableText && (
            <View style={styles.todaysSpecialContainer}>
              <Text style={styles.todaysSpecialText}> Today's Special</Text>
              <TouchableOpacity
                style={styles.viewAllContainer}
                onPress={handleNavigate}>
                <Text style={styles.viewAllText}>View All</Text>
                <RightArrowIcon
                  name="arrowright"
                  size={20}
                  color={colors.green}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.listContainer}>
            <FlatList
              data={data.slice(0, 5)}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todaysSpecialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todaysSpecialText: {
    color: colors.black,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
    marginHorizontal: 10,
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 15,
  },
  viewAllText: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.bai.semiBold,
  },
  listContainer: {
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    // padding:10,
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    shadowColor: colors.lightYellow,
  },
  itemImage: {
    width: responsiveWidth(25),
    height: responsiveWidth(25),
  },
  itemDetailsContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  itemTitle: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.bai.semiBold,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  currentPrice: {
    color: colors.red,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.bai.semiBold,
  },
  oldPrice: {
    color: colors.red,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.montserrat.regular,
    textDecorationLine: 'line-through',
  },
  restaurantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  restaurantName: {
    color: colors.lightTextColor,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.bai.semiBold,
  },
});

export default TodaySpecial;
