'use client'
import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import FormGroup from '@/components/ui/form/FormGroup'
import Input from '@/components/ui/form/Input'
import { css } from '@/styled-system/css'
import { type TeamApplyData } from '@/types/teamApply'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useEffect, type FC } from 'react'

const ApplyForm: FC = () => {
  const searchParams = useSearchParams()

  const formik = useFormik<TeamApplyData>({
    initialValues: {
      name: '',
      email: '',
      discordName: '',
      message: '',
      role: 'administrator'
    },
    onSubmit: (values) => {
      console.log(values)
    }
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
            formik.setFieldValue('role', 'moderator')
              .catch((error) => {
                console.error(error)
              })
          }}
          disabled={formik.values.role === 'moderator'}
        >
          Moderador
        </Button>
        <Button
          type='button'
          onClick={() => {
            formik.setFieldValue('role', 'administrator')
              .catch((error) => {
                console.error(error)
              })
          }}
          disabled={formik.values.role === 'administrator'}
        >
          Administrador
        </Button>
        <Button
          type='button'
          onClick={() => {
            formik.setFieldValue('role', 'collaborator')
              .catch((error) => {
                console.error(error)
              })
          }}
          disabled={formik.values.role === 'collaborator'}
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
            {formik.touched.name !== undefined && formik.errors.name !== undefined && (
              <Typography variant='caption' color='danger'>
                {formik.errors.name}
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
            {formik.touched.email !== undefined && formik.errors.email !== undefined && (
              <Typography variant='caption' color='danger'>
                {formik.errors.email}
              </Typography>
            )}
          </FormGroup>
          <FormGroup>
            <label htmlFor='discordName'>Nombre de Discord</label>
            <Input
              id='discordName'
              type='text'
              value={formik.values.discordName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.discordName !== undefined && formik.errors.discordName !== undefined && (
              <Typography variant='caption' color='danger'>
                {formik.errors.discordName}
              </Typography>
            )}
          </FormGroup>
          <FormGroup>
            <label htmlFor='message'>Mensaje</label>
            <Input
              id='message'
              type='text'
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.message !== undefined && formik.errors.message !== undefined && (
              <Typography variant='caption' color='danger'>
                {formik.errors.message}
              </Typography>
            )}
          </FormGroup>
          <Button
            type='submit'
          >
            Enviar
          </Button>
        </div>
        <div
          className={css({
            overflow: 'hidden',
            order: { base: 1, md: 2 },
            paddingBlock: 'medium'
          })}
        >
          <AnimatePresence mode='wait' initial={false}>
            {formik.values.role === 'moderator' && (
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
                    <FontAwesomeIcon icon={faChevronRight} fixedWidth listItem /> <strong>Imparcialidad</strong>
                    <br />
                    La comunidad esta conformada por amigos y conocidos, por lo tanto es importante poder actuar de forma imparcial y responsable.
                  </li>
                </ul>
                <Typography variant='h3'>Beneficios</Typography>
                <ul className="fa-ul">
                  <li>
                    <FontAwesomeIcon icon={faChevronRight} fixedWidth listItem /> <strong>Experiencia</strong>
                    <br />
                    Uno de los objetivos de la comunidad es brindar experiencia en gestión y desarrollo de proyectos equiparable a un entorno laboral, que sea comprobable y útil.
                  </li>
                </ul>
              </motion.div>
            )}
            {formik.values.role === 'collaborator' && (
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
                    <FontAwesomeIcon icon={faChevronRight} fixedWidth listItem /> <strong>Profesionalismo</strong>
                    <br />
                    La comunidad siempre intenta conseguir el mayor nivel de calidad en todos sus proyectos, por lo que buscamos gente dispuesta a otorgar este nivel de profesionalismo para el disfrute de la comunidad.
                  </li>
                </ul>
                <Typography variant='h3'>Beneficios</Typography>
                <ul className="fa-ul">
                  <li>
                    <FontAwesomeIcon icon={faChevronRight} fixedWidth listItem /> <strong>Apoyo</strong>
                    <br />
                    Puedes contar con el apoyo de la comunidad para tus proyectos, ya sea en forma de difusión, asesoramiento o recursos.
                  </li>
                </ul>
              </motion.div>
            )}
            {formik.values.role === 'administrator' && (
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
                    <FontAwesomeIcon icon={faChevronRight} fixedWidth listItem /> <strong>Profesionalismo</strong>
                    <br />
                    La comunidad siempre intenta conseguir el mayor nivel de calidad en todos sus proyectos, por lo que buscamos gente dispuesta a otorgar este nivel de profesionalismo para el disfrute de la comunidad.
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faChevronRight} fixedWidth listItem /> <strong>Constancia</strong>
                    <br />
                    La comunidad busca gente que en sus posibilidades sea activa, que pueda estar al tanto de lo que pasa en ella.
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faChevronRight} fixedWidth listItem /> <strong>Proactividad</strong>
                    <br />
                    La comunidad esta en constante crecimiento, por eso, buscamos gente que ayude a buscar nuevas oportunidades para diferentes proyectos y actividades de interés a la comunidad.
                  </li>
                </ul>
                <Typography variant='h3'>Beneficios</Typography>
                <ul className="fa-ul">
                  <li>
                    <FontAwesomeIcon icon={faChevronRight} fixedWidth listItem /> <strong>Experiencia</strong>
                    <br />
                    Uno de los objetivos de la comunidad es brindar experiencia en gestión y desarrollo de proyectos equiparable a un entorno laboral, que sea comprobable y útil.
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faChevronRight} fixedWidth listItem /> <strong>Capacitación</strong>
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
