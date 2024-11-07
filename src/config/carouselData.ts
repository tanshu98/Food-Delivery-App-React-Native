import { ImageSourcePropType } from 'react-native';
import {
  carouselOne,
  carouselTwo,
  carouselThree,
  carouselFour,
} from '../assets';

export interface CarouselItemData {
  id: number;
  image: ImageSourcePropType | undefined;
  title: string;
  subTitle: string;
  icon: string;
}

const carouselData: CarouselItemData[] = [
  {
    id: 1,
    image: carouselOne,
    title: 'We have Quality Chef',
    subTitle: 'It is a long established fact that a reader will be distracted',
    icon: 'keyboard-arrow-right',
  },
  {
    id: 2,
    image: carouselTwo,
    title: 'Swift Delivery',
    subTitle: 'It is a long established fact that a reader will be distracted',
    icon: 'keyboard-arrow-right',
  },
  {
    id: 3,
    image: carouselThree,
    title: 'Choose your Tasty Food',
    subTitle: 'It is a long established fact that a reader will be distracted',
    icon: 'keyboard-arrow-right',
  },
  {
    id: 4,
    image: carouselFour,
    title: '10% Discount On first order',
    subTitle: 'It is a long established fact that a reader will be distracted',
    icon: 'keyboard-arrow-right',
  },
];

export default carouselData;
