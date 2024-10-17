import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Chicken, Burger, Pizza} from '../assets';
import {colors} from '../constants/Colors';
import {fonts} from '../constants/Fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MinusIcon from 'react-native-vector-icons/AntDesign';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
  navigation: any;
}

interface CartScreenData {
  id: string;
  image: ImageSourcePropType | undefined;
  title: string;
  currentPrice: string;
  oldPrice: string;
  itemQty: number;
}

const data: CartScreenData[] = [
  {
    id: '1',
    image: Burger,
    title: 'Hamburger',
    currentPrice: '₹100',
    oldPrice: '₹200',
    itemQty: 1,
  },
  {
    id: '2',
    image: Pizza,
    title: 'Vegetarian Pizza',
    currentPrice: '₹150',
    oldPrice: '₹180',
    itemQty: 1,
  },
  {
    id: '3',
    image: Chicken,
    title: 'chicken biryani',
    currentPrice: '₹120',
    oldPrice: '₹150',
    itemQty: 1,
  },
];



const CartScreen = ({navigation}: IProps) => {

  const handleSubmit = () => {
    console.log('hello');
    navigation.navigate('checkoutScreen');
  };
  const renderItem = ({item}: {item: CartScreenData}) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetailsContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>{item.currentPrice}</Text>
          <Text style={styles.oldPrice}>{item.oldPrice}</Text>
        </View>
        <View style={styles.qtyDeleteContainer}>
          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.minusIcon}>
            <MinusIcon name="minus" size={16}  color={colors.black}/>
            </TouchableOpacity >
            <View style={styles.qtyText}>
            <Text style={{color:colors.black}}>{item.itemQty}</Text>
            </View>
            <TouchableOpacity style={styles.plusIcon}>
            <PlusIcon name="plus" size={16} color={colors.black} />
            </TouchableOpacity>
          </View>
          <View style={styles.deleteContainer}>
            <DeleteIcon
              name="delete"
              size={18}
              style={styles.deleteIcon}
            />
          </View>
        </View>
      </View>
    </View>
  );
  return (
  
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        renderItem={renderItem}
        data={data}
        keyExtractor={item => item.id}
        
      />
      <View style={styles.checkoutContainer}>
         <TouchableOpacity
                style={styles.loginButton}
                onPress={()=>handleSubmit()}>
                <Text style={styles.loginButtonText}>CHECKOUT</Text>
              </TouchableOpacity>
      </View>

    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.red,
    // flex: 1,
    gap:20,
    justifyContent: 'space-between',
    minHeight: responsiveHeight(75), 
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    shadowColor: colors.lightYellow,
  },
  itemImage: {
    width: responsiveWidth(40),
    height: responsiveWidth(20),
    borderRadius: 10,
    // backgroundColor: colors.red
  },
  itemDetailsContainer: {
    flexDirection: 'column',
    gap: 5,
    marginHorizontal: 10,
    // width: responsiveWidth(35)
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
  qtyDeleteContainer: {
    flexDirection: 'row',
    gap:15,
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  qtyContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // gap: 5,
    backgroundColor: colors.pink,
    // justifyContent: 'space-evenly',
    // padding: 10,
  },
  qtyText: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.bai.semiBold,
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  minusIcon: {
    // color: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: colors.white,
    borderRightWidth: 1,
    width: responsiveWidth(8),
    height: responsiveWidth(8),
  },
  plusIcon: {
    // color: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: colors.white,
    borderLeftWidth: 1,
    width: responsiveWidth(8),
    height: responsiveWidth(8),
  },
  deleteContainer:{
backgroundColor: colors.red,
padding: responsiveWidth(2),
  },
  deleteIcon:{
    color: colors.white
  },
  checkoutContainer: {
    // alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: colors.green,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    // zIndex:999
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    shadowColor: colors.green,
    // marginVertical:200,
    marginHorizontal: 10,
  },
  loginButtonText: {
    fontSize: responsiveFontSize(2),
    color: colors.white,
    fontFamily: fonts.montserrat.bold,
  },
});

export default CartScreen;
