import { ImageSourcePropType } from 'react-native';
import { HomeCarosel } from '../assets';

export interface CarouselItemData {
  id: string;
  image: ImageSourcePropType | undefined;
}

export const carouselData: CarouselItemData[] = [
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
