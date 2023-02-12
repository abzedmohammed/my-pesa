import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const url = process.env.REACT_APP_MY_PESA_API

const initialState = {
  isLoggedIn: false,
  stateLoading: true,
  user: {},
  loginError: '',
  registerError: '',
  loading: false,
}

export const signIn = createAsyncThunk('customer/signIn', data => {
  axios.post(url + '/users', data)
  .then(res => res.data)
})

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    alterState: (state) => {
        state.stateLoading = false;
    }
  },
  extraReducers: builder => {
    builder.addCase(signIn.pending, state => {
      state.loading = true;
    })

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload.
    })
  }
})

export const { alterState } = customerSlice.actions

export default customerSlice.reducer