import Login from "./pages/login/login"
import { Route, Routes } from "react-router-dom"
import Signup from "./pages/signup/signup"
import Home from "./pages/home/home"
import PublicRoute from "./routes/publicRoute"
import ProtectedRoute from "./routes/protectedRoute"
import Profile from "./pages/profile/profile"
import { useEffect } from "react"
import { localTokenStorage } from "./storage/storage"
import { refreshApi } from "./utils/http/httpRequest"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "./store/store"
import { refresh } from "./store/authSlice"

function App() {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    ;(async () => {
      try {

        const token = localTokenStorage.getRefreshToken()
        const response = await refreshApi({ refreshToken: token })    
        // console.log(response);
        dispatch(refresh(response.data))
        
      } catch (error: any) {
        console.log(error.response.data);
        
      }
    })()
  },[])

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
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
    </Routes>
     
    </>
  )
}

export default App
