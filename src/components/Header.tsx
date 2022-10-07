import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Header = () => {
  const { user, signOut } = useAuth()

  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()

    navigate("/")
  }

  return (
    <div className="h-16 bg-black text-white">
      <nav className="h-full">
        <ul className="flex items-center justify-center h-full gap-8">
          <li className="hover:underline">
            <Link to="/">Home Page</Link>
          </li>
          {user && (
            <li className="hover:underline">
              <Link to="/new-post">New Post</Link>
            </li>
          )}
          <li>
            {user ? (
              <button
                className="cursor-pointer hover:underline"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
