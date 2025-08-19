import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { Navigate } from 'react-router-dom'

interface PublicRouteProps {
  children: React.ReactNode
}

const publicRoute = ({ children }: PublicRouteProps) => {

  const isAuth = useSelector((state: RootState) => state.auth.isAuth)

  if(isAuth){
    return <Navigate to="/profile" replace/>
  }

  return <>{children}</>

}

export default publicRoute