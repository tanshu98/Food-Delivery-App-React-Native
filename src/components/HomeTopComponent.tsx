import React from 'react'
import { FlatList, Image } from 'react-native';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/Colors';
import { BurgerHeader, PizzaHeader } from '../assets';
import { responsiveHeight } from 'react-native-responsive-dimensions';

interface HomeTopComponentPrps {   
    id: string;
    image: ImageSourcePropType; 
}

const data : HomeTopComponentPrps[] = [
    {
        id: '1',
        image: PizzaHeader,
    },
    {
        id: '2',
        image: BurgerHeader,
    },
    {
        id: '3',
        image: PizzaHeader
    },
    {
        id: '4',
        image: BurgerHeader,
    }
]

const HomeTopComponent = () => {
    const renderItem = ({item}: {item: HomeTopComponentPrps}) => (
        <View style={styles.itemContainer}>
            <Image source={item.image}  />
        </View>
    )
  return (
   <View style={styles.container}>
  <FlatList renderItem={renderItem} data={data} horizontal={true} keyExtractor={item => item.id} showsHorizontalScrollIndicator={false}/>
   </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical:responsiveHeight(1.2)
    }
})

export default HomeTopComponent