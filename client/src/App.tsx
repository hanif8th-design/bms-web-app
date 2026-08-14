import { Route, Routes } from 'react-router-dom'
import { PublicNavbar } from './components/PublicNavbar/PublicNavbar'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<PublicNavbar />} />
    </Routes>
  )
}

export default App
