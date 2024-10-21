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


interface FavoriteData {
    id: string;
    image: ImageSourcePropType | undefined;
    title: string;
    price: string;
  }

  const data: FavoriteData[] = [
    {
      id: '1',
      image: VegDumBiryani,
      title: 'Bset Veg Dum Biryani',
      price: '₹100',
    },
    {
      id: '2',
      image: ChickenTikka,
      title: 'Chicken Tikka',
      price: '₹150',
    },
    {
      id: '3',
      image: PizzaSpecial,
      title: 'Pizza', 
      price: '₹120',
    },
    {
      id: '4',
      image: ChikckenBiryani,
      title: 'Chicken Biryani',
      price: '₹90',
    },
    {
      id: '5',
      image: VegDumBiryani,
      title: 'Bset Veg Dum Biryani',
      price: '₹90',
    },
  ]


const Favorite = ({navigation}:IProps) => {
   
    const renderItem = ({item}: {item: FavoriteData}) => (
        <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetailsContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.currentPrice}>{item.price}</Text>
                </View>
            </View>
        </View>
    )
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: FavoriteData) => item.id}
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
    }
})

export default Favorite;