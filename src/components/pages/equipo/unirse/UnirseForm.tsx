import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useState, type FC } from 'react'
import { object, string } from 'yup'

import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type UnirseFormData, type UnirseFormProps } from '@interfaces'

const unirseFormSchema = object({
  name: string().required('El nombre es requerido'),
  email: string().email('El email no es válido').required('El email es requerido'),
  role: string().required('El rol es requerido'),
  discordUserName: string().matches(/^.{3,32}#[0-9]{4}$/, 'El formato correcto es userName#0000').required('El nombre de usuario de Discord es requerido'),
  experience: string().required('La experiencia es requerida')
})

const UnirseForm: FC<UnirseFormProps> = ({ role }) => {
  const [isSended, setIsSended] = useState(false)
  const formik = useFormik<UnirseFormData>({
    initialValues: {
      name: '',
      email: '',
      role: role ?? '',
      discordUserName: '',
      experience: ''
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/equipo/unirse/send-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
        if (response.ok) {
          setIsSended(true)
          formik.resetForm()
        } else {
          console.error('Error sending form')
        }
      } catch (error) {
        console.error(error)
      }
    },
    validationSchema: unirseFormSchema
  })
  return isSended
    ? (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginBlock: 1
        }}
      >
        <Typography variant="body1" align="center" color={(theme) => theme.palette.success.main} gutterBottom>
          ¡Gracias por tu interés! Te contactaremos lo antes posible.
        </Typography>
      </Box>
    )
    : (
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          name="name"
          label="Nombre"
          placeholder="Escribe tu nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name !== undefined && formik.errors.name !== undefined }
          helperText={formik.touched.name !== undefined && formik.errors.name}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Correo electrónico"
          placeholder="Usaremos este correo para contactarte"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email !== undefined && formik.errors.email !== undefined }
          helperText={formik.touched.email !== undefined && formik.errors.email}
          fullWidth
          margin="normal"
        />
        <TextField
          name="discordUserName"
          label="Nombre de usuario de Discord"
          placeholder="userName#0000"
          value={formik.values.discordUserName}
          onChange={formik.handleChange}
          error={formik.touched.discordUserName !== undefined && formik.errors.discordUserName !== undefined }
          helperText={formik.touched.discordUserName !== undefined && formik.errors.discordUserName}
          fullWidth
          margin="normal"
        />
        <TextField
          name="experience"
          label="Experiencia"
          placeholder="¿Tienes experiencia en el área? ¿Qué conocimientos tienes?"
          value={formik.values.experience}
          onChange={formik.handleChange}
          error={formik.touched.experience !== undefined && formik.errors.experience !== undefined }
          helperText={formik.touched.experience !== undefined && formik.errors.experience}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Box
          sx={{
            marginBlock: 1
          }}
        >
          <Button
            variant="contained"
            fullWidth
            type="submit"
            endIcon={formik.isSubmitting ? <FontAwesomeIcon icon={faSpinner} spin /> : undefined}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    )
}
export default UnirseForm
