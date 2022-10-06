import { FormEvent, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { signIn } = useAuth()

  const navigate = useNavigate()
  let [searchParams] = useSearchParams()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await signIn(email, password)

      const redirectUrl = searchParams.get("redirectUrl") ?? "/"

      navigate(redirectUrl)
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full px-4">
        <h1>Zaloguj się</h1>

        {error && <p>{error}</p>}

        <label htmlFor="email">Email</label>

        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-black"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-black"
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default LoginPage
