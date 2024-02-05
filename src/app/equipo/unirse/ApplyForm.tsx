'use client'
import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import FormGroup from '@/components/ui/form/FormGroup'
import Input from '@/components/ui/form/Input'
import TextArea from '@/components/ui/form/TextArea'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { addAlert } from '@/state/feedbackSlice'
import { css } from '@/styled-system/css'
import { teamApplicationDataSchema, type TeamApplicationData } from '@/utilities/teamApplication'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, type FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { nanoid } from '@reduxjs/toolkit'
import { useFormik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useEffect, type FC } from 'react'

const ApplyForm: FC = () => {
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()

  const formik = useFormik<TeamApplicationData>({
    initialValues: {
      name: '',
      email: '',
      discord: '',
      message: '',
      role: 'Moderator',
      status: 'Pending'
    },
    onSubmit: async (values) => {
      try {
        await fetch('/api/team-applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
        dispatch(addAlert({
          id: nanoid(),
          title: 'Formulario enviado',
          message: 'Gracias por interesarte en unirte al equipo',
          severity: 'success'
        }))
      } catch (error) {
        if (error instanceof Error) {
          dispatch(addAlert({
            id: nanoid(),
            title: 'Error al enviar el formulario',
            message: error.message,
            severity: 'error'
          }))
          return
        }
        console.error('Error al enviar el formulario', error)
        dispatch(addAlert({
          id: nanoid(),
          title: 'Error al enviar el formulario',
          message: 'Error desconocido',
          severity: 'error'
        }))
      }
    },
    validationSchema: teamApplicationDataSchema,
    isInitialValid: false
  })
  useEffect(() => {
    if (searchParams.has('role')) {
      formik.setFieldValue('role', searchParams.get('role'))
        .catch((error) => {
          console.error(error)
        })
    }
  }, [])

  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: { base: 'column', md: 'row' },
          justifyContent: 'space-evenly',
          gap: 'medium'
        })}
      >
        <Button
          type='button'
          onClick={() => {
            formik.setFieldValue('role', 'Moderator')
              .catch((error) => {
                console.error(error)
              })
          }}
          disabled={formik.values.role === 'Moderator'}
        >
          Moderador
        </Button>
        <Button
          type='button'
          onClick={() => {
            formik.setFieldValue('role', 'Admin')
              .catch((error) => {
                console.error(error)
              })
          }}
          disabled={formik.values.role === 'Admin'}
        >
          Administrador
        </Button>
        <Button
          type='button'
          onClick={() => {
            formik.setFieldValue('role', 'Collaborator')
              .catch((error) => {
                console.error(error)
              })
          }}
          disabled={formik.values.role === 'Collaborator'}
        >
          Colaborador
        </Button>
      </div>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
          gap: 'medium'
        })}
      >
        {formik.submitCount <= 0
          ? (
            <div
              className={css({
                order: { base: 2, md: 1 }
              })}
            >
              <FormGroup>
                <label htmlFor='name'>Nombre</label>
                <Input
                  id='name'
                  type='text'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name !== undefined && formik.errors.name !== undefined
                  ? (
                    <Typography variant='caption' color='danger'>
                      {formik.errors.name}
                    </Typography>
                  )
                  : (
                    <Typography variant='caption' color='info'>
                      Tu nombre.
                    </Typography>
                  )}
              </FormGroup>
              <FormGroup>
                <label htmlFor='email'>Email</label>
                <Input
                  id='email'
                  type='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email !== undefined && formik.errors.email !== undefined
                  ? (
                    <Typography variant='caption' color='danger'>
                      {formik.errors.email}
                    </Typography>
                  )
                  : (
                    <Typography variant='caption' color='info'>
                      Tu email, para poder contactarte.
                    </Typography>
                  )
                }
              </FormGroup>
              <FormGroup>
                <label htmlFor='discord'>Nombre de Discord</label>
                <Input
                  id='discord'
                  type='text'
                  value={formik.values.discord}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.discord !== undefined && formik.errors.discord !== undefined
                  ? (
                    <Typography variant='caption' color='danger'>
                      {formik.errors.discord}
                    </Typography>
                  )
                  : (
                    <Typography variant='caption' color='info'>
                      Tu nombre de Discord, para poder contactarte.
                    </Typography>
                  )
                }
              </FormGroup>
              <FormGroup>
                <label htmlFor='message'>Mensaje</label>
                <TextArea
                  id='message'
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.message !== undefined && formik.errors.message !== undefined
                  ? (
                    <Typography variant='caption' color='danger'>
                      {formik.errors.message}
                    </Typography>
                  )
                  : (
                    <Typography variant='caption' color='info'>
                      ¿Por que te gustaría unirte al equipo?, ¿Que te gustaría hacer?, etc.
                    </Typography>
                  )
                }
              </FormGroup>
              <div
                className={css({
                  paddingBlock: 'medium'
                })}
              >
                <Button
                  type='submit'
                  disabled={!formik.isValid || !formik.dirty}
                  fullWidth

                >
                  Enviar
                </Button>
              </div>
            </div>
          )
          : (
            <div
              className={css({
                order: { base: 2, md: 1 },
                paddingBlock: 'medium'
              })}
            >
              <div
                className={css({
                  backgroundColor: 'surface',
                  borderRadius: 'medium',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                })}
              >
                <Typography variant='h2' align="center">¡Gracias por interesarte en unirte al equipo!</Typography>
                <Typography variant='body1'>
                  El equipo de EntGamers se pondrá en contacto contigo a la brevedad posible.
                </Typography>
              </div>
            </div>
          )
        }
        <div
          className={css({
            overflow: 'hidden',
            order: { base: 1, md: 2 },
            paddingBlock: 'medium'
          })}
        >
          <AnimatePresence mode='wait' initial={false}>
            {formik.values.role === 'Moderator' && (
              <motion.div
                key={'motion-moderator'}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
                initial={{ opacity: 0, x: '-250px' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '250px' }}
              >
                <Typography variant='h2' align="center">Moderadores</Typography>
                <Typography variant='body1'>
                  El equipo de moderación de EntGamers se encarga de moderar los distintos espacios en los que se desenvuelve la comunidad, como los grupos de Facebook, Discord, Etc.
                </Typography>
                <Typography variant='h3'>Requisitos</Typography>
                <ul className="fa-ul">
                  <li>
                    <FontAwesomeIcon icon={faChevronRight as FontAwesomeIconProps['icon']} fixedWidth listItem /> <strong>Imparcialidad</strong>
                    <br />
                    La comunidad esta conformada por amigos y conocidos, por lo tanto es importante poder actuar de forma imparcial y responsable.
                  </li>
                </ul>
                <Typography variant='h3'>Beneficios</Typography>
                <ul className="fa-ul">
                  <li>
                    <FontAwesomeIcon icon={faChevronRight as FontAwesomeIconProps['icon']} fixedWidth listItem /> <strong>Experiencia</strong>
                    <br />
                    Uno de los objetivos de la comunidad es brindar experiencia en gestión y desarrollo de proyectos equiparable a un entorno laboral, que sea comprobable y útil.
                  </li>
                </ul>
              </motion.div>
            )}
            {formik.values.role === 'Collaborator' && (
              <motion.div
                key={'motion-collaborator'}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
                initial={{ opacity: 0, x: '-250px' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '250px' }}
              >
                <Typography variant='h2' align='center'>Colaborador</Typography>
                <Typography variant='body1'>
                  Los colaboradores son personas ajenas al staff central de EntGamers que nos ayudan a traer contenido, eventos y actividades a la comunidad.
                </Typography>
                <Typography variant='h3'>Requisitos</Typography>
                <ul className="fa-ul">
                  <li>
                    <FontAwesomeIcon icon={faChevronRight as FontAwesomeIconProps['icon']} fixedWidth listItem /> <strong>Profesionalismo</strong>
                    <br />
                    La comunidad siempre intenta conseguir el mayor nivel de calidad en todos sus proyectos, por lo que buscamos gente dispuesta a otorgar este nivel de profesionalismo para el disfrute de la comunidad.
                  </li>
                </ul>
                <Typography variant='h3'>Beneficios</Typography>
                <ul className="fa-ul">
                  <li>
                    <FontAwesomeIcon icon={faChevronRight as FontAwesomeIconProps['icon']} fixedWidth listItem /> <strong>Apoyo</strong>
                    <br />
                    Puedes contar con el apoyo de la comunidad para tus proyectos, ya sea en forma de difusión, asesoramiento o recursos.
                  </li>
                </ul>
              </motion.div>
            )}
            {formik.values.role === 'Admin' && (
              <motion.div
                key={'motion-administrator'}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
                initial={{ opacity: 0, x: '-250px' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '250px' }}
              >
                <Typography variant='h2' align='center'>Administradores</Typography>
                <Typography variant='body1'>
                  Los administradores son quienes se encargan de que todo funcione como es debido en la comunidad, desde la moderación de los grupos hasta la organización de eventos y actividades. Son los responsables de que la comunidad siga creciendo y mejorando.
                </Typography>
                <Typography variant='h3'>Requisitos</Typography>
                <ul className="fa-ul">
                  <li>
                    <FontAwesomeIcon icon={faChevronRight as FontAwesomeIconProps['icon']} fixedWidth listItem /> <strong>Profesionalismo</strong>
                    <br />
                    La comunidad siempre intenta conseguir el mayor nivel de calidad en todos sus proyectos, por lo que buscamos gente dispuesta a otorgar este nivel de profesionalismo para el disfrute de la comunidad.
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faChevronRight as FontAwesomeIconProps['icon']} fixedWidth listItem /> <strong>Constancia</strong>
                    <br />
                    La comunidad busca gente que en sus posibilidades sea activa, que pueda estar al tanto de lo que pasa en ella.
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faChevronRight as FontAwesomeIconProps['icon']} fixedWidth listItem /> <strong>Proactividad</strong>
                    <br />
                    La comunidad esta en constante crecimiento, por eso, buscamos gente que ayude a buscar nuevas oportunidades para diferentes proyectos y actividades de interés a la comunidad.
                  </li>
                </ul>
                <Typography variant='h3'>Beneficios</Typography>
                <ul className="fa-ul">
                  <li>
                    <FontAwesomeIcon icon={faChevronRight as FontAwesomeIconProps['icon']} fixedWidth listItem /> <strong>Experiencia</strong>
                    <br />
                    Uno de los objetivos de la comunidad es brindar experiencia en gestión y desarrollo de proyectos equiparable a un entorno laboral, que sea comprobable y útil.
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faChevronRight as FontAwesomeIconProps['icon']} fixedWidth listItem /> <strong>Capacitación</strong>
                    <br />
                    La comunidad buscara dar capacitación a sus miembros en lo referido a herramientas y procedimientos utilizados.
                  </li>
                  <li></li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  )
}

export default ApplyForm
