import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

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

export interface LoginUser {
  mobile_no: string;
  password: string;
  role: string;
  country_code: string;
}

export interface updatePassword {
  country_code: string;
  mobile_no: string;
  newPassword: string;
  confirmPassword: string;
} 

export interface IForgotPassword {
  password: string;
  confirm_password: string;
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
  termsAndConditionData: [],
};

export const loginUser = createAsyncThunk(
  'loginUser',
  async (
    {mobile_no, password, role, country_code}: LoginUser,
    {rejectWithValue},
  ) => {
    const data = {
      mobile_no,
      password,
      role,
      country_code,
    };


    try {
      const response = await fetch('http://192.168.1.52:8089/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });


      const result = await response.json();
      if (response.ok) {
        return {
          token: result.data.jwtToken,
          data: result.data.user,
        };
      } else {
        return rejectWithValue(result.error.error);
      }
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
    {name, mobile_no, email, password, country_code, state, role}: User,
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
      const response = await fetch('http://192.168.1.52:8089/user/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

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
      return rejectWithValue('An unknown error occured!');
    }
  },
);

export const handleSendOtp = createAsyncThunk(
  'sendOtp',
  async ({mobile_no, country_code}: sendOtp, {rejectWithValue}) => {
    const data = {
      mobile_no,
      country_code,
    };

    try {
      const response = await fetch('http://192.168.1.52:8089/user/sendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

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
      return rejectWithValue('An unknown error occurred!');
    }
  },
);

export const handleVerifyOtp = createAsyncThunk(
  'verifyOtp',
  async ({mobile_no, country_code, otp}: verifyOtp, {rejectWithValue}) => {
    const data = {
      mobile_no,
      country_code,
      otp,
    };

    try {
      const response = await fetch('http://192.168.1.52:8089/user/verifyOtp', {
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
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred!');
    }
  },
);

export const handleUpdatePassword = createAsyncThunk(
  'updatePassword',
  async ({mobile_no, country_code, newPassword,confirmPassword}: updatePassword, {rejectWithValue}) => {
    const data = {
      mobile_no,
      country_code,
      newPassword,
      confirmPassword
    };

    try {
      const response = await fetch('http://192.168.1.52:8089/user/updatePassword', {
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
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred!');
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (
    {password, confirm_password, username}: IForgotPassword,
    {rejectWithValue},
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
        },
      );

      if (!response.ok) {
        return rejectWithValue('Something went wrong');
      }

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

export const termsAndCondition = createAsyncThunk(
  'termsAndCondition',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch(
        'http://65.0.108.242/api/v1/terms_and_conditions',
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Something went wrong');
      }

      const result = await response.json();
      return result.terms_and_conditions;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred!');
    }
  },
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingLogin = false;
        state.message = action.payload as string;
      })

      .addCase(registerUser.pending, state => {
        state.loadingLogin = true;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loadingLogin = false;
        state.message = action.payload.message as string;
        state.phone = action.payload.phone;
      })
      .addCase(registerUser.rejected, state => {
        state.loadingLogin = false;
        state.message = 'Please try again!!';
      })
      .addCase(handleSendOtp.pending, state => {
        state.loadingLogin = true;
        state.message = null;
      })
      .addCase(handleSendOtp.fulfilled, (state, action) => {
        state.loadingLogin = false;
        state.message = action.payload.message as string;
        Toast.show({
          type: 'success',
          text1: action.payload.data.message || 'OTP Verified Successfully!',
        });
      })
      .addCase(handleSendOtp.rejected, (state, action) => {
        state.loadingLogin = false;
        state.message = 'Please try again!!';
        Toast.show({
          type: 'error',
          text1: (action.payload as string) || 'OTP Verification Failed!',
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

      .addCase(handleUpdatePassword.pending, state => {
        state.loadingLogin = true;
        state.message = null;
      })
      .addCase(handleUpdatePassword.fulfilled, (state, action) => {
        state.loadingLogin = false;
        state.isOtpVerified = true;
        state.message = action.payload.message as string;
        Toast.show({
          type: 'success',
          text1: 'Password Updated Successfully 🤩🥳.'
        });
      })
      .addCase(handleUpdatePassword.rejected, (state, action) => {
        state.loadingLogin = false;
        state.message = action.payload as string;
        Toast.show({
          type: 'error',
          text1: 'Password Update Failed! Please try again 😕.',
        });
      })

      .addCase(forgotPassword.pending, state => {
        state.loadingLogin = true;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loadingLogin = false;
        state.message = action.payload.message;
        state.phone = action.payload.phone;
      })
      .addCase(forgotPassword.rejected, state => {
        state.loadingLogin = false;
        state.message = 'Please try again!!';
      })
      .addCase(termsAndCondition.pending, state => {
        state.loadingLogin = true;
        state.message = null;
      })
      .addCase(termsAndCondition.fulfilled, (state, action) => {
        state.loadingLogin = false;
        state.termsAndConditionData = action.payload;
        state.message = action.payload.message;
      })
      .addCase(termsAndCondition.rejected, state => {
        state.loadingLogin = false;
        state.message = 'Please try again!!';
      });
  },
});

export const {setToken, getPhoneOrEmail, getOtp} = authSlice.actions;
export default authSlice.reducer;
