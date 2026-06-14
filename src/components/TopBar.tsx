import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useAI } from '../context/AIContext'

interface Props {
  /** Show a back button instead of doing nothing. */
  showBack?: boolean
}

export default function TopBar({ showBack }: Props) {
  const { lang, toggleLang } = useLang()
  const { theme, toggleTheme } = useTheme()
  const { connected, connecting, disconnect } = useAI()
  const navigate = useNavigate()

  const handleAI = () => {
    if (connected) disconnect()
    else navigate('/connect-ai')
  }

  const aiTooltip = connected
    ? lang === 'vi' ? 'Ngắt kết nối AI' : 'Disconnect AI'
    : lang === 'vi' ? 'Kết nối AI' : 'Connect AI'

  return (
    <header className="topbar">
      <div className="topbar-left">
        {showBack ? (
          <button className="icon-btn" onClick={() => navigate('/')} aria-label="Home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M3 11.2 12 4l9 7.2M5 9.8V20h5v-6h4v6h5V9.8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <span className="topbar-spacer" />
        )}
        {/* Credits badge hidden while readings are free. Re-enable with the
            credit gating in Question.tsx when we want to monetize. */}
      </div>

      <Link to="/" className="brand">
        <span className="brand-mark">✦</span>
        <span className="brand-name">Tarot 4 You</span>
      </Link>

      <div className="topbar-right">
        <button
          className={`icon-btn ai-icon-btn ${connected ? 'ai-icon-btn--on' : ''}`}
          onClick={handleAI}
          disabled={connecting}
          aria-label={aiTooltip}
          data-tooltip={aiTooltip}
        >
          <span className="ai-icon-spark">✦</span>
          <span className={`ai-icon-dot ${connected ? 'ai-icon-dot--on' : ''}`} />
        </button>
        <button className="pill-btn" onClick={toggleLang} aria-label="Toggle language">
          {lang === 'vi' ? 'VI' : 'EN'}
        </button>
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☾' : '☀'}
        </button>
      </div>
    </header>
  )
}
