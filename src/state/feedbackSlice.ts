import { type Alert } from '@/types/feedback'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface FeedbackState {
  alerts: Alert[]
}

const initialState: FeedbackState = {
  alerts: []
}

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    addAlert (state, action: PayloadAction<Alert>) {
      return {
        ...state,
        alerts: [...state.alerts, action.payload]
      }
    },
    removeAlert (state, action: PayloadAction<string>) {
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== action.payload)
      }
    }
  }
})

export const { addAlert, removeAlert } = feedbackSlice.actions

export default feedbackSlice
