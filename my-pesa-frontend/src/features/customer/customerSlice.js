import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  stateLoading: true,
  user: {},
  loginError: '',
  registerError: '',
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    alterState: (state) => {
        state.stateLoading = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { alterState } = customerSlice.actions

export default customerSlice.reducer