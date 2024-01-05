import type { AppDispatch } from '@/state/store'
import { useDispatch } from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
