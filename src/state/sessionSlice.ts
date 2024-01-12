import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Models } from 'appwrite'

export interface SessionState {
  status: 'idle' | 'loading' | 'initializing'
  session?: Models.Session
}

const initialState: SessionState = {
  status: 'initializing',
  session: undefined
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<SessionState['status']>) => {
      state.status = action.payload
    },
    setSession: (state, action: PayloadAction<SessionState['session']>) => {
      state.session = action.payload
    }
  }
})

export const { setStatus, setSession } = sessionSlice.actions

export default sessionSlice
