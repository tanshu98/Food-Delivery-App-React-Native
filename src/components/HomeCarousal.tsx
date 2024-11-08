import React, { useRef, useState } from 'react';
import { Image,  StyleSheet, View } from 'react-native';
import {  responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { colors } from '../constants/Colors';
import { carouselData, CarouselItemData } from '../config/HomeCarouselData';


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
        data={carouselData}
        //@ts-ignore
        renderItem={renderItem}
        sliderWidth={responsiveScreenWidth(100)} 
        itemWidth={responsiveScreenWidth(100)}
        autoplayInterval={3000}
        autoplay={true}
        onSnapToItem={index => {setActiveIndex(index)
          if(index === carouselData.length - 1){
            carouselRef.current.stopAutoplay()
          }
        }}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
        <Pagination
        activeDotIndex={activeIndex}
        dotsLength={carouselData.length}
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
    marginHorizontal: 7,
    width: responsiveWidth(88),
  },
  carouselBg: {
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 15, 
  },
  paginationContainer: {
    paddingVertical:0,
    paddingTop:responsiveHeight(2),
    
  },
  activeDot: {
    backgroundColor: colors.red,
    width: 12,
    height: 12,
    borderRadius: 100,
    // marginHorizontal: 5,
  },
  inactiveDot: {
    backgroundColor: colors.white,
    width: 25,
    height: 25,
    borderRadius: 100,
    // marginHorizontal: 5,
    borderWidth: 5,
    borderColor: colors.green,
  },
});

export default HomeCarousal;
