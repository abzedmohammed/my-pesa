import { configureStore } from '@reduxjs/toolkit'
import bankReducer from '../features/bank/bankSlice'
import customerReducer from '../features/customer/customerSlice'

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    bank: bankReducer
  },
})