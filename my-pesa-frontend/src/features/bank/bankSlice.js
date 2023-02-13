import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const url = process.env.REACT_APP_MY_PESA_API

const initialState = {
  accounts: [],
  banks: [],
  singleAccount: {},
  singleBank: {},
  loading: false,
  success: false
}

export const getAccounts = createAsyncThunk('bank/getAccounts', async () => {  
  const res = await fetch(url + '/accounts/')
  if (res.status === 200){
    return res.json().then(data => data)
  }else{
    return {error: "Opps sorry! Could not find your account."}
  }
})

export const getSingleBank = createAsyncThunk('bank/getSingleBank', async (id) => {  
    const res = await fetch(url + '/banks/' +  id + '/')
    return res.json().then(data => data)
})

export const getSingleAccount = createAsyncThunk('bank/getSingleAccount', async (id) => {  
    const res = await fetch(url + '/accounts/' +  id + '/')
    return res.json().then(data => data)
})

export const updateSingleAccount = createAsyncThunk('bank/updateSingleAccount', async (data) => {  
    const head = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const res = await fetch(url + '/accounts/' +  data.id + '/', head)
    return res.json().then(data => data)
})

export const getBanks = createAsyncThunk('bank/getBanks', async () => {
  const res = await fetch(url + `/banks/`)
  return res.json().then(data => data)
})

export const createCard = createAsyncThunk('bank/createCard', async (data) => {
    const head = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const res = await fetch(url + `/cards/`, head)
    return res.json().then(data => data)
  })

export const createAccount = createAsyncThunk('bank/createAccount', async (data) => {
    const head = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const res = await fetch(url + `/accounts/`, head)
    return res.json().then(data => data)
  })




export const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    cleanUp: state => {
        state.success = false
    }
  },
  extraReducers: builder => {

    builder.addCase(getAccounts.pending, state => {
      state.loading = true;
    })

    builder.addCase(getAccounts.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.loading = false;
        state.accounts = []
      }else{
        state.loading = false;
        state.accounts = action.payload
      }
    })

    builder.addCase(getSingleBank.fulfilled, (state, action) => {
        state.singleBank = action.payload
    })

    builder.addCase(getSingleAccount.fulfilled, (state, action) => {
        state.singleAccount = action.payload
    })

    builder.addCase(updateSingleAccount.fulfilled, (state, action) => {
        state.success = true
    })

    builder.addCase(createAccount.pending, state => {
        state.loading = true;
      })

    builder.addCase(createAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload)
        state.loading = false
        state.success = true
        // if (action.payload.error) {
        //   state.loading = false;
        //   state.accounts = []
        // }else{
        // state.loading = false;
        // state.accounts = action.payload
        // }
    })

    builder.addCase(createCard.fulfilled, (state, action) => {
    })

    builder.addCase(getBanks.fulfilled, (state, action) => {
      state.banks = action.payload
    })
  }
})

export const { cleanUp } = bankSlice.actions

export default bankSlice.reducer