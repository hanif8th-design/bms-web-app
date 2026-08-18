import { Outlet, Route, Routes } from 'react-router-dom'
import { PublicNavbar } from './components/PublicNavbar/PublicNavbar'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage/ForgotPasswordPage'
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage/ResetPasswordPage'

function PublicPageLayout() {
  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<PublicPageLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Authentication and future logged-in routes stay outside the public layout. */}
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/reset-password/:uid/:token"
        element={<ResetPasswordPage />}
      />
      <Route path="/reset-password/*" element={<ResetPasswordPage />} />
    </Routes>
  )
}

export default App
