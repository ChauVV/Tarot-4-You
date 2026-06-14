import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { useAI } from '../context/AIContext'
import { useLang } from '../context/LanguageContext'

export default function ConnectAI() {
  const { connected, connecting, connectError, connect, disconnect } = useAI()
  const { t } = useLang()
  const navigate = useNavigate()

  useEffect(() => {
    if (connected && !connectError) navigate('/', { replace: true })
  }, [connected, connectError, navigate])

  const handleConnect = async () => {
    try {
      await connect()
    } catch {
      // error is stored in connectError
    }
  }

  return (
    <Layout center>
      <motion.div
        className="connect-ai"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="connect-ai-emblem">
          <span className="connect-ai-icon">✦</span>
        </div>

        {connected ? (
          <>
            <h2 className="connect-ai-title">{t('connectAIConnected')}</h2>
            <p className="connect-ai-desc">{t('connectAIConnectedDesc')}</p>
            <div className="connect-ai-actions">
              <button className="btn btn-primary" onClick={() => navigate('/')}>
                {t('connectAIContinue')}
              </button>
              <button className="btn btn-ghost btn-small danger" onClick={disconnect}>
                {t('aiDisconnect')}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="connect-ai-title">{t('connectAITitle')}</h2>
            <p className="connect-ai-desc">{t('connectAIDesc')}</p>

            {connectError && (
              <p className="connect-ai-error">{t('connectAIErrorTitle')}: {connectError}</p>
            )}

            <div className="connect-ai-actions">
              <button
                className="btn btn-primary"
                onClick={handleConnect}
                disabled={connecting}
              >
                {connecting ? t('aiConnecting') : connectError ? t('connectAIRetry') : t('aiConnect')}
              </button>
              <button className="btn-link" onClick={() => navigate('/')}>
                {t('connectAISkip')}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </Layout>
  )
}
