import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {
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
import {
  getRestaurantNearby,
  RestaurantNearbyProduct,
} from '../redux/slices/HomeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store/store';

interface IProps {
  navigation: any;
}

const RestaurantNearby = ({navigation}: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {RestaurantNearbyProducts} = useSelector(
    (state: RootState) => state.HomeSlice,
  );

  useEffect(() => {
    dispatch(getRestaurantNearby());
  }, [dispatch]);

  const renderItem = ({item:{ businessName, distance}}: {item: RestaurantNearbyProduct}) => (
    <View style={styles.itemContainer}>
      <Image source={GoldenFishRestaurant} style={styles.itemImage} />
      <View style={styles.itemDetailsContainer}>
        <Text style={styles.itemTitle}>{businessName}</Text>
        <View style={styles.distanceRatingContainer}>
          <View style={styles.distanceContainer}>
            <LocationIcon name="location-pin" size={20} color={colors.red} />
            <Text style={styles.distanceText}>
              {distance.toFixed(1)} km
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <StarIcon name="star" size={20} color={colors.lightYellow} />
          </View>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{businessName}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {RestaurantNearbyProducts.length > 0 && (
        <>
          <View style={styles.restaurantNearbyContainer}>
            <Text style={styles.restaurantNearbyText}> Restaurant Nearby</Text>
            <TouchableOpacity
              style={styles.viewAllContainer}
              onPress={() => navigation.navigate('restaurantNearbyScreen')}>
              <Text style={styles.viewAllText}>Map</Text>
              <RightArrowIcon
                name="arrowright"
                size={20}
                color={colors.green}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={RestaurantNearbyProducts.slice(0, 4)}
              renderItem={renderItem}
              keyExtractor={(item: RestaurantNearbyProduct) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </>
      )}
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
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    shadowColor: colors.lightYellow,
  },
  itemImage: {
    width: responsiveWidth(80),
    height: responsiveWidth(50),
    borderRadius: 20,
  },
  itemDetailsContainer: {
    gap: 5,
  },
  itemTitle: {
    color: colors.black,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.black,
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

export default RestaurantNearby;
