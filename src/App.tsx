import { Routes, Route, Navigate } from 'react-router-dom'
import { ReadingProvider } from './context/ReadingContext'
import Home from './screens/Home'
import Question from './screens/Question'
import Shuffle from './screens/Shuffle'
import Draw from './screens/Draw'
import Reading from './screens/Reading'
import Journal from './screens/Journal'
import CardOfDay from './screens/CardOfDay'

export default function App() {
  return (
    <ReadingProvider>
      <Routes>
        <Route path="/" element={<Home />} />
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
