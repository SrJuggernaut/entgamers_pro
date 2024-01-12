'use client'
import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import FormGroup from '@/components/ui/form/FormGroup'
import Input from '@/components/ui/form/Input'
import PasswordInput from '@/components/ui/form/PasswordInput'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { addAlert } from '@/state/feedbackSlice'
import { nanoid } from '@reduxjs/toolkit'
import { AppwriteException } from 'appwrite'
import { register } from 'entgamers-database/frontend/session'
import { useFormik } from 'formik'
import { type FC } from 'react'
import { object, ref, string } from 'yup'

interface RegisterData {
  email: string
  password: string
  passwordConfirmation: string
}

const RegisterSchema = object({
  email: string().email('El correo electrónico no es válido').required('El correo electrónico es requerido'),
  password: string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .matches(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
    .matches(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
    .matches(/[0-9]/, 'La contraseña debe tener al menos un número')
    .required('La contraseña es requerida'),
  passwordConfirmation: string().oneOf([ref('password')], 'Las contraseñas no coinciden').required('La confirmación de la contraseña es requerida')
})

const RegisterForm: FC = () => {
  const dispatch = useAppDispatch()

  const formik = useFormik<RegisterData>({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    onSubmit: async ({ email, password }) => {
      try {
        await register(email, password)
        dispatch(addAlert({
          id: nanoid(),
          title: 'Registro completado',
          message: 'Ahora puedes iniciar sesión',
          severity: 'success'
        }))
        formik.resetForm()
      } catch (error) {
        if (error instanceof AppwriteException) {
          dispatch(addAlert({
            id: nanoid(),
            message: error.message,
            title: 'Error mientras se registraba',
            severity: 'error'
          }))
        } else {
          dispatch(addAlert({
            id: nanoid(),
            message: 'Error desconocido',
            title: 'Error mientras se registraba',
            severity: 'error'
          }))
        }
      }
    },
    validationSchema: RegisterSchema
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <FormGroup>
        <label htmlFor="email">Correo electrónico</label>
        <Input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          status={formik.touched.email !== undefined && formik.errors.email !== undefined ? 'danger' : undefined}
          onBlur={formik.handleBlur}
          fullWidth
        />
        {formik.touched.email !== undefined && formik.errors.email !== undefined && (
          <Typography variant="caption" color="danger">{formik.errors.email}</Typography>
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Contraseña</label>
        <PasswordInput
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          status={formik.touched.password !== undefined && formik.errors.password !== undefined ? 'danger' : undefined}
          onBlur={formik.handleBlur}
          fullWidth
        />
        {formik.touched.password !== undefined && formik.errors.password !== undefined && (
          <Typography variant="caption" color="danger">{formik.errors.password}</Typography>
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor="passwordConfirmation">Confirmación de la contraseña</label>
        <PasswordInput
          id="passwordConfirmation"
          name="passwordConfirmation"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
          status={formik.touched.passwordConfirmation !== undefined && formik.errors.passwordConfirmation !== undefined ? 'danger' : undefined}
          onBlur={formik.handleBlur}
          fullWidth
        />
        {formik.touched.passwordConfirmation !== undefined && formik.errors.passwordConfirmation !== undefined && (
          <Typography variant="caption" color="danger">{formik.errors.passwordConfirmation}</Typography>
        )}
      </FormGroup>
      <FormGroup>
        <Button
          type="submit"
        >
          Registrarse
        </Button>
      </FormGroup>
    </form>
  )
}
export default RegisterForm
