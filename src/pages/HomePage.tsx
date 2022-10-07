import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useAuth } from "../contexts/AuthContext"

const HomePage = () => {
  const { user, signOut } = useAuth()

  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()

    navigate("/")
  }

  return (
    <div>
      <Header />

      <h1>HomePage</h1>
      <p>User: {user?.email}</p>
      <button onClick={() => handleSignOut()}>Sign Out</button>
    </div>
  )
}

export default HomePage
