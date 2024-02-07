'use client'
import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import FormGroup from '@/components/ui/form/FormGroup'
import PasswordInput from '@/components/ui/form/PasswordInput'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import useSession from '@/hooks/useSession'
import { addAlert } from '@/state/feedbackSlice'
import { nanoid } from '@reduxjs/toolkit'
import { AppwriteException } from 'appwrite'
import { updatePassword } from 'entgamers-database/frontend/session'
import { useFormik } from 'formik'
import { type FC } from 'react'
import { object, ref, string } from 'yup'

interface UpdatePasswordData {
  password: string
  confirmPassword: string
  currentPassword: string
}

const updatePasswordSchema = object({
  password: string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .matches(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
    .matches(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
    .matches(/[0-9]/, 'La contraseña debe tener al menos un número')
    .required('La contraseña es requerida'),
  confirmPassword: string().oneOf([ref('password')], 'Las contraseñas no coinciden').required('La confirmación de la contraseña es requerida'),
  currentPassword: string().required('La contraseña actual es requerida')
})

const UpdatePassword: FC = () => {
  const { status, session } = useSession('/login')
  const dispatch = useAppDispatch()

  const formik = useFormik<UpdatePasswordData>({
    initialValues: {
      password: '',
      confirmPassword: '',
      currentPassword: ''
    },
    onSubmit: async ({ password, currentPassword }) => {
      try {
        await updatePassword(password, currentPassword)
        dispatch(addAlert({
          id: nanoid(),
          title: 'Contrasenya actualizada',
          message: 'Ahora puedes iniciar sesión',
          severity: 'success'
        }))
      } catch (error) {
        if (error instanceof AppwriteException) {
          dispatch(addAlert({
            id: nanoid(),
            message: error.message,
            title: 'Error mientras se actualizaba la contraseña',
            severity: 'error'
          }))
        } else {
          dispatch(addAlert({
            id: nanoid(),
            message: 'Error desconocido',
            title: 'Error mientras se actualizaba la contraseña',
            severity: 'error'
          }))
        }
      }
    },
    validationSchema: updatePasswordSchema,
    validateOnMount: true
  })

  if (status !== 'idle' || session === undefined) {
    // TODO: Replace with Skeleton
    return null
  }

  return (
    <>
      <Typography variant="h2">Actualizar contraseña</Typography>
      <form
        onSubmit={formik.handleSubmit}
      >
        <FormGroup>
          <label
            htmlFor="password"
          >
            Nueva contraseña
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
            <Typography variant="caption" color="danger">
              {formik.errors.password}
            </Typography>
          )}
        </FormGroup>
        <FormGroup>
          <label
            htmlFor="confirmPassword"
          >
            Confirmar nueva contraseña
          </label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            status={formik.touched.confirmPassword !== undefined && formik.errors.confirmPassword !== undefined ? 'danger' : undefined}
            fullWidth
          />
          {formik.touched.confirmPassword !== undefined && formik.errors.confirmPassword !== undefined && (
            <Typography variant="caption" color="danger">
              {formik.errors.confirmPassword}
            </Typography>
          )}
        </FormGroup>
        <FormGroup>
          <label
            htmlFor="currentPassword"
          >
            Contraseña actual
          </label>
          <PasswordInput
            id="currentPassword"
            name="currentPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentPassword}
            status={formik.touched.currentPassword !== undefined && formik.errors.currentPassword !== undefined ? 'danger' : undefined}
            fullWidth
          />
          {formik.touched.currentPassword !== undefined && formik.errors.currentPassword !== undefined && (
            <Typography variant="caption" color="danger">
              {formik.errors.currentPassword}
            </Typography>
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
export default UpdatePassword
