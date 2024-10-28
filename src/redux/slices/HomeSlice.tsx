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

  export interface RestaurantNearbyProduct {
    _id: string;
    ownerId: string;
    businessName: string;
    ownerName: string;
    email: string;
    accountCompleted: boolean;
    location: {
      type: "Point";
      coordinates: [number, number]; // Tuple for latitude and longitude
    };
    createdAt: string; // ISO string for date
    updatedAt: string; // ISO string for date
    distance: number; // Distance in meters or kilometers
  }
  
  

export interface InitialState {
  products: Product[];
  RestaurantNearbyProducts: RestaurantNearbyProduct[];
  loading: boolean;
  error: string;
}

const initialState: InitialState = {
  products: [],
  RestaurantNearbyProducts:[],
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
      const response = await fetch('http://192.168.1.22:8089/todayspecials', {
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

export const getRestaurantNearby = createAsyncThunk(
    'restaurantNearby',
    async(_, {rejectWithValue}) => {
        try {
            const token = await AsyncStorage.getItem("loginToken");
            // console.log('inside token-----');
            console.log("token---- getRestaurantNearby", token);
            
            
            if(!token) {
            console.log('Token is NOTTTTT found!!!----');

                return rejectWithValue('Token not found');
            }
            console.log('Token is found!!!----');
            
            const lat = 17.448294;
            const long = 78.391487;
            const response = await fetch(`http://192.168.1.22:8089/business/nearby?lat=${lat}&long=${long}`, {
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  token
                }
            })
            const result = await response.json();
            // console.log("first",`http://192.168.1.22:8089/business/nearby?lat=${lat}long=${long}`)
            console.log('result ---- getRestaurantNearby', result);
            return result;
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('error---RESTUARANT');
                
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
      })

      .addCase(getRestaurantNearby.pending, state => {
        state.loading = true;
      })
      .addCase(getRestaurantNearby.fulfilled,
        (state, action) => {
          state.loading = false;
          console.log(action.payload);
          
          state.RestaurantNearbyProducts = action.payload

        },
      )
      .addCase(getRestaurantNearby.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          text2: action.payload as string,
        })
      })

  },
});

export default HomeSlice.reducer;