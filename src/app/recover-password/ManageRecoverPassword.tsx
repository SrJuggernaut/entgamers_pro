'use client'
import CreateRecoverPasswordForm from '@/app/recover-password/CreateRecoverPasswordForm'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, type FC } from 'react'
import UpdateRecoverPasswordForm, { type UpdateRecoverPasswordFormProps } from './UpdateRecoverPasswordForm'

const ManageRecoverPassword: FC = () => {
  const [recoverData, setRecoverData] = useState<UpdateRecoverPasswordFormProps | undefined>()
  const searchParams = useSearchParams()

  useEffect(() => {
    const userId = searchParams.get('userId')
    const secret = searchParams.get('secret')
    if (userId !== null && secret !== null) {
      setRecoverData({ userId, secret })
    }
  }, [])

  if (recoverData === undefined) {
    return <CreateRecoverPasswordForm />
  } else {
    return <UpdateRecoverPasswordForm
      {...recoverData}
    />
  }
}

export default ManageRecoverPassword
