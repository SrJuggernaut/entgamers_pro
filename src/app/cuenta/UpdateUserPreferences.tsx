'use client'
import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import FormGroup from '@/components/ui/form/FormGroup'
import TextArea from '@/components/ui/form/TextArea'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import useManageError from '@/hooks/useManageError'
import useSession from '@/hooks/useSession'
import { setCurrentUser } from '@/state/sessionSlice'
import { updatePreferences, type UserPreferences } from 'entgamers-database/frontend/session'
import { useFormik } from 'formik'
import { useEffect, type FC } from 'react'
import { array, object, string, type ObjectSchema } from 'yup'

const socialLinksSchema: ObjectSchema<UserPreferences> = object({
  bio: string().max(280, 'La descripción debe tener menos de 280 caracteres'),
  profilePicture: string().url('La imagen debe ser una URL'),
  socialLinks: array().of(
    object({
      label: string().required('La etiqueta es requerida'),
      url: string().url('La URL debe ser una URL').required('La URL es requerida')
    })
  ).min(0)
})

const UpdateUserPreferences: FC = () => {
  const { status, session, user } = useSession('/login')
  const dispatch = useAppDispatch()
  const { manageError } = useManageError()

  const formik = useFormik<UserPreferences>({
    initialValues: {
      bio: '',
      profilePicture: '',
      socialLinks: []
    },
    onSubmit: async ({ bio, profilePicture, socialLinks }) => {
      try {
        const updatedUserWithPreferences = await updatePreferences({ bio, profilePicture, socialLinks })
        dispatch(setCurrentUser(updatedUserWithPreferences))
      } catch (error) {
        manageError(error, 'Error mientras se actualizaba las preferencias', ' Error desconocido mientras se actualizaba las preferencias', 'error')
      }
    },
    validationSchema: socialLinksSchema,
    validateOnMount: true
  })

  useEffect(() => {
    if (status === 'idle' && session !== undefined) {
      formik.setValues({
        bio: user?.prefs.bio ?? '',
        profilePicture: user?.prefs.profilePicture ?? '',
        socialLinks: user?.prefs.socialLinks ?? []
      })
        .catch(console.error)
    }
  }, [status, session])

  if (status !== 'idle' || session === undefined) {
    // TODO: Replace with Skeleton
    return null
  }

  return (
    <>
      <Typography
        variant='h3'
      >
        Preferencias
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
      >
        <FormGroup>
          <label
            htmlFor='bio'
          >
            Biografia
          </label>
          <TextArea
            id='bio'
            name='bio'
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            status={formik.touched.bio !== undefined && formik.errors.bio !== undefined ? 'danger' : undefined}
          />
        </FormGroup>
        {/* TODO: Add Profile Picture and Social Links fields */}
        <FormGroup>
          <Button
            type='submit'
            disabled={formik.isSubmitting || !formik.isValid}
            fullWidth
          >
            Actualizar
          </Button>
        </FormGroup>
      </form>
    </>
  )
}

export default UpdateUserPreferences
