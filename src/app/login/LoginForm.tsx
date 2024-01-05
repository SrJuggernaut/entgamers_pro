'use client'
import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import FormGroup from '@/components/ui/form/FormGroup'
import Input from '@/components/ui/form/Input'
import PasswordInput from '@/components/ui/form/PasswordInput'
import { useFormik } from 'formik'
import { type FC } from 'react'
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
  const formik = useFormik<LoginData>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validationSchema: loginSchema
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
