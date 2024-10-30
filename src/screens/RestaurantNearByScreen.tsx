import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {
  KshatriyaRestaurant,
  NandiniRestaurant,
  GoldenFishRestaurant,
} from '../assets';
import {colors} from '../constants/Colors';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {fonts} from '../constants/Fonts';
import RightArrowIcon from 'react-native-vector-icons/AntDesign';
import LocationIcon from 'react-native-vector-icons/Entypo';
import StarIcon from 'react-native-vector-icons/Entypo';
import StarOutlinedIcon from 'react-native-vector-icons/Entypo';
import {
  getRestaurantNearby,
  RestaurantNearbyProduct,
} from '../redux/slices/HomeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store/store';

interface IProps {
  navigation: any;
}

const RestaurantNearByScreen = ({navigation}: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {RestaurantNearbyProducts, error, loading} = useSelector(
    (state: RootState) => state.HomeSlice,
  );

  useEffect(() => {
    dispatch(getRestaurantNearby());
  },[dispatch]);

  const renderItem = ({item}: {item: RestaurantNearbyProduct}) => (
    <View style={styles.itemContainer} >
        <TouchableOpacity onPress={()=> navigation.navigate('nearbyRestaurantScreen', {buisnessId: item._id})}>
      <Image source={GoldenFishRestaurant} style={styles.itemImage} />
      <View style={styles.itemDetailsContainer}>
        <Text style={styles.itemTitle}>{item.businessName}</Text>
        <View style={styles.distanceRatingContainer}>
          <View style={styles.distanceContainer}>
            <LocationIcon name="location-pin" size={20} color={colors.red} />
            <Text style={styles.distanceText}>{item.distance}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <StarIcon name="star" size={20} color={colors.lightYellow} />
          </View>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{item.businessName}</Text>
        </View>
      </View>
      </TouchableOpacity>

    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={RestaurantNearbyProducts}
          renderItem={renderItem}
          keyExtractor={(item: RestaurantNearbyProduct) => item._id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  restaurantNearbyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  restaurantNearbyText: {
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
    gap: 10,
  },
  itemContainer: {
    flexDirection: 'column',
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    shadowColor: colors.lightYellow,
  },
  itemImage: {
    width: responsiveWidth(90),
    height: responsiveWidth(60),
    borderRadius: 20,
    marginHorizontal: 10,
  },
  itemDetailsContainer: {
    gap: 5,
    marginHorizontal: 20,
  },
  itemTitle: {
    color: colors.black,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  distanceRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    color: colors.red,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.montserrat.semiBold,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressContainer: {
    width: responsiveWidth(65),
  },
  addressText: {
    color: colors.lightTextColor,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.montserrat.semiBold,
    marginVertical: 10,
  },
});

export default RestaurantNearByScreen;
