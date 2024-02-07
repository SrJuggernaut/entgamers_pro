'use client'
import Button from '@/components/ui/Button'
import ButtonGroup from '@/components/ui/ButtonGroup'
import useSession from '@/hooks/useSession'
import { css } from '@/styled-system/css'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, type FC } from 'react'
import UpdateEmail from './UpdateEmail'
import UpdatePassword from './UpdatePassword'
import UpdateUserName from './UpdateUserName'
import UpdateUserPreferences from './UpdateUserPreferences'

type Tab = 'perfil' | 'login'

const CuentaTabs: FC = () => {
  useSession('/login')
  const [currentTab, setCurrentTab] = useState<Tab>('perfil')

  return (
    <>
      <ButtonGroup
        fullWidth={true}
      >
        <Button
          fullWidth
          onClick={() => { setCurrentTab('perfil') }}
          disabled={currentTab === 'perfil'}
        >
          Perfil
        </Button>
        <Button
          fullWidth
          onClick={() => { setCurrentTab('login') }}
          disabled={currentTab === 'login'}
        >
          Login
        </Button>
      </ButtonGroup>
      <div
        className={css({
          overflow: 'hidden',
          marginTop: 'medium'
        })}
      >
        <AnimatePresence
          mode='wait'
        >
          {currentTab === 'login' && (
            <motion.div
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              key="login">
              <UpdateEmail />
              <UpdatePassword />
            </motion.div>
          )}
          {currentTab === 'perfil' && (
            <motion.div
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              key="perfil">
              <UpdateUserName />
              <UpdateUserPreferences />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default CuentaTabs
