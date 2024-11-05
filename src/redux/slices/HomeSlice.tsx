import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

export interface TodaySpecials {
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

export interface SingleRestaurantTodaySpecial {
  _id: string;
  name: string;
  description: string;
  category: string;
  categoryId: string;
  images: string[];
  subCategory?: string;
  price: number;
  quantity: number;
  units: string;
  businessId: string;
  discountPrice?: number;
  weight: number;
  isActive: boolean;
  packingCharge: number;
  sizes: string[];
  isTodaySpecial: boolean;
  specialDayDate: string;
  isBestChoice: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantNearbyProduct {
  _id: string;
  ownerId: string;
  businessName: string;
  ownerName: string;
  email: string;
  accountCompleted: boolean;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  createdAt: string;
  updatedAt: string;
  distance: number;
}

export interface BestChoice {
  _id: string;
  name: string;
  description: string;
  category: string;
  categoryId: {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  images: string[];
  subCategory: string;
  price: number;
  quantity: number;
  units: string;
  businessId: {
    location: {
      type: 'Point';
      coordinates: number[];
    };
    _id: string;
    ownerId: string;
    businessName: string;
    ownerName: string;
    email: string;
    accountCompleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  discountPrice: number;
  weight: number;
  isActive: boolean;
  packingCharge: number;
  isTodaySpecial: boolean;
  specialDayDate?: string | null;
  isBestChoice: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HandleSingleRestaurant {
  location: {
    type: string;
    coordinates: [number, number];
  };
  _id: string;
  ownerId: string;
  businessName: string;
  ownerName: string;
  email: string;
  accountCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HandleSingleRestaurantBestChoice {
  _id: string;
  name: string;
  description: string;
  category: string;
  categoryId: string;
  images: string[];
  subCategory?: string;
  price: number;
  quantity: number;
  units: string;
  businessId: string;
  discountPrice?: number;
  weight: number;
  isActive: boolean;
  packingCharge: number;
  sizes: string[];
  isTodaySpecial: boolean;
  specialDayDate: string | null;
  isBestChoice: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InitialState {
  todaySpecials: TodaySpecials[];
  singleRestaurantTodaySpecials: SingleRestaurantTodaySpecial[];
  RestaurantNearbyProducts: RestaurantNearbyProduct[];
  HandleSingleRestaurantBestChoices: HandleSingleRestaurantBestChoice[];
  HandleSingleRestaurant: HandleSingleRestaurant;
  BestChoices: BestChoice[];
  loading: boolean;
  error: string;
}

const initialState: InitialState = {
  todaySpecials: [],
  singleRestaurantTodaySpecials: [],
  RestaurantNearbyProducts: [],
  HandleSingleRestaurantBestChoices: [],
  HandleSingleRestaurant: {
    location: {
      type: '',
      coordinates: [0, 0],
    },
    _id: '',
    ownerId: '',
    businessName: '',
    ownerName: '',
    email: '',
    accountCompleted: false,
    createdAt: '',
    updatedAt: '',
  },
  BestChoices: [],
  loading: false,
  error: '',
};

export const getTodaySpecial = createAsyncThunk(
  'todaySpecial',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('loginToken');
      if (!token) {
        return rejectWithValue('Token not found');
      }
      const response = await fetch('http://192.168.1.13:8089/todayspecials', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
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
  },
);

export const getRestaurantNearby = createAsyncThunk(
  'restaurantNearby',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('loginToken');

      if (!token) {
        return rejectWithValue('Token not found');
      }

      const lat = 17.448294;
      const long = 78.394587;
      const response = await fetch(
        `http://192.168.1.13:8089/business/nearby?lat=${lat}&long=${long}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      const result = await response.json();
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred!');
    }
  },
);

export const handleSingleRestaurant = createAsyncThunk(
  'handleSingleRestaurant',
  async (buseinessId: string, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('loginToken');
    if (!token) {
      return rejectWithValue('Token not found');
    }
    try {
      const response = await fetch(
        `http://192.168.1.13:8089/business/${buseinessId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );

      const result = await response.json();
      if (response.ok) {
        return result;
      } else {
        return rejectWithValue(result.error.error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(
        'An unknown error occurred! handleSingleRestaurant',
      );
    }
  },
);

export const handleSingleRestaurantTodaySpecial = createAsyncThunk(
  'handleSingleRestaurantTodaySpecial',
  async (buseinessId: string, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('loginToken');
    if (!token) {
      return rejectWithValue('Token not found');
    }
    try {
      const response = await fetch(
        `http://192.168.1.13:8089/todayspecials/business/${buseinessId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
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
      return rejectWithValue(
        'An unknown error occurred! handleSingleRestaurantTodaySpecial',
      );
    }
  },
);

export const handleBestChoice = createAsyncThunk(
  'getBestChoice',
  async (_, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('loginToken');
    if (!token) {
      return rejectWithValue('Token not found!');
    }
    try {
      const response = await fetch(
        `http://192.168.1.13:8089/bestchoice/best-choice}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );

      const result = await response.json();
      if (response.ok) {
        return result;
      } else {
        return rejectWithValue(result.error.error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(
        'An unknown error occurred! handleSingleRestaurantTodaySpecial',
      );
    }
  },
);

export const handleSingleRestaurantBestChoice = createAsyncThunk(
  'singleRestaurantBestChoice',
  async (buseinessId: string, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('loginToken');
      if (!token) {
        return rejectWithValue('Token is not found!');
      }
      const response = await fetch(
        `http://192.168.1.13:8089/bestchoice/business/${buseinessId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );

      const result = await response.json();

      if (response.ok) {
        return result.data.bestChoice;
      } else {
        return rejectWithValue(result.error.error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(
        'An unknown error occurred! handleSingleRestaurantBestChoice',
      );
    }
  },
);

export const HomeSlice = createSlice({
  name: 'HomeSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTodaySpecial.pending, state => {
        state.loading = true;
      })
      .addCase(getTodaySpecial.fulfilled, (state, action) => {
        state.loading = false;
        state.todaySpecials = action.payload;
      })
      .addCase(getTodaySpecial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          text2: action.payload as string,
        });
      })

      .addCase(getRestaurantNearby.pending, state => {
        state.loading = true;
      })
      .addCase(getRestaurantNearby.fulfilled, (state, action) => {
        state.loading = false;

        state.RestaurantNearbyProducts = action.payload;
      })
      .addCase(getRestaurantNearby.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          text2: action.payload as string,
        });
      })
      .addCase(handleSingleRestaurant.pending, state => {
        state.loading = true;
      })
      .addCase(handleSingleRestaurant.fulfilled, (state, action) => {
        state.loading = false;

        state.HandleSingleRestaurant = action.payload;
      })
      .addCase(handleSingleRestaurant.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(handleSingleRestaurantTodaySpecial.pending, state => {
        state.loading = true;
      })
      .addCase(
        handleSingleRestaurantTodaySpecial.fulfilled,
        (state, action) => {
          state.loading = false;
          state.singleRestaurantTodaySpecials = action.payload;
        },
      )
      .addCase(handleSingleRestaurantTodaySpecial.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(handleSingleRestaurantBestChoice.pending, state => {
        state.loading = true;
      })
      .addCase(handleSingleRestaurantBestChoice.fulfilled, (state, action) => {
        state.loading = false;
        state.HandleSingleRestaurantBestChoices = action.payload;
      })
      .addCase(handleSingleRestaurantBestChoice.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(handleBestChoice.pending, state => {
        state.loading = true;
      })
      .addCase(handleBestChoice.fulfilled, (state, action) => {
        state.loading = false;
        state.BestChoices = action.payload;
      })
      .addCase(handleBestChoice.rejected, state => {
        state.loading = false;
      });
  },
});

export default HomeSlice.reducer;
