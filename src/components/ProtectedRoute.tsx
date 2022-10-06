import { ReactNode } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  if (!user) {
    const redirectUrl = location.pathname

    return <Navigate to={`/login?redirectUrl=${redirectUrl}`} />
  }

  return <>{children}</>
}

export default ProtectedRoute
