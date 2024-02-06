'use client'
import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import FormGroup from '@/components/ui/form/FormGroup'
import Input from '@/components/ui/form/Input'
import PasswordInput from '@/components/ui/form/PasswordInput'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { addAlert } from '@/state/feedbackSlice'
import { setCurrentUser, setSession, setStatus } from '@/state/sessionSlice'
import { nanoid } from '@reduxjs/toolkit'
import { AppwriteException } from 'appwrite'
import { getCurrentUser, login } from 'entgamers-database/frontend/session'
import { useFormik } from 'formik'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, type FC } from 'react'
import { object, string } from 'yup'

interface LoginData {
  email: string
  password: string
}

const loginSchema = object({
  email: string().email('El correo electrónico no es válido').required('El correo electrónico es requerido'),
  password: string().required('La contraseña es requerida')
})

const LoginForm: FC = () => {
  const dispatch = useAppDispatch()
  const session = useAppSelector((state) => state.session)
  const router = useRouter()

  const formik = useFormik<LoginData>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ email, password }) => {
      dispatch(setStatus('loading'))
      try {
        const session = await login(email, password)
        const user = await getCurrentUser()
        dispatch(setSession(session))
        dispatch(setCurrentUser(user))
      } catch (error) {
        if (error instanceof AppwriteException) {
          dispatch(addAlert({
            id: nanoid(),
            message: error.message,
            title: 'Error mientras se iniciaba sesión',
            severity: 'error'
          }))
        } else {
          dispatch(addAlert({
            id: nanoid(),
            message: 'Error desconocido',
            title: 'Error mientras se iniciaba sesión',
            severity: 'error'
          }))
        }
      } finally {
        dispatch(setStatus('idle'))
      }
    },
    validationSchema: loginSchema
  })

  useEffect(() => {
    if (session.status === 'idle' && session.session !== undefined) {
      router.push('/')
    }
  }, [session])

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
      <Typography variant="caption" color="muted">
        Perdiste tu contraseña? <NextLink href="/recover-password">Recuperala</NextLink>
      </Typography>
      <FormGroup>
        <Button
          type="submit"
        >
          Iniciar sesión
        </Button>
      </FormGroup>
    </form>
  )
}
export default LoginForm
