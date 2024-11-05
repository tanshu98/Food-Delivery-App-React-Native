import React, {useEffect} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import HomeCarousal from '../components/HomeCarousal';
import {colors} from '../constants/Colors';
import {fonts} from '../constants/Fonts';
import LocationIcon from 'react-native-vector-icons/Entypo';
import StarIcon from 'react-native-vector-icons/Entypo';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import HomeTopComponent from '../components/HomeTopComponent';
import BestChoises from '../components/BestChoises';
import TodaySpecial from '../components/TodaySpecial';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store/store';
import {
  handleSingleRestaurant,
  handleSingleRestaurantBestChoice,
  handleSingleRestaurantTodaySpecial,
} from '../redux/slices/HomeSlice';
import RestaurantNearby from '../components/RestaurantNearby';

interface NearbyRestaurantScreenProps {
  navigation: any;
  route: {
    params: {
      buisnessId: string;
    };
  };
}

interface SampleData {
  id: string;
  businessName: string;
  distance: number;
  address: string;
}

const data: SampleData[] = [
  {
    id: '1',
    businessName: 'Kshatriya Restaurant',
    distance: 0.5,
    address: 'Kathmandu, Nepal',
  },
];

const NearbyRestaurantScreen = ({
  navigation,
  route,
}: NearbyRestaurantScreenProps) => {
  const {buisnessId} = route.params;
  const singleRestaurant = useSelector(
    (state: RootState) => state.HomeSlice.HandleSingleRestaurant,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSingleRestaurantTodaySpecialData = useSelector(
    (state: RootState) => state.HomeSlice.singleRestaurantTodaySpecials,
  );

  const {HandleSingleRestaurantBestChoices} = useSelector(
    (state: RootState) => state.HomeSlice,
  );

  const handleNavigate = () => {
    navigation.navigate('todaySpecialScreen', {
      data: handleSingleRestaurantTodaySpecialData,
    });
  };

  useEffect(() => {
    dispatch(handleSingleRestaurant(buisnessId));
    dispatch(handleSingleRestaurantTodaySpecial(buisnessId));
    dispatch(handleSingleRestaurantBestChoice(buisnessId));
  }, [dispatch, buisnessId]);

  return (
    <ScrollView style={styles.container}>
      <HomeCarousal />
      <View style={styles.itemContainer}>
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemTitle}>{singleRestaurant.businessName}</Text>
          <View style={styles.distanceRatingContainer}>
            <View style={styles.distanceContainer}>
              <LocationIcon name="location-pin" size={20} color={colors.red} />
              <Text style={styles.distanceText}>2.5 km</Text>
            </View>
            <View style={styles.ratingContainer}>
              <StarIcon name="star" size={20} color={colors.lightYellow} />
            </View>
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>
              {singleRestaurant.businessName}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.favoriteReviews}>
        <TouchableOpacity style={styles.favoriteContainer}>
          <Text style={styles.favoriteText}>Favorite</Text>
          <PlusIcon
            name="plus"
            size={18}
            color={colors.white}
            style={styles.plusIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.reviewsContainer}>
          <Text style={styles.reviewsText}>Food Reviews</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.categoryText}>Category</Text>
        <HomeTopComponent />
        <BestChoises data={HandleSingleRestaurantBestChoices} />
      </View>
      <TodaySpecial
        data={handleSingleRestaurantTodaySpecialData}
        navigation={navigation}
        handleNavigate={handleNavigate}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  itemContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: responsiveHeight(1.2),
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
  favoriteReviews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    gap: 10,
  },
  favoriteContainer: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: colors.red,
    alignItems: 'center',
    borderRadius: 5,
    height: responsiveHeight(8),
    flex: 1,
    justifyContent: 'center',
    shadowColor: colors.red,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 20,
  },
  favoriteText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  plusIcon: {
    marginLeft: 5,
    fontFamily: fonts.bai.semiBold,
  },
  reviewsContainer: {
    backgroundColor: colors.green,
    borderRadius: 5,
    alignItems: 'center',
    height: responsiveHeight(8),
    flex: 1,
    justifyContent: 'center',
    shadowColor: colors.green,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 20,
  },
  reviewsText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  categoryText: {
    color: colors.black,
    fontSize: responsiveFontSize(3),
    fontFamily: fonts.bai.semiBold,
    marginVertical: 5,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
});

export default NearbyRestaurantScreen;
