import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps{
    children: React.ReactNode
}

const protectedRoute = ({children}: ProtectedRouteProps) => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)

    if(!isAuth){
        return <Navigate to="/login" replace />
    }
    return <>{children}</>
}

export default protectedRoute