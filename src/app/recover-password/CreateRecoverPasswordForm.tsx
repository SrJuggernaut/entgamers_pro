'use client'
import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import FormGroup from '@/components/ui/form/FormGroup'
import Input from '@/components/ui/form/Input'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import useManageError from '@/hooks/useManageError'
import { addAlert } from '@/state/feedbackSlice'
import { nanoid } from '@reduxjs/toolkit'
import { createPasswordRecovery } from 'entgamers-database/frontend/session'
import { useFormik } from 'formik'
import { type FC } from 'react'
import { object, string } from 'yup'

interface RecoverPasswordData {
  email: string
}

const recoverPasswordSchema = object({
  email: string().email('El correo electrónico no es válido').required('El correo electrónico es requerido')
})

const CreateRecoverPasswordForm: FC = () => {
  const { manageError } = useManageError()
  const dispatch = useAppDispatch()

  const formik = useFormik<RecoverPasswordData>({
    initialValues: {
      email: ''
    },
    onSubmit: async ({ email }) => {
      try {
        const callBackUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/recover-password`
        await createPasswordRecovery(email, callBackUrl)
        dispatch(addAlert({
          id: nanoid(),
          title: 'Solicitud de recuperación de contraseña enviada',
          message: 'Si el correo electrónico está registrado, se enviarán instrucciones para la recuperación de contraseña',
          severity: 'success'
        }))
      } catch (error) {
        manageError(error, 'Error mientras se registraba', 'Error desconocido mientras se registraba', 'error')
      }
    },
    validationSchema: recoverPasswordSchema,
    validateOnMount: true
  })
  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <FormGroup>
        <label htmlFor="email">
          Correo electrónico
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched.email !== undefined && formik.errors.email !== undefined ? 'danger' : 'success'}
        />
        {formik.touched.email !== undefined && formik.errors.email !== undefined
          ? (
            <Typography variant="caption" color="danger">
              {formik.errors.email}
            </Typography>
          )
          : (<Typography variant="caption" color="info">
            Por favor, introduce el correo electrónico con el que te has registrado. Te enviaremos un correo con instrucciones para la recuperación de contraseña
          </Typography>)
        }
      </FormGroup>
      <FormGroup>
        <Button
          type="submit"
          disabled={formik.isSubmitting}
        >
          Enviar correo de recuperación
        </Button>
      </FormGroup>
    </form>
  )
}

export default CreateRecoverPasswordForm
