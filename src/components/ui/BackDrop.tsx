import { css } from '@/styled-system/css'
import { AnimatePresence, motion } from 'framer-motion'
import { type FC, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface BackDropProps {
  children?: ReactNode
  isOpen: boolean
  onClickAway: () => void
}

const BackDrop: FC<BackDropProps> = ({ isOpen, onClickAway, children }) => {
  if (typeof window === 'undefined') return null
  return createPortal((
    <AnimatePresence>
      {isOpen
        ? (
          <motion.div
            className={css({
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 'modalBackdrop',
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            })}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                onClickAway()
              }
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )
        : undefined
      }
    </AnimatePresence>
  ), document.body)
}
export default BackDrop
