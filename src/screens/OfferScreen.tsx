import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../constants/Colors';
import {
  ChickenTikka,
  ChikckenBiryani,
  OfferOne,
  OfferThree,
  OfferTwo,
  PizzaSpecial,
  VegDumBiryani,
} from '../assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {fonts} from '../constants/Fonts';
import BellIcon from 'react-native-vector-icons/FontAwesome5';

interface OfferScreenData {
  image: ImageSourcePropType;
  title: string;
  description: string;
}

interface RestaurantNearbyOffers {
  id: string;
  image: ImageSourcePropType | undefined;
  title: string;
  currentPrice: string;
  oldPrice: string;
  restaurantName: string;
}

const OfferScreenData: OfferScreenData[] = [
  {
    image: OfferOne,
    title: 'Get 30% OFF',
    description: 'Super Veg Delicious Dish',
  },
  {
    image: OfferTwo,
    title: 'Get 30% OFF',
    description: 'Best Veg Hamburger',
  },
  {
    image: OfferThree,
    title: 'Get 30% OFF',
    description: 'Classic Chicken Wings',
  },
];

const data: RestaurantNearbyOffers[] = [
  {
    id: '1',
    image: VegDumBiryani,
    title: 'Bset Veg Dum Biryani',
    currentPrice: '₹100',
    oldPrice: '₹200',
    restaurantName: 'Golden Fish Restaurant',
  },
  {
    id: '2',
    image: ChickenTikka,
    title: 'Chicken Tikka',
    currentPrice: '₹150',
    oldPrice: '₹180',
    restaurantName: 'Barbeque Nation',
  },
  {
    id: '3',
    image: PizzaSpecial,
    title: 'Pizza',
    currentPrice: '₹120',
    oldPrice: '₹150',
    restaurantName: 'Naivedhyam Restaurant',
  },
  {
    id: '4',
    image: ChikckenBiryani,
    title: 'Chicken Biryani',
    currentPrice: '₹90',
    oldPrice: '₹120',
    restaurantName: 'Saoji Bhojnalaya',
  },
  {
    id: '5',
    image: VegDumBiryani,
    title: 'Bset Veg Dum Biryani',
    currentPrice: '₹90',
    oldPrice: '₹120',
    restaurantName: 'Golden Fish Restaurant',
  },
];

const OfferScreen = () => {
  const renderItem = ({item}: any) => {
    return (
      <View style={styles.offersBannerContainer}>
        <ImageBackground
          source={item.image}
          style={styles.offerOne}
          imageStyle={styles.imageStyle}>
          <Text style={styles.offerTitle}>{item.title}</Text>
          <Text style={styles.offerDescription}>{item.description}</Text>
        </ImageBackground>
      </View>
    );
  };

  const renderRestaurantOffers = ({item}: any) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>{item.currentPrice}</Text>
            <Text style={styles.oldPrice}>{item.oldPrice}</Text>
          </View>
          <View style={styles.restaurantContainer}>
            <BellIcon
              name="concierge-bell"
              size={20}
              color={colors.lightTextColor}
            />
            <Text style={styles.restaurantName}>{item.restaurantName}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScrollView>
    <View style={styles.container}>
      <FlatList
        data={OfferScreenData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.nearbyRestaurantOffers}>
        <Text style={styles.NearbyRestaurantText}>Nearby Restaurant Offers</Text>
        <FlatList
          data={data.slice(0, 5)}
          renderItem={renderRestaurantOffers}
          keyExtractor={itemOffers => itemOffers.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: responsiveWidth(100),
  },
  offersBannerContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  offerOne: {
    height: responsiveHeight(14),
    borderRadius: 20,
    gap: 10,
    justifyContent: 'center',
  },
  offerTitle: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.montserrat.medium,
    marginLeft: 20,
  },
  imageStyle: {
    borderRadius: 20,
  },
  offerDescription: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
    marginLeft: 20,
    width: responsiveWidth(40),
  },
  nearbyRestaurantOffers: {
    flex: 15,
  },
  NearbyRestaurantText:{
    color: colors.black,
    fontSize: responsiveFontSize(2.8),
    fontFamily: fonts.montserrat.semiBold,
    marginLeft: 20,
    marginVertical:10
    
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
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
    width: responsiveWidth(25),
    height: responsiveWidth(25),

  },
  itemDetailsContainer: {
    gap: Platform.OS === 'android' ? 5 : 12,
    padding:Platform.OS === 'android' ? 1 :0
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

export default OfferScreen;
