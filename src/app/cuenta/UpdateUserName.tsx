'use client'
import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import FormGroup from '@/components/ui/form/FormGroup'
import Input from '@/components/ui/form/Input'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import useSession from '@/hooks/useSession'
import { addAlert } from '@/state/feedbackSlice'
import { nanoid } from '@reduxjs/toolkit'
import { AppwriteException } from 'appwrite'
import { updateName } from 'entgamers-database/frontend/session'
import { useFormik } from 'formik'
import { useEffect, type FC } from 'react'
import { object, string } from 'yup'

interface UpdateUserNameData {
  name: string
}

const UpdateUserNameSchema = object({
  name: string().required('El nombre es requerido')
})

const UpdateUserName: FC = () => {
  const { status, session, user } = useSession('/login')
  const dispatch = useAppDispatch()

  const formik = useFormik<UpdateUserNameData>({
    initialValues: {
      name: ''
    },
    onSubmit: async ({ name }) => {
      try {
        await updateName(name)
        dispatch(addAlert({
          id: nanoid(),
          title: 'Nombre actualizado',
          message: 'Ahora puedes iniciar sesión',
          severity: 'success'
        }))
      } catch (error) {
        if (error instanceof AppwriteException) {
          dispatch(addAlert({
            id: nanoid(),
            message: error.message,
            title: 'Error mientras se actualizaba el nombre',
            severity: 'error'
          }))
        } else {
          dispatch(addAlert({
            id: nanoid(),
            message: 'Error desconocido',
            title: 'Error mientras se actualizaba el nombre',
            severity: 'error'
          }))
        }
      }
    },
    validationSchema: UpdateUserNameSchema,
    validateOnMount: true,
    initialTouched: { name: true }
  })

  useEffect(() => {
    if (status !== 'idle' && session !== undefined) {
      formik.setValues({
        name: user?.name ?? ''
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
      <Typography variant="h2">Cambia tu nombre de usuario</Typography>
      <form
        onSubmit={formik.handleSubmit}
      >
        <FormGroup>
          <label
            htmlFor="name"
          >
            Nombre de usuario
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            status={formik.touched.name !== undefined && formik.errors.name !== undefined ? 'danger' : undefined}
          />
          {formik.touched.name !== undefined && formik.errors.name !== undefined && (
            <Typography variant="caption" color="danger">{formik.errors.name}</Typography>
          )}
        </FormGroup>
        <FormGroup
        >
          <Button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Actualizar nombre de usuario
          </Button>
        </FormGroup>
      </form>
    </>
  )
}
export default UpdateUserName
