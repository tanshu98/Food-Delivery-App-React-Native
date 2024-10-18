import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import { BurgerCheck,CheckIcon } from '../assets';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { colors } from '../constants/Colors';
import { fonts } from '../constants/Fonts';

interface NotificationScreenData {
    id: string
    image: ImageSourcePropType| undefined;
    title: string
    description: string
    time: string
}

const data: NotificationScreenData[] = [
    {
        id: '1',
        image: CheckIcon,
        title: 'Order Placed',
        description: 'Your order has been placed.',
        time: '12:20pm' 
    },
    {
        id: '2',
        image: BurgerCheck,
        title: 'Get 30% Off burger',
        description: 'Your order has been placed.',
        time: '12:20pm' 
    }
]


const NotificationScreen = () => {
  return (
    <View>
    {data.map((item) => (
        <View  key={item.id} style={[styles.itemContainer,{backgroundColor: item.id === '1' ? colors.lightGreen : colors.UltraLightYellow, 
            shadowColor: item.id === '1' ? colors.lightGreen : colors.UltraLightYellow,
            borderColor: item.id === '1' ? colors.darkGreen : colors.borderYellow
        }]}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetailsContainer}>
                <View style={styles.itemTitleContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemTime}>{item.time}</Text>
                </View>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
        </View>
    ))}
    </View>
  )
};

const styles = StyleSheet.create({
    itemContainer:{
        flexDirection:'row',
        marginHorizontal:10,
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:responsiveHeight(3),
        borderRadius: 20,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
        width:responsiveWidth(90),
        borderWidth: 1,
        gap:5,
        
    },
    itemImage:{
        width:55,
        height:55
    },
    itemDetailsContainer:{
        marginHorizontal:10,
        gap:7
    },
    itemTitleContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        gap:5,
        alignItems:'center'
    },
    itemTitle:{
        color:colors.black,
        fontSize:responsiveFontSize(2.2),
        fontFamily:fonts.bai.semiBold
    },
    itemDescription:{
        color:colors.textColor,
        fontSize:responsiveFontSize(2),
        fontFamily:fonts.bai.semiBold,
        width:responsiveWidth(60),
    },
    itemTime:{
        color:colors.textColor,
        fontSize:responsiveFontSize(2),
        fontFamily:fonts.bai.semiBold
    }
})

export default NotificationScreen