import feedbackSlice from '@/state/feedbackSlice'
import sessionSlice from '@/state/sessionSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    feedback: feedbackSlice.reducer,
    session: sessionSlice.reducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
