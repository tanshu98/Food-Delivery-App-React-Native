import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageSourcePropType,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../constants/Colors';
import {fonts} from '../constants/Fonts';
import {
  Burger,
  Pizza,
  NandiniRestaurant,
  GoldenFishRestaurant,
  KshatriyaRestaurant,
} from '../assets';
import Carousel from 'react-native-snap-carousel';
import StarIcon from 'react-native-vector-icons/Entypo';
import LocationIcon from 'react-native-vector-icons/Entypo';
import CallIcon from 'react-native-vector-icons/MaterialIcons';


interface IProps {
  navigation: any;
}

interface OrderScreenData {
  id: string;
  image: ImageSourcePropType | undefined;
  title: string;
  price: string;
}

interface RestaurantDetailsData {
  id: string;
  image: ImageSourcePropType | undefined;
}

const data: OrderScreenData[] = [
  {
    id: '1',
    image: Burger,
    title: 'Hamburger',
    price: '₹100',
  },
  {
    id: '2',
    image: Pizza,
    title: 'Pizza',
    price: '₹150',
  },
];

const restaurantDetailsData: RestaurantDetailsData[] = [
  {
    id: '1',
    image: NandiniRestaurant,
  },
  {
    id: '2',
    image: GoldenFishRestaurant,
  },
  {
    id: '3',
    image: KshatriyaRestaurant,
  },
];
const OrderScreen = () => {
  const carouselRef = useRef<any>(null);

  const renderItem = ({item}: {item: OrderScreenData}) => {
    return (
      <View style={styles.carouselItem}>
        <Image
          style={styles.carouselBg}
          source={item.image}
          resizeMode="stretch"
        />
        <View style={styles.carouselInfo}>
          <Text style={styles.carouselTitle}>{item.title}</Text>
          <Text style={styles.carouselPrice}>{item.price}</Text>
        </View>
      </View>
    );
  };

  const renderRestaurantDetailsItem = ({
    item,
  }: {
    item: RestaurantDetailsData;
  }) => {
    return (
      <View style={styles.resDetailscarouselItem}>
        <Image
          style={styles.resDetailscarouselBg}
          source={item.image}
          resizeMode="stretch"
        />
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.orderInfoContainer}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderInfoText}>Order# ORD00003</Text>
            <Text style={styles.orderTime}>25 March, 03:25 PM</Text>
          </View>
          <View style={styles.trackOrder}>
            <Text style={styles.trackOrderText}>Track Order</Text>
          </View>
        </View>
        <View style={styles.orderedItemsContainer}>
          <Text style={styles.orderedItemsText}>Ordered Items</Text>
          <View style={styles.carouselContainer}>
            <Carousel
              ref={carouselRef}
              data={data}
              //@ts-ignore
              renderItem={renderItem}
              sliderWidth={responsiveScreenWidth(100)}
              itemWidth={responsiveScreenWidth(100)}
              autoplayInterval={3000}
            />
          </View>
        </View>
        <View style={styles.billContainer}>
          <View style={styles.totalBill}>
            <Text style={styles.totalBillText}>Total Bill</Text>
            <Text style={styles.totalBillPrice}>₹200</Text>
          </View>
          <View style={styles.dashedLine} />
          <View style={styles.deliveryCharge}>
            <Text style={styles.deliveryChargeText}>Delivery Charge</Text>
            <Text style={styles.deliveryChargePrice}>₹0.00</Text>
          </View>
          <View style={styles.dashedLine} />
          <View style={styles.deliveryCharge}>
            <Text style={styles.deliveryChargeText}>Packing Charge</Text>
            <Text style={styles.deliveryChargePrice}>₹9</Text>
          </View>
          <View style={styles.dashedLine} />
          <View style={styles.deliveryCharge}>
            <Text style={styles.deliveryChargeText}>Tax Amount(5.0%)</Text>
            <Text style={styles.deliveryChargePrice}>₹15</Text>
          </View>
          <View style={styles.dashedLine} />
          <View style={styles.deliveryCharge}>
            <Text style={styles.deliveryChargeText}>Total Discount</Text>
            <Text style={styles.deliveryChargePrice}>₹0.00</Text>
          </View>
          <View style={styles.dashedLine} />
          <View style={styles.totalBill}>
            <Text style={styles.totalBillText}>Grand Total</Text>
            <Text style={styles.grandtotalBillPrice}>₹324</Text>
          </View>
          <View style={styles.dashedLine} />
        </View>
        <View style={styles.restaurantDetails}>
          <Text style={styles.restaurantDetailsText}>Restaurant Details</Text>
          <Carousel
            ref={carouselRef}
            data={restaurantDetailsData}
            //@ts-ignore
            renderItem={renderRestaurantDetailsItem}
            sliderWidth={responsiveScreenWidth(100)}
            itemWidth={responsiveScreenWidth(100)}
            autoplayInterval={3000}
            horizontal={true}
          />
          <View style={styles.restaurantDetailsInfo}>
            <Text style={styles.restaurantDetailsTitle}>
              Golden Fish Restaurant
            </Text>
            <View style={styles.locationStar}>
              <LocationIcon name="location-pin" size={20} color={colors.red} />
              <Text style={styles.distanceText}>5.0 km</Text>
              <StarIcon name="star" size={20} color={colors.lightYellow} />
            </View>
            <Text style={styles.addressText}>
              Manish Nagar, Ingole Nagar, Sonegaon, Nagpur
            </Text>
          
          </View>
          <TouchableOpacity style={styles.callButton}>
                <CallIcon name="call" size={30} color={colors.white} />
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 25,
    marginHorizontal: 20,
  },
  carouselContainer: {
    alignItems: 'center',
  },
  carouselInfo: {},
  carouselItem: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    borderColor: colors.lightTextColor,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(10),
    marginVertical: responsiveHeight(2),
    gap: 10,
  },
  resDetailscarouselItem: {
    borderRadius: 15,
    flexDirection: 'row',
    marginVertical: responsiveHeight(2),
    gap: 10,
  },
  carouselBg: {
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  resDetailscarouselBg: {
    width: responsiveWidth(90),
  },
  carouselTitle: {
    color: colors.black,
    fontSize: responsiveFontSize(1.8),
    fontFamily: fonts.bai.black,
  },
  carouselPrice: {
    color: colors.textColor,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.montserrat.semiBold,
  },
  orderInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderInfo: {},
  orderInfoText: {
    color: colors.black,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  orderTime: {
    color: colors.textColor,
    fontSize: responsiveFontSize(1.8),
    fontFamily: fonts.montserrat.semiBold,
  },
  trackOrder: {},
  trackOrderText: {
    color: colors.green,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.bai.semiBold,
  },
  orderedItemsContainer: {
    marginVertical: 25,
  },
  orderedItemsText: {
    color: colors.black,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  billContainer: {},
  totalBill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  totalBillText: {
    color: colors.black,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  totalBillPrice: {
    color: colors.black,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  dashedLine: {
    width: '100%',
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.textColor,
    borderRadius: 1,
  },
  deliveryCharge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  deliveryChargeText: {
    color: colors.textColor,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  deliveryChargePrice: {
    color: colors.textColor,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  grandtotalBillPrice: {
    color: colors.red,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  restaurantDetails: {
    marginVertical: 50,
  },
  restaurantDetailsText: {
    color: colors.black,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  restaurantDetailsInfo: {
    marginHorizontal: 10,
  },
  restaurantDetailsTitle: {
    color: colors.black,
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.bai.semiBold,
  },
  locationStar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginVertical: 10,
  },
  locationText: {
    color: colors.red,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.montserrat.semiBold,
  },
  starIcon: {
    color: colors.lightYellow,
  },
  distanceText: {
    color: colors.red,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.montserrat.semiBold,
  },
  addressText: {
    color: colors.lightTextColor,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.montserrat.semiBold,
  },
  callButton:{
    position:'absolute',
    bottom:10,
    right:0,
    backgroundColor:colors.green,
    padding:10,
    borderRadius:30,
    shadowColor: colors.green,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  }
});

export default OrderScreen;
