import { Navigate, Route, Routes } from 'react-router-dom'
import AboutYourselfPage from './pages/about-yourself'
import DashboardPage from './pages/dashboard'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'

function App() {
  return (
    <Routes>
      <Route element={<Navigate replace to="/login" />} path="/" />
      <Route element={<AboutYourselfPage />} path="/about-yourself" />
      <Route element={<DashboardPage />} path="/dashboard" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<SignupPage />} path="/signup" />
      <Route element={<Navigate replace to="/login" />} path="*" />
    </Routes>
  )
}

export default App
