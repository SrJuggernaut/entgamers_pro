'use client'
import CreateRecoverPasswordForm from '@/app/recover-password/CreateRecoverPasswordForm'
import { useSearchParams } from 'next/navigation'
import type { FC } from 'react'
import UpdateRecoverPasswordForm, { type UpdateRecoverPasswordFormProps } from './UpdateRecoverPasswordForm'

const ManageRecoverPassword: FC = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const secret = searchParams.get('secret')
  const recoverData: UpdateRecoverPasswordFormProps | undefined = (userId !== null && secret !== null) ? { userId, secret } : undefined

  if (recoverData === undefined) {
    return <CreateRecoverPasswordForm />
  } else {
    return (
      <UpdateRecoverPasswordForm
        {...recoverData}
      />
    )
  }
}

export default ManageRecoverPassword
