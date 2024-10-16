import React, { useRef, useState } from 'react';
import { Image, ImageSourcePropType, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { HomeCarosel } from '../assets';
import { responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { colors } from '../constants/Colors';

interface CarouselItemData {
  id: string;
  image: ImageSourcePropType | undefined;
}

const data: CarouselItemData[] = [
  {
    id: '1',
    image: HomeCarosel,
  },
  {
    id: '2',
    image: HomeCarosel,
  },
  {
    id: '3',
    image: HomeCarosel,
  },
  {
    id: '4',
    image: HomeCarosel,
  },
];

const HomeCarousal = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<any>(null);

  const renderItem = ({ item }: { item: CarouselItemData }) => {
    return (
      <View style={styles.carouselItem}>
        <Image
          style={styles.carouselBg}
          source={item.image}
          resizeMode="stretch"
        />
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        data={data}
        //@ts-ignore
        renderItem={renderItem}
        sliderWidth={responsiveScreenWidth(100)}
        itemWidth={responsiveScreenWidth(100)}
        // layout="default"
        autoplayInterval={3000}
        autoplay={true}
      />
        <Pagination
        activeDotIndex={activeIndex}
        dotsLength={data.length}
        dotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
        containerStyle={styles.paginationContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: responsiveWidth(100),
    alignItems: 'center',

  },
  carouselItem: {
    marginHorizontal: 10,
    width: responsiveWidth(95),
  },
  carouselBg: {
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 15, 
  },
  paginationContainer: {
  },
  activeDot: {
    backgroundColor: colors.red,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  inactiveDot: {
    backgroundColor: colors.white,
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: colors.green,
  },
});

export default HomeCarousal;
