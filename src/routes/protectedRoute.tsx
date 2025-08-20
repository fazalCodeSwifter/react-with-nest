import { Navigate } from 'react-router-dom'
import { localUserStorage } from '../storage/storage'

interface ProtectedRouteProps{
    children: React.ReactNode
}

const protectedRoute = ({children}: ProtectedRouteProps) => {
    const user = localUserStorage.getUserDataInStorage()
    

    if(!user?.userId){
        return <Navigate to="/login" replace />
    }
    return <>{children}</>
}

export default protectedRoute