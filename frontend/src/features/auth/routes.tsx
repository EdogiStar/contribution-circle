import type { RouteObject } from 'react-router-dom'
import { Path } from '@/router/paths'
import LoginPage from './pages/login-page'
import RegisterPage from './pages/register-page'

export const authRoutes: RouteObject[] = [
  { path: Path.Login, element: <LoginPage /> },
  { path: Path.Register, element: <RegisterPage /> },
]