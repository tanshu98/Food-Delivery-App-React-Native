import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Chicken, Burger, Pizza} from '../assets';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { colors } from '../constants/Colors';
import { fonts } from '../constants/Fonts';
import BellIcon from 'react-native-vector-icons/FontAwesome5';
import PlusIcon from 'react-native-vector-icons/AntDesign';



interface BestChoisesData {
  id: string;
  image: ImageSourcePropType | undefined;
  title: string;
  price: string;
  restaurantName: string;
  bgColor: string;
}

const data: BestChoisesData[] = [
  {
    id: '1',
    image: Burger,
    title: 'Burger',
    price: '₹90',
    restaurantName: 'Barbeque Nation',
    bgColor:''
  },
  {
    id: '2',
    image: Pizza,
    title: 'Pizza',
    price: '₹150',
    restaurantName: 'Naivedhyam Restaurant',
    bgColor:colors.green
  },
  {
    id: '3',
    image: Chicken,
    title: 'Chicken',
    price: '₹120',
    restaurantName: 'Golden Fish Restaurant',
    bgColor:''
  },
  {
    id: '4',
    image: Burger,
    title: 'Burger',
    price: '₹90',
    restaurantName: 'Barbeque Nation',
    bgColor:''
  },
];

const BestChoises = () => {
  const renderItem = ({item, index}: {item: BestChoisesData, index: number}) => {

    const isEven = (index + 1) % 2 === 0;
    const backgroundColor = isEven ? colors.pink : colors.UltraLightYellow;
    
    const shadowColor = isEven ? colors.pink : colors.UltraLightYellow;
    
    return (
    <View style={[styles.card, {backgroundColor}]}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <BellIcon name="concierge-bell" size={20} color={colors.black}  />
      <Text>{item.restaurantName}</Text>
      </View>
      <View style={[styles.plusIcon,{shadowColor}]} >
      <PlusIcon name="plus" size={20} color={colors.black}  />
      </View>

    </View>
  );
};


  
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>BestChoises</Text>
      <FlatList
        renderItem={renderItem}
        data={data}
        horizontal={true}
        keyExtractor={(item: BestChoisesData) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer:{
    marginVertical: 35,
   marginHorizontal:10
  },
  titleText:{
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
    fontSize: responsiveFontSize(2.5),
    marginBottom:10
  },
  card: {
    
    padding: 10,
    borderRadius: 20,
    marginRight: 15,
    alignItems: 'center',
    paddingVertical:responsiveHeight(5),
  },
  image:{
    position:'absolute',
    top:-40,
  },
  itemContainer:{
    position:'relative',
    alignItems:'center',
    justifyContent:'center',
    gap:responsiveHeight(2)
  },
  itemTitle:{
    marginTop:50,
    fontFamily: fonts.bai.semiBold,
    fontSize: responsiveFontSize(2.5),
    color: colors.black,
  },
  itemPrice:{
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(2.2),
    color: colors.red
  },
  plusIcon:{
    backgroundColor:colors.white,
    position:'absolute',
    bottom:-18,
    padding:10,
    borderRadius:20,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  }
});

export default BestChoises;
