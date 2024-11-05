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
import { HomeSlice,TodaySpecials,getTodaySpecial } from '../redux/slices/HomeSlice'
import TodaySpecial from '../components/TodaySpecial'


interface IProps {
    navigation: any;
    route: {
      params: {
        data: TodaySpecialData[];
    }}
}


interface TodaySpecialData {
    id: string;
    image: ImageSourcePropType | undefined;
    title: string;
    currentPrice: string;
    oldPrice: string;
    restaurantName: string;
  }

const TodaySpecialScreen = ({navigation,route}:IProps) => {
    console.log("route.params.data----",route.params.data);
   
  return (
    <View style={styles.container}>
        <TodaySpecial disableText={true} data={route.params.data} />
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