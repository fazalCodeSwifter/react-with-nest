import Login from "./pages/login/login"
import { Route, Routes } from "react-router-dom"
import Signup from "./pages/signup/signup"
import Home from "./pages/home/home"
import PublicRoute from "./routes/publicRoute"
import ProtectedRoute from "./routes/protectedRoute"
import Profile from "./pages/profile/profile"
import Dashboard from "./pages/dashboard/dashboard"
import { useProducts } from "./hooks/useProducts"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "./store/store"
import { setAllProduct } from "./store/productSlice"
import ProductsContainer from "./pages/products/productsContainer"

function App() {

  const { loading, error, products } = useProducts()

  const dispatch = useDispatch<AppDispatch>()

  dispatch(setAllProduct(products))

  if(loading) return <h1 className="text-4xl font-bold">LODING...</h1>
  if(error) return <h1 className="text-4xl font-bold">{error}</h1>

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/products" element={<ProductsContainer />}/>
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }/>
      <Route path="/signup" element={
        <PublicRoute>
          <Signup />
        </PublicRoute>
      }/>
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

    </Routes>
     
    </>
  )
}

export default App
