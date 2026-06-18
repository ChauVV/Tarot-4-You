import { Routes, Route, Navigate } from 'react-router-dom'
import { ReadingProvider } from './context/ReadingContext'
import { useAI } from './context/AIContext'
import Home from './screens/Home'
import ConnectAI from './screens/ConnectAI'
import Question from './screens/Question'
import Shuffle from './screens/Shuffle'
import Draw from './screens/Draw'
import Reading from './screens/Reading'
import Journal from './screens/Journal'
import CardOfDay from './screens/CardOfDay'
import DoorTransition from './components/DoorTransition'

export default function App() {
  const { connected, skipped } = useAI()

  return (
    <ReadingProvider>
      <DoorTransition />
      <Routes>
        <Route path="/" element={connected || skipped ? <Home /> : <Navigate to="/connect-ai" replace />} />
        <Route path="/connect-ai" element={<ConnectAI />} />
        <Route path="/question" element={<Question />} />
        <Route path="/shuffle" element={<Shuffle />} />
        <Route path="/draw" element={<Draw />} />
        <Route path="/reading" element={<Reading />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/card-of-the-day" element={<CardOfDay />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ReadingProvider>
  )
}
