import { FormEvent, useState } from "react"
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom"
import Header from "../components/Header"
import { useAuth } from "../contexts/AuthContext"

import { FcGoogle } from "react-icons/fc"

const RegisterPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const [isLogin, setLogin] = useState(false)

  const { user, signInWithGoogle, createUser } = useAuth()

  const navigate = useNavigate()
  let [searchParams] = useSearchParams()

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isLogin) return

    setLogin(true)

    try {
      await createUser(email, password)

      const redirectUrl = searchParams.get("redirectUrl") ?? "/"

      navigate(redirectUrl)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLogin(false)
    }
  }

  const handleLoginWithGoogle = async () => {
    if (isLogin) return
    setLogin(true)

    try {
      await signInWithGoogle()

      const redirectUrl = searchParams.get("redirectUrl") ?? "/"

      setLogin(false)
      navigate(redirectUrl)
    } catch (error: any) {
      setLogin(false)
      setError(error.message)
    }
  }

  if (user) {
    const redirectUrl = searchParams.get("redirectUrl") ?? "/"

    return <Navigate to={redirectUrl} />
  }

  return (
    <div>
      <Header />

      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-full max-w-[500px] flex flex-col gap-4 items-center bg-white p-4 py-16">
          <h1 className="text-3xl font-bold text-center">Register</h1>

          <button
            className="w-full max-w-[300px] border px-4 py-2 rounded-md flex gap-2 items-center justify-center font-bold hover:bg-slate-50"
            name="Continue with Google"
            onClick={handleLoginWithGoogle}
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>

          <p>Or</p>

          <form
            onSubmit={handleRegister}
            className="w-full max-w-[300px] flex flex-col gap-4"
          >
            <label className="flex flex-col">
              <span className="px-2 mb-1">Email</span>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md border-gray-500 placeholder-gray-500 p-2"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="px-2 mb-1">Password</span>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-md border-gray-500 placeholder-gray-500 p-2 w-full max-w-[1000px]"
                required
              />
            </label>

            {error && <span className="text-red-500">{error}</span>}

            <p>
              Already have an account?{" "}
              <Link to="/register" className="font-bold hover:underline">
                Log In
              </Link>
            </p>

            <button
              type="submit"
              name="Register"
              className="border bg-blue-500 text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-500"
              disabled={isLogin}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
