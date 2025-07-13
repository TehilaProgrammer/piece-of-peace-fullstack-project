import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import hotelReducer from '../features/hotel/hotelSlice'
import roomReducer from '../features/room/roomSlice'
import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
  reducer: { 
    user: userReducer,
    hotel: hotelReducer,
    room: roomReducer,
    order: orderReducer,
  },
});



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



 