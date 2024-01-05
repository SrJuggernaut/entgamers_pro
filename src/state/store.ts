import feedbackSlice from '@/state/feedbackSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    feedback: feedbackSlice.reducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
