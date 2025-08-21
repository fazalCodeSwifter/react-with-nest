import { Link } from "react-router-dom"
import { useEffect } from "react"
// import { localTokenStorage } from "../../storage/storage"
import { profileApi } from "../../utils/http/httpRequest"
// import { useDispatch } from "react-redux"
// import type { AppDispatch } from "../../store/store"
// import { refresh } from "../../store/authSlice"

const Profile = () => {

    // const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    ;(async () => {
      try {

        // const token = localTokenStorage.getRefreshToken()
        const response = await profileApi()    
        console.log(response.data);
        
        // dispatch(refresh(response.data))
        
      } catch (error: any) {
        console.log(error.response.data);
        
      }
    })()
  },[])


  return (
    <div>
      <h1 className="text-6xl m-20">Profile Page</h1>
      <Link to="/dashboard" className="m-20 text-blue-500 block text-2xl hover:underline font-bold">Dashboard Page</Link>
      <Link to="/messages" className="m-20 text-blue-500 text-2xl hover:underline font-bold">Message Page</Link>

    </div>
  )
}

export default Profile