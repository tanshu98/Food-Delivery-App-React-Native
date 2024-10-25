import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

export interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    categoryId: string;
    images: string[];
    subCategory: string;
    price: number;
    quantity: number;
    units: string;
    businessId: string;
    discountPrice: number;
    weight: number;
    isActive: boolean;
    packingCharge: number;
    isTodaySpecial: boolean;
    specialDayDate: string | Date;
    isBestChoice: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
  }
  

export interface TodaySpecial {
  products: Product[];
  loading: boolean;
  error: string;
}

const initialState: TodaySpecial = {
  products: [],
  loading: false,
  error: '',
};

export const getTodaySpecial = createAsyncThunk(
  'todaySpecial',
  async(_, {rejectWithValue}) => {
    try {
        const token = await AsyncStorage.getItem('loginToken');
        console.log("token--getTodaySpecial----", token);
      if (!token) {
        return rejectWithValue('Token not found');
      }
      const response = await fetch('http://192.168.1.15:8089/todayspecials', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  token
        },
      });

      
      const result = await response.json();
      
      if (response.ok) {
        return result.data.product;
      } else {
        return rejectWithValue(result.error.error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred!');
    }
  }
)

export const HomeSlice = createSlice({
  name: 'HomeSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTodaySpecial.pending, state => {
        state.loading = true;
      })
      .addCase(
        getTodaySpecial.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload

        },
      )
      .addCase(getTodaySpecial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          text2: action.payload as string,
        })
      });
  },
});

export default HomeSlice.reducer;