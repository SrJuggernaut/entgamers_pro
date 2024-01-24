import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import FormGroup from '@/components/ui/form/FormGroup'
import PasswordInput from '@/components/ui/form/PasswordInput'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { addAlert } from '@/state/feedbackSlice'
import { nanoid } from '@reduxjs/toolkit'
import { AppwriteException } from 'appwrite'
import { updatePasswordRecovery } from 'entgamers-database/frontend/session'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'
import { object, ref, string } from 'yup'

export interface UpdateRecoverPasswordFormProps {
  userId: string
  secret: string
}

interface UpdateRecoverPasswordData extends UpdateRecoverPasswordFormProps {
  password: string
  confirmPassword: string
}

const updateRecoverPasswordSchema = object({
  password: string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .matches(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
    .matches(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
    .matches(/[0-9]/, 'La contraseña debe tener al menos un número')
    .required('La contraseña es requerida'),
  confirmPassword: string().oneOf([ref('password')], 'Las contraseñas no coinciden').required('La confirmación de la contraseña es requerida')
})

const UpdateRecoverPasswordForm: FC<UpdateRecoverPasswordFormProps> = (props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const formik = useFormik<UpdateRecoverPasswordData>({
    initialValues: {
      password: '',
      confirmPassword: '',
      userId: props.userId,
      secret: props.secret
    },
    onSubmit: async ({ confirmPassword, password, secret, userId }) => {
      try {
        await updatePasswordRecovery(userId, secret, password, confirmPassword)
        dispatch(addAlert({
          id: nanoid(),
          title: 'Contraseña actualizada',
          message: 'Ahora puedes iniciar sesión',
          severity: 'success'
        }))
        router.push('/login')
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
            title: 'Error mientras se solicitaba la recuperación de contraseña',
            severity: 'error'
          }))
        }
      }
    },
    validationSchema: updateRecoverPasswordSchema,
    isInitialValid: false
  })
  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <FormGroup>
        <label htmlFor="password">
          Contraseña
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
        {formik.touched.password !== undefined && formik.errors.password !== undefined
          ? (
            <Typography variant="caption" color="danger">
              {formik.errors.password}
            </Typography>
          )
          : (
            <Typography variant="caption" color="info">
              Escribe tu nueva contraseña
            </Typography>
          )
        }
      </FormGroup>
      <FormGroup>
        <label htmlFor="confirmPassword">
          Confirmar contraseña
        </label>
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
        <Button
          type="submit"
          disabled={formik.isSubmitting}
        >
          Actualizar contraseña
        </Button>
      </FormGroup>
    </form>
  )
}

export default UpdateRecoverPasswordForm
