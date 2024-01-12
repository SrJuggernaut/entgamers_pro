'use client'
import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import FormGroup from '@/components/ui/form/FormGroup'
import Input from '@/components/ui/form/Input'
import PasswordInput from '@/components/ui/form/PasswordInput'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import useSession from '@/hooks/useSession'
import { addAlert } from '@/state/feedbackSlice'
import { nanoid } from '@reduxjs/toolkit'
import { AppwriteException } from 'appwrite'
import { updateEmail } from 'entgamers-database/frontend/session'
import { useFormik } from 'formik'
import { type FC } from 'react'
import { object, string } from 'yup'

interface UpdateEmailData {
  email: string
  password: string
}

const updateEmailSchema = object({
  email: string().email('El correo electrónico no es válido').required('El correo electrónico es requerido'),
  password: string().required('La contraseña es requerida')
})

const UpdateEmail: FC = () => {
  const { status, session } = useSession('/login')
  const dispatch = useAppDispatch()

  const formik = useFormik<UpdateEmailData>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ email, password }) => {
      try {
        await updateEmail(email, password)
        dispatch(addAlert({
          id: nanoid(),
          title: 'Correo actualizado',
          message: 'Ahora puedes iniciar sesión',
          severity: 'success'
        }))
      } catch (error) {
        if (error instanceof AppwriteException) {
          dispatch(addAlert({
            id: nanoid(),
            message: error.message,
            title: 'Error mientras se actualizaba el correo',
            severity: 'error'
          }))
        } else {
          dispatch(addAlert({
            id: nanoid(),
            message: 'Error desconocido',
            title: 'Error mientras se actualizaba el correo',
            severity: 'error'
          }))
        }
      }
    },
    validationSchema: updateEmailSchema,
    isInitialValid: false
  })

  if (status !== 'idle' || session === undefined) {
    // TODO: Replace with Skeleton
    return null
  }

  return (
    <>
      <Typography variant="h2">Cambia tu correo</Typography>
      <form
        onSubmit={formik.handleSubmit}
      >
        <FormGroup>
          <label
            htmlFor="email"
          >
            Correo
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.touched.email !== undefined && formik.errors.email !== undefined ? 'danger' : undefined}
          />
          {formik.touched.email !== undefined && formik.errors.email !== undefined && (
            <Typography variant="caption" color="danger">{formik.errors.email}</Typography>
          )}
        </FormGroup>
        <FormGroup>
          <label
            htmlFor="password"
          >
            Contraseña
          </label>
          <PasswordInput
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.touched.password !== undefined && formik.errors.password !== undefined ? 'danger' : undefined}
            fullWidth
          />
          {formik.touched.password !== undefined && formik.errors.password !== undefined && (
            <Typography variant="caption" color="danger">{formik.errors.password}</Typography>
          )}
        </FormGroup>
        <FormGroup>
          <Button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Actualizar contraseña
          </Button>
        </FormGroup>
      </form>
    </>
  )
}

export default UpdateEmail
