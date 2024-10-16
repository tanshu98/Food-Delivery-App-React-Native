import React from 'react'
import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../constants/Colors'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { fonts } from '../constants/Fonts'
import RightArrowIcon from 'react-native-vector-icons/AntDesign';
import { ChickenTikka,PizzaSpecial,VegDumBiryani,ChikckenBiryani } from '../assets'
import BellIcon from 'react-native-vector-icons/FontAwesome5';

interface IProps {
    navigation: any;
}


interface TodaySpecialData {
    id: string;
    image: ImageSourcePropType | undefined;
    title: string;
    currentPrice: string;
    oldPrice: string;
    restaurantName: string;
  }

  const data: TodaySpecialData[] = [
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
  ]


const TodaySpecial = ({navigation}:IProps) => {

    // const todaySpecialHandler = () => {
    //     navigation.navigate('todaySpecialScreen')
    // }
   
    const renderItem = ({item}: {item: TodaySpecialData}) => (
        <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetailsContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.currentPrice}>{item.currentPrice}</Text>
                    <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                </View>
                <View style={styles.restaurantContainer}>
                <BellIcon name="concierge-bell" size={20} color={colors.lightTextColor}  />
                <Text style={styles.restaurantName}>{item.restaurantName}</Text>
                </View>
            </View>
        </View>
    )
  return (
    <View style={styles.container}>
      <View style={styles.todaysSpecialContainer}>
        <Text style={styles.todaysSpecialText}> Today's Special</Text>
        <TouchableOpacity style={styles.viewAllContainer} onPress={()=>navigation.navigate('todaySpecialScreen')}>
            <Text style={styles.viewAllText}>View All</Text>
            <RightArrowIcon name="arrowright" size={20} color={colors.green}  /> 
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: TodaySpecialData) => item.id}
        //   horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.pink
    },
    todaysSpecialContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // flex: 1,
        // backgroundColor: colors.white
    },
    todaysSpecialText: {
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
        
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginHorizontal: 10,
        marginVertical:8,
        padding:10,
        backgroundColor: colors.white,
        borderRadius:20,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
        shadowColor: colors.lightYellow
       
    },
    itemImage: {
        width: responsiveWidth(25),
        height: responsiveWidth(25),
        // borderRadius: 10
    },
    itemDetailsContainer: {
        flexDirection: 'column',
        gap: 4,
        // backgroundColor: colors.green
    },
    itemTitle: {
        color: colors.black,
        fontSize: responsiveFontSize(2),
        fontFamily: fonts.bai.semiBold,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
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
        textDecorationLine: 'line-through'
    },
    restaurantContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    restaurantName: {
        color: colors.lightTextColor,
        fontSize: responsiveFontSize(2),
        fontFamily: fonts.bai.semiBold,
    }
})

export default TodaySpecial