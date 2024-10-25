import React, { useEffect } from 'react'
import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../constants/Colors'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { fonts } from '../constants/Fonts'
import RightArrowIcon from 'react-native-vector-icons/AntDesign';
import { ChickenTikka,PizzaSpecial,VegDumBiryani,ChikckenBiryani } from '../assets'
import BellIcon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux'
import { RootState,AppDispatch } from '../redux/store/store'
import { HomeSlice,Product,getTodaySpecial } from '../redux/slices/HomeSlice'


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


const TodaySpecialScreen = ({navigation}:IProps) => {

   const dispatch = useDispatch<AppDispatch>();
   const {products, error, loading} = useSelector((state:RootState)=> state.HomeSlice);

   useEffect(()=> {
    dispatch(getTodaySpecial());
   },[dispatch])

//    console.log("products----TODAYSPECIALCOMPONENTSCREEN-----", products);

   
    const renderItem = ({item}: {item: Product}) => (
        <View style={styles.itemContainer}>
            <Image source={PizzaSpecial} style={styles.itemImage} />
            <View style={styles.itemDetailsContainer}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.currentPrice}>{item.discountPrice}</Text>
                    <Text style={styles.oldPrice}>{item.price}</Text>
                </View>
                <View style={styles.restaurantContainer}>
                <BellIcon name="concierge-bell" size={20} color={colors.lightTextColor}  />
                <Text style={styles.restaurantName}>{item.category}</Text>
                </View>
            </View>
        </View>
    )
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default TodaySpecialScreen