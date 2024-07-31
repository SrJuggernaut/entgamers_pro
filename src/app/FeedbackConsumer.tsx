'use client'
import IconButton from '@/components/ui/IconButton'
import Typography from '@/components/ui/Typography'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { removeAlert } from '@/state/feedbackSlice'
import { css } from '@/styled-system/css'
import { alert } from '@/styled-system/recipes/alert'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { type FC } from 'react'
import { createPortal } from 'react-dom'

const FeedbackConsumer: FC = () => {
  const { alerts } = useAppSelector(state => state.feedback)
  const dispatch = useAppDispatch()
  return (
    <>
      {alerts.length > 0 && createPortal(
        (
          <AnimatePresence>
            <motion.div
              key="alerts"
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: 'medium',
                position: 'fixed',
                bottom: 'medium',
                left: 'medium',
                padding: 'medium',
                zIndex: 'modalBackdrop',
                width: 'calc(100vw - 32px)',
                maxWidth: '400px'
              })}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: 'backIn' } }}
              exit={{ opacity: 0, x: 400, transition: { duration: 0.3, ease: 'backOut' } }}
            >
              <AnimatePresence>
                {alerts.map((currentAlert) => (
                  <motion.div
                    key={currentAlert.id}
                    // This is a workaround for PandaCSS to auto-generate styles and avoid Alerts with non-generated styles. See https://panda-css.com/docs/guides/dynamic-styling#runtime-conditions
                    className={alert({
                      severity: currentAlert.severity === 'success' ? 'success' : currentAlert.severity === 'info' ? 'info' : currentAlert.severity === 'warning' ? 'warning' : currentAlert.severity === 'error' ? 'error' : undefined
                    }).body}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: 'backIn' } }}
                    exit={{ opacity: 0, x: 400, transition: { duration: 0.3, ease: 'backOut' } }}
                  >
                    <IconButton
                      size="small"
                      className={alert().closeButton}
                      onClick={() => dispatch(removeAlert(currentAlert.id))}
                    >
                      <FontAwesomeIcon icon={faTimes} fixedWidth size='sm'/>
                    </IconButton>
                    <Typography variant="h3" component="div">
                      {currentAlert.title}
                    </Typography>
                    <Typography variant="body1">
                      {currentAlert.message}
                    </Typography>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        ),
        document.body,
        'alerts'
      )}
    </>
  )
}
export default FeedbackConsumer
