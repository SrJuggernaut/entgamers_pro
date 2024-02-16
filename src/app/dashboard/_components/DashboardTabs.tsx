'use client'
import TeamApplications from '@/app/dashboard/_components/TeamApplications'
import Button from '@/components/ui/Button'
import ButtonGroup from '@/components/ui/ButtonGroup'
import Typography from '@/components/ui/Typography'
import useSession from '@/hooks/useSession'
import { css } from '@/styled-system/css'
import { ADMIN_CLAN_ID } from 'entgamers-database/frontend/clanes/administrative'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, type FC } from 'react'

type Tab = undefined | 'teamApplications'

const DashboardTabs: FC = () => {
  const { clanes, belongToClan } = useSession('/login')

  const [currentTab, setCurrentTab] = useState<Tab>(undefined)

  return (
    <>
      {clanes !== undefined && (
        <ButtonGroup
          fullWidth
        >
          <Button fullWidth onClick={() => { setCurrentTab(undefined) }} disabled={currentTab === undefined}>
            Panel
          </Button>
          {belongToClan(ADMIN_CLAN_ID) && (
            <Button fullWidth onClick={() => { setCurrentTab('teamApplications') }} disabled={currentTab === 'teamApplications'}>
              Aplicaciones
            </Button>
          )}
        </ButtonGroup>
      )}
      <div
        className={css({
          overflow: 'hidden',
          marginTop: 'medium'
        })}
      >
        <AnimatePresence
          initial={false}
          mode='wait'
        >
          {currentTab === undefined && (
            <motion.div
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              key="dashboard"
            >
              <Typography variant="body1">Selecciona una de las opciones de arriba para comenzar.</Typography>
            </motion.div>
          )}
          {currentTab === 'teamApplications' && (
            <motion.div
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              key="teamApplications"
            >
              <TeamApplications />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default DashboardTabs
