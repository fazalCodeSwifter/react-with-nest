
import { Navigate } from 'react-router-dom'
import { localUserStorage } from '../storage/storage'

interface PublicRouteProps {
  children: React.ReactNode
}

const publicRoute = ({ children }: PublicRouteProps) => {

  const user = localUserStorage.getUserDataInStorage()

  if(user?.userId){
    return <Navigate to="/profile" replace/>
  }

  return <>{children}</>

}

export default publicRoute