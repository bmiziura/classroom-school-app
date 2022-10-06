import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as logOut,
  User,
  UserCredential,
} from "firebase/auth"
import React, { ReactNode, useContext, useEffect, useState } from "react"
import { auth } from "../firebase"

export interface AuthContextParams {
  signIn: (email: string, password: string) => Promise<UserCredential>
  signOut: () => Promise<void>
  user: User | null
}

const AuthContext = React.createContext<AuthContextParams>(
  {} as AuthContextParams
)

export function useAuth(): AuthContextParams {
  return useContext(AuthContext)
}

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signOut = () => {
    return logOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const value: AuthContextParams = {
    signIn,
    signOut,
    user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
