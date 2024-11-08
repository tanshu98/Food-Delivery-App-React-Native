import React, {useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  onboardingEllipse,
} from '../assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../constants/Colors';
import {fonts} from '../constants/Fonts';
import carouselData, { CarouselItemData } from '../config/carouselData';
import { NavigationProp, ParamListBase } from '@react-navigation/native';


interface OnboardingScreenProps {
  navigation: NavigationProp<ParamListBase>;
}


const OnboardingScreen = ({navigation}: OnboardingScreenProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<any>(null);

  const handleNextSlide = () => {
    if (activeIndex === carouselData.length - 1) {
      navigation.navigate('loginScreen');
    } else {
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      carouselRef.current?.snapToItem(nextIndex);
    }
  };
  
  const renderItem = ({item}: {item:CarouselItemData }) => {
    return (
      <View style={styles.carouselItem}>
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          style={styles.OnboardingBg}>
          {activeIndex !== carouselData.length - 1 && (
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => navigation.navigate('loginScreen')}>
              <MaterialIcons
                name={'skip-next'}
                color={colors.black}
                size={20}
              />
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
        </ImageBackground>
        <Image
          source={onboardingEllipse}
          style={styles.ellipseStyle}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.button} onPress={handleNextSlide}>
          <MaterialIcons name={item.icon} color={colors.white} size={30} />
        </TouchableOpacity>
        <View
          style={{
            gap:
              Platform.OS === 'android'
                ? responsiveHeight(0.5)
                : responsiveHeight(1),
            marginTop:
              Platform.OS === 'android'
                ? -responsiveHeight(7)
                : -responsiveHeight(6),
          }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subTitle}>{item.subTitle}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={'rgba(0,0,0,0)'}
        translucent={true}
        barStyle={'light-content'}
      />
      <Carousel
        ref={carouselRef}
        data={carouselData}
        //@ts-ignore
        renderItem={renderItem}
        sliderWidth={responsiveScreenWidth(100)}
        itemWidth={responsiveScreenWidth(100)}
        layout="default"
        autoplayInterval={3000}
        loop={false}
        autoplay={true}
        onSnapToItem={index => {setActiveIndex(index)
          if(index === carouselData.length - 1){
            carouselRef.current.stopAutoplay()
            setTimeout(() => navigation.navigate('loginScreen'), 3000);
          }
        }}
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
  carouselItem: {
    flex: 1,
    alignItems: 'center',
    width: responsiveWidth(100),
  },
  OnboardingBg: {
    width: responsiveWidth(100),
    height: responsiveHeight(69),
  },
  ellipseStyle: {
    width: responsiveWidth(100),
    height: responsiveHeight(45),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    backgroundColor: colors.red,
    height: 50,
    width: 50,
    borderRadius: 100,
    position: 'absolute',
    bottom: responsiveHeight(42),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.white,
    elevation: 5,
  },
  title: {
    fontSize: responsiveFontSize(4),
    color: colors.black,
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: fonts.bai.semiBold,
    width: responsiveWidth(85),
  },
  subTitle: {
    fontSize: responsiveFontSize(1.8),
    color: colors.lightTextColor,
    textAlign: 'center',
    marginBottom: 15,
    width: responsiveWidth(80),
    lineHeight: responsiveHeight(3),
    fontFamily: fonts.montserrat.semiBold,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: responsiveHeight(5),
    alignSelf: 'center',
    paddingHorizontal: 20,
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
  skipButton: {
    backgroundColor: colors.white,
    height: 30,
    width: 80,
    borderRadius: 100,
    position: 'absolute',
    top: responsiveHeight(6),
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 5,
    right: responsiveWidth(10),
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  skipText: {
    color: colors.black,
    fontFamily: fonts.montserrat.semiBold,
    fontSize: 12,
  },
});

export default OnboardingScreen;
