import {createSlice} from '@reduxjs/toolkit';

interface UserDetails {
  // Define the structure of your user details here
  id: number;
  name: string;
  pass:string;
  // Add other properties as needed
}

const initialState = {
  isLogin: false,
  userDetails: {},
  todoData: [],
  LoginUserDetails: [] as UserDetails[]
};

const globalSlice = createSlice({
  name: 'kabar',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = (action.payload);
    },
    setLoginUserDetails: (state, action: { payload: UserDetails }) => {
      state.LoginUserDetails.push(action.payload);
    },
  },
});

export default globalSlice.reducer;
export const {setIsLogin, setUserDetails, setLoginUserDetails} = globalSlice.actions;