import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useAI } from '../context/AIContext'

interface Props {
  /** Kept for API compatibility; the home icon now always shows. */
  showBack?: boolean
}

export default function TopBar(_props: Props) {
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
        <button className="icon-btn home-icon-btn" onClick={() => navigate('/')} aria-label="Home">
          <img src="/icon.png" alt="Tarot 4 You" className="home-icon-img" />
        </button>
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
