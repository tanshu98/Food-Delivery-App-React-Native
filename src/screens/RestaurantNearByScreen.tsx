import React from 'react'
import { FlatList, Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { KshatriyaRestaurant, NandiniRestaurant, GoldenFishRestaurant } from '../assets'
import { colors } from '../constants/Colors'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { fonts } from '../constants/Fonts'
import RightArrowIcon from 'react-native-vector-icons/AntDesign';
import LocationIcon from 'react-native-vector-icons/Entypo';
import StarIcon from 'react-native-vector-icons/Entypo';
import StarOutlinedIcon from 'react-native-vector-icons/Entypo';




interface IProps {
  navigation:any
}

interface RestaurantNearbyData {
    id: string;
    image: ImageSourcePropType | undefined;
    title: string;
    distance: string;
    address: string;
  }

  const data: RestaurantNearbyData[] = [
    {
      id: '1',
      image: GoldenFishRestaurant,
      title: 'Golden Fish Restaurant',
      distance: '2.5 km',
      address: 'Manish Nagar, Ingole Nagar, Sonegaon, Nagpur',
    },
    {
      id: '2',
      image: KshatriyaRestaurant,
      title: 'Kshatriya restaurant',
      distance: '2.4 km',
      address: 'Manish Nagar, Ingole Nagar, Sonegaon, Nagpur',
    },
    {
      id: '3',
      image: NandiniRestaurant,
      title: 'Nandini Restaurant', 
      distance: '1.2 km',
      address: 'Manish Nagar, Ingole Nagar, Sonegaon, Nagpur',
    },
    {
      id: '4',
      image: GoldenFishRestaurant,
      title: 'Golden Fish Restaurant',
      distance: '1.5 km',
      address: 'Manish Nagar, Ingole Nagar, Sonegaon, Nagpur',
    },
    {
      id: '5',
      image: KshatriyaRestaurant,
      title: 'Kshatriya restaurant',
      distance: '2.4 km',
      address: 'Manish Nagar, Ingole Nagar, Sonegaon, Nagpur',
    },
  ]


const RestaurantNearByScreen = ({navigation}:IProps) => {

    const renderItem = ({item}: {item: RestaurantNearbyData}) => (
        <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetailsContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
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
                    <Text style={styles.addressText}>{item.address}</Text>
                </View>
            </View>
        </View>
    )
  return (
    <View style={styles.container}>
    {/* <View style={styles.restaurantNearbyContainer}>
      <Text style={styles.restaurantNearbyText}> Today's Special</Text>
      <TouchableOpacity style={styles.viewAllContainer} onPress={()=>navigation.navigate('restaurantNearbyScreen')}>
          <Text style={styles.viewAllText}>View All</Text>
          <RightArrowIcon name="arrowright" size={20} color={colors.green}  /> 
      </TouchableOpacity>
    </View> */}
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: RestaurantNearbyData) => item.id}
        // horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  </View>
  )
};

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    restaurantNearbyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // flex: 1,
        // backgroundColor: colors.white
    },
    restaurantNearbyText: {
        color: colors.black,
        fontSize: responsiveFontSize(2.5),
        fontFamily: fonts.bai.semiBold,
        // textAlign: 'center'
        marginHorizontal: 10
    },
    viewAllContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginHorizontal: 15
    },
    viewAllText: {
        color: colors.black,
        fontSize: responsiveFontSize(2),
        fontFamily: fonts.bai.semiBold,
    },
    listContainer: {
        marginVertical:10,
        // paddingVertical:20
        // flex: 1
        gap: 10
        
    },
    itemContainer: {
        flexDirection: 'column',
        // alignItems: 'center',
        // gap: 10,
        marginHorizontal: 10,
        marginVertical:8,
        // padding:10,
        backgroundColor: colors.white,
        borderRadius:20,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
        shadowColor: colors.lightYellow
       
    },
    itemImage: {
        width: responsiveWidth(90),
        height: responsiveWidth(60),
        borderRadius:20,
        marginHorizontal: 10
    },
    itemDetailsContainer: {
        // flex: 1,
        gap: 5,
        marginHorizontal: 20
    },
    itemTitle: {
        color: colors.black,
        fontSize: responsiveFontSize(2.5),
        fontFamily: fonts.bai.semiBold,
    },
    distanceRatingContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5  
    },
    distanceContainer: {
        flexDirection:'row',
        alignItems: 'center',
    },
    distanceText: {
        color: colors.red,
        fontSize: responsiveFontSize(2),
        fontFamily: fonts.montserrat.semiBold,
    },
    ratingContainer: {
        flexDirection:'row',
        alignItems: 'center',
    },
    addressContainer: {
        width: responsiveWidth(65),
    },
    addressText: {
        color: colors.lightTextColor,
        fontSize: responsiveFontSize(2),
        fontFamily: fonts.montserrat.semiBold,
        marginVertical:10
    }

})

export default RestaurantNearByScreen