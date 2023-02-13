import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const url = process.env.REACT_APP_MY_PESA_API

const initialState = {
  isLoggedIn: false,
  stateLoading: true,
  user: {},
  loginError: '',
  registerError: '',
  loading: false,
}

export const signIn = createAsyncThunk('customer/signIn', async (data) => {
  const head = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  
  const res = await fetch(url + '/api-token-auth/', head)
  if (res.status === 200){
    return res.json().then(data => data)
  }else{
    return {error: "Invalid username or password!"}
  }
})

export const signUp = createAsyncThunk('customer/signUp', async (data) => {
  const head = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  
  const res = await fetch(url + '/users/', head)
  if (res.status === 201){
    return res.json().then(data => data)
  }else{
    return {error: "Username or email exists try with different credentials."}
  }
})


export const persistUser = createAsyncThunk('customer/persistUser', async (id) => {
  const res = await fetch(url + `/users/${id}/`)
  return res.json().then(data => data)
})

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    alterState: (state) => {
        state.stateLoading = false;
    },
    logout: (state) => {
      state.user = {}
      state.isLoggedIn = false;
      sessionStorage.clear()
    }
  },
  extraReducers: builder => {

    builder.addCase(signIn.pending, state => {
      state.loading = true;
    })

    builder.addCase(signUp.pending, state => {
      state.loading = true;
    })

    builder.addCase(signIn.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = {}
        state.loginError = action.payload.error
      }else{
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload
        sessionStorage.setItem('user_id', action.payload.id)
      }
    })

    builder.addCase(signUp.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = {}
        state.registerError = action.payload.error
      }else{
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload
        state.registerError = ''
        sessionStorage.setItem('user_id', action.payload.id)
      }
    })

    builder.addCase(persistUser.fulfilled, (state, action) => {
      if (action.payload.id) {
        state.isLoggedIn = true;
        state.user = action.payload
      }else{
        return state
      }
    })
  }
})

export const { alterState, logout } = customerSlice.actions

export default customerSlice.reducer