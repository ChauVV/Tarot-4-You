import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

interface Props {
  /** Show a back button instead of doing nothing. */
  showBack?: boolean
}

export default function TopBar({ showBack }: Props) {
  const { lang, toggleLang } = useLang()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

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
      </div>

      <Link to="/" className="brand">
        <span className="brand-mark">✦</span>
        <span className="brand-name">Tarot 4 You</span>
      </Link>

      <div className="topbar-right">
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
