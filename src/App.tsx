import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import AuthContextProvider from "./contexts/AuthContext"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/test",
    element: (
      <ProtectedRoute>
        <div>Test</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
])

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

export default App
