import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  open: boolean
  title: string
  message?: string
  confirmLabel: string
  cancelLabel: string
  /** Styles the confirm button as destructive. */
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

/** App-styled confirmation dialog — replaces window.confirm(). */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  danger,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="dialog-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />
          <div className="dialog-wrap">
            <motion.div
              className="dialog-box"
              role="alertdialog"
              aria-modal="true"
              aria-label={title}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.96 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <span className="dialog-icon">✦</span>
              <h3 className="dialog-title">{title}</h3>
              {message && <p className="dialog-message">{message}</p>}
              <div className="dialog-actions">
                <button className="btn btn-ghost" onClick={onCancel}>
                  {cancelLabel}
                </button>
                <button
                  className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`}
                  onClick={onConfirm}
                >
                  {confirmLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
