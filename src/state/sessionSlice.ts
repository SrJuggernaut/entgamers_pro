import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Models } from 'appwrite'
import { type ClanList } from 'entgamers-database/frontend/clanes'
import { type UserWithPreferences } from 'entgamers-database/frontend/session'

export type SessionState =
| {
  status: 'idle' | 'loading' | 'initializing'
  session?: Models.Session
  user?: UserWithPreferences
  clanes?: ClanList
}

const initialState: SessionState = {
  status: 'initializing'
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<SessionState['status']>) => {
      return {
        ...state,
        status: action.payload
      }
    },
    setSession: (state, action: PayloadAction<SessionState['session']>) => {
      return {
        ...state,
        session: action.payload
      }
    },
    setCurrentUser: (state, action: PayloadAction<SessionState['user']>) => {
      return {
        ...state,
        user: action.payload
      }
    },
    setClanes: (state, action: PayloadAction<SessionState['clanes']>) => {
      return {
        ...state,
        clanes: action.payload
      }
    }
  }
})

export const { setStatus, setSession, setCurrentUser, setClanes } = sessionSlice.actions

export default sessionSlice
