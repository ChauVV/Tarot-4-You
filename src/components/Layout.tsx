import type { ReactNode } from 'react'
import TopBar from './TopBar'
import CreditsPanel from './CreditsPanel'

interface Props {
  children: ReactNode
  showBack?: boolean
  /** Adds extra vertical centering for short pages. */
  center?: boolean
}

export default function Layout({ children, showBack, center }: Props) {
  return (
    <div className="app-shell">
      <div className="starfield" aria-hidden />
      <div className="starfield starfield-2" aria-hidden />
      <TopBar showBack={showBack} />
      <main className={`content ${center ? 'content-center' : ''}`}>{children}</main>
      <CreditsPanel />
    </div>
  )
}
