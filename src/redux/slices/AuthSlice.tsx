import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { string } from 'yup';

export interface User {
  name: string;
  mobile_no: string;
  email: string;
  password: string;
  country_code: string;
  state: string;
  role: string;
}

export interface sendOtp {
  mobile_no: string;
  country_code: string;
}

export interface verifyOtp {
  mobile_no: string;
  country_code: string;
  otp: string;
}

export interface ILoginUser {
  login: string;
  password: string;
  fcm_token: string;
}

export interface IForgotPassword {
  password:string;
  confirm_password:string;
  username: string;
}



export interface AuthDataType {
  message: string | null;
  loading: boolean;
  loadingLogin: boolean;
  token: null | string;
  phone: string; 
  phoneOrEmail: string;
  isOtpVerified: boolean;
  isCompleted: boolean;
  otp: string;
  termsAndConditionData: any[];
}



const initialState: AuthDataType = {
  message: null,
  loading: false,
  loadingLogin: false,
  token: null,
  phone: '',
  phoneOrEmail: '',
  isOtpVerified: false,
  isCompleted: false,
  otp: '',
  termsAndConditionData: []
};


export const loginUser = createAsyncThunk(
  'loginUser',
  async (
    {
      login,
      password,
      fcm_token,
    }: ILoginUser,
    {rejectWithValue},
  ) => {
    const data = {
      user: {
        login,
        password,
        fcm_token,
      },
    };

    console.log('LoginUserData', data);

    try {
      const response = await fetch('http://65.0.108.242/api/v1/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
console.log('sing in')
      if (!response.ok) {
        console.log('!repsonse.ok----');
        
        return rejectWithValue('Something went wrong');
      }

      const result = await response.json();
      console.log('result LOGIN--- ', result);
      
      if (result.token) {
        await AsyncStorage.setItem('token', result.token);
        console.log('inside result.token--LOGIN---');
        
        Toast.show({
          type: 'success',
          text1: 'Login successful!',
        });
        return result;
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login failed! Please check your credentials.',
        });
        return rejectWithValue('Invalid login credentials');
      }
      // console.log('---result---response--LOGIN----', result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occured!');
    }
  },
);

export const registerUser = createAsyncThunk(
  'registerUser',
  async (
    {
      name,
      mobile_no,
      email,
      password,
      country_code,
      state,
      role,
    }: User,
    {rejectWithValue},
  ) => {
    const data = {
        name,
        mobile_no,
        email,
        password,
        country_code,
        state,
        role,
    };
    try {
      const response = await fetch('http://192.168.1.14:8089/user/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),      
      });

      if (!response.ok) {
        return rejectWithValue('Something went wrong');
      }

      const result = await response.json();
      console.log('---result---response SIGNUP---AUTH SLICE---', result);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occured!');
    }
  },
);

export const handleSendOtp = createAsyncThunk(
  'sendOtp',
  async (
    {
      mobile_no,
      country_code
    }: sendOtp,
    {rejectWithValue}
  ) => {
    const data = {
      mobile_no,
      country_code
    };

    try {
      const response = await fetch(
        'http://192.168.1.14:8089/user/sendOtp', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        return rejectWithValue('Something went wrong');
      }

      const result = await response.json();
      console.log('SEND OTP AUTH SLICE----', result);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred!');
    }
  }
);

export const handleVerifyOtp = createAsyncThunk(
  'verifyOtp',
  async (
    {
      mobile_no,
      country_code,
      otp
    }: verifyOtp,
    {rejectWithValue}
  ) => {
    const data = {
      mobile_no,
      country_code,
      otp
    };

    try {
      const response = await fetch(
        'http://192.168.1.14:8089/user/verifyOtp', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        return rejectWithValue('Something went wrong');
      }

      const result = await response.json();
      console.log('SEND OTP AUTH SLICE----VERIFYOTP', result);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred!');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (
    {password, confirm_password, username}: IForgotPassword,
    {rejectWithValue}
  ) => {
    const data = {
      user: {
        password,
        confirm_password,
        username,
      },
    };

    try {
      const response = await fetch(
        'http://65.0.108.242/api/v1/users/password', 
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        // console.log('something went wrong');
        return rejectWithValue('Something went wrong');
      }

      const result = await response.json();
      console.log('ForgotPassword result:', result);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred!');
    }
  }
);

export const termsAndCondition = createAsyncThunk(
  'termsAndCondition',
  async (
    _,
    {rejectWithValue}
  ) => {

    try {
      const response = await fetch(
        'http://65.0.108.242/api/v1/terms_and_conditions', 
        {
          method: 'GET',
        }
      );

      // console.log('responseAPI ---- termsAndCondition------------------------',response);
      

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Something went wrong');
      }

      const result = await response.json();
      // console.log('termsAndCondition result---:', result.terms_and_conditions);
      return result.terms_and_conditions;
    } catch (error: unknown) {
      // console.log('Inside error auth---TERMS AND CONDITION-----');
      
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred!');
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    getPhoneOrEmail: (state, action) => {
      state.phoneOrEmail = action.payload;
    },
    getOtp: (state, action) => {
      state.otp = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loadingLogin = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loadingLogin = false;
        state.token = action.payload.token;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingLogin = false;
        state.message = action.payload as string;
        Toast.show({
          type: 'error',
          text1: 'Login failed! Please try again.',
        });
      })

      .addCase(registerUser.pending, state => {
        state.loadingLogin = true;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loadingLogin = false;
        state.message = action.payload.message as string;
        // state.token = action.payload.token
        state.phone = action.payload.phone;
        Toast.show({
          type: 'success', 
          text1: 'Signup Successful🤩🥳.',
        });
      })
      .addCase(registerUser.rejected, state => {
        state.loadingLogin = false;
        state.message = 'Please try again!!';
        Toast.show({
          type: 'error',
          text1: 'Signup failed! Please try again.',
        });
      })
      .addCase(handleSendOtp.pending, state => {
        state.loadingLogin = true;
        state.message = null;
      })
      .addCase(handleSendOtp.fulfilled, (state, action) => {
        state.loadingLogin = false;
        state.message = action.payload.message as string;
        // state.token = action.payload.token
        // state.phone = action.payload.phone;
        Toast.show({
          type: 'success', 
          text1: 'Signup Successful🤩🥳.',
        });
      })
      .addCase(handleSendOtp.rejected, state => {
        state.loadingLogin = false;
        state.message = 'Please try again!!';
        Toast.show({
          type: 'error',
          text1: 'Signup failed! Please try again.',
        });
      })

      .addCase(handleVerifyOtp.pending, state => {
        state.loadingLogin = true;
        state.message = null;
      })
      .addCase(handleVerifyOtp.fulfilled, (state, action) => {
        state.loadingLogin = false;
        state.isOtpVerified = true;
        state.message = action.payload.message as string;
        Toast.show({
          type: 'success',
          text1: 'OTP Verified Successfully!',
        });
      })
      .addCase(handleVerifyOtp.rejected, (state, action) => {
        state.loadingLogin = false;
        state.message = action.payload as string;
        Toast.show({
          type: 'error',
          text1: 'OTP Verification Failed!',
        });
      })

      .addCase(forgotPassword.pending, state => {
        state.loadingLogin = true;
        state.message = null
      })
      .addCase(forgotPassword.fulfilled, (state,action)=> {
        state.loadingLogin = false;
        state.message = action.payload.message
        state.phone = action.payload.phone
      })
      .addCase(forgotPassword.rejected, state => {
        state.loadingLogin = false;
        state.message = 'Please try again!!';
      })
      .addCase(termsAndCondition.pending, state => {
        state.loadingLogin = true;
        state.message = null
      })
      .addCase(termsAndCondition.fulfilled, (state,action)=> {
        state.loadingLogin = false;
        state.termsAndConditionData = action.payload
        state.message = action.payload.message
      })
      .addCase(termsAndCondition.rejected, state => {
        state.loadingLogin = false;
        state.message = 'Please try again!!';
      })
  },
});

export const {setToken, getPhoneOrEmail, getOtp} =
  authSlice.actions;
export default authSlice.reducer;
