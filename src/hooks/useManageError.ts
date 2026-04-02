import { addAlert } from '@/state/feedbackSlice'
import { nanoid } from '@reduxjs/toolkit'
import { AppwriteException } from 'appwrite'
import { useAppDispatch } from './useAppDispatch'

type ManageError = (error: unknown, errorTitle: string, defaultMessage?: string, severity?: 'error') => void

type UseManageError = () => {
  manageError: ManageError
}

const useManageError: UseManageError = () => {
  const dispatch = useAppDispatch()
  const manageError: ManageError = (error, errorTitle, defaultMessage, severity): void => {
    if (error instanceof AppwriteException) {
      dispatch(addAlert({
        id: nanoid(),
        title: errorTitle,
        message: error.message ?? defaultMessage,
        severity: severity ?? 'error'
      }))
    } else if (error instanceof Error) {
      dispatch(addAlert({
        id: nanoid(),
        title: errorTitle,
        message: error.message ?? defaultMessage,
        severity: severity ?? 'error'
      }))
    } else {
      dispatch(addAlert({
        id: nanoid(),
        title: errorTitle,
        message: 'Error desconocido',
        severity: severity ?? 'error'
      }))
    }
  }
  return { manageError }
}

export default useManageError
