import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  subs: [],
  subdata: [],
  levels: [],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    dispatchUser: (state, action) => {
        state.user = action.payload
    },
    dispatchSubscriptions: (state, action) => {
      state.subs = action.payload
    },
    dispatchSubscriptiondata: (state, action) => {
      state.subdata = action.payload
    },
    dispatchLevels: (state, action) => {
      state.levels = action.payload
    }
  },
})

export const { dispatchUser, dispatchSubscriptions, dispatchSubscriptiondata, dispatchLevels} = counterSlice.actions

export default counterSlice.reducer