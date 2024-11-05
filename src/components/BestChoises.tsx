import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Pizza} from '../assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../constants/Colors';
import {fonts} from '../constants/Fonts';
import BellIcon from 'react-native-vector-icons/FontAwesome5';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import { HandleSingleRestaurantBestChoice } from '../redux/slices/HomeSlice';

interface IBestChoisesProp {
    data: HandleSingleRestaurantBestChoice[];
}

interface BestChoisesData {
  id: string;
  image: ImageSourcePropType | undefined;
  title: string;
  price: string;
  restaurantName: string;
  bgColor: string;
}


const BestChoises: React.FC<IBestChoisesProp> = ({data}) => {
  const renderItem = ({
    item: { name, price, category},
    index,
  }: {
    item: HandleSingleRestaurantBestChoice,
    index: number;
  }) => {
    const isEven = (index + 1) % 2 === 0;
    const backgroundColor = isEven ? colors.pink : colors.UltraLightYellow;

    const shadowColor = colors.redPink;

    
    return (
      <View style={[styles.card, {backgroundColor}]}>
        <Image source={Pizza} style={styles.image} />
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{name}</Text>
          <Text style={styles.itemPrice}>{price}</Text>
          <BellIcon name="concierge-bell" size={20} color={colors.black} />
          <Text style={styles.itemRestaurantName}>{category}</Text>
        </View>
        <View style={[styles.plusIcon, {shadowColor}]}>
          <PlusIcon name="plus" size={20} color={colors.black} />
        </View>
      </View>
    );
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.titleText}>Best Choises</Text>
      <FlatList
        renderItem={renderItem}
        data={data}
        horizontal={true}
        keyExtractor={(item) => item._id}
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
  flatListContainer: {
    marginVertical: 35,
    marginHorizontal: 10,
  },
  titleText: {
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
    fontSize: responsiveFontSize(3),
    marginBottom: 10,
    marginHorizontal: 15,
  },
  card: {
    borderRadius: 20,
    marginRight: 15,
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
    marginHorizontal: 10,
    width: responsiveWidth(40),
    justifyContent: 'center',
    marginTop:10,
    marginVertical:20
  },
  image: {
    position: 'absolute',
    top: -40,
  },
  itemContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsiveHeight(1.3),
  },
  itemTitle: {
    marginTop: 50,
    fontFamily: fonts.bai.semiBold,
    fontSize: responsiveFontSize(2.5),
    color: colors.black,
  },
  itemPrice: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(2.2),
    color: colors.red,
  },
  itemRestaurantName: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    textAlign: 'center',
    marginBottom:20,
    width: responsiveWidth(30),
    lineHeight: 20
  },
  plusIcon: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: -18,
    padding: 10,
    borderRadius: 20,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
});

export default BestChoises;
