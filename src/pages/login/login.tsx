import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../utils/http/httpRequest";
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from "../../store/store";
// import { loginStore } from "../../store/authSlice";
import { localTokenStorage, localUserStorage } from "../../storage/storage";

interface ILogin{
    email: string,
    password: string
}

interface ILoginHandler {
  user: {
    UserId: number | null;
    username: string | null;
    email: string | null;
    role: string | null
  } | null;
  loading: boolean;
  error: string | null | undefined
}

const Login = () => {

  // const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

    const [eye, setEye] = useState<boolean>(false)
    const [userData, setUserData] = useState<ILoginHandler>({
      user: null,
      loading: false,
      error: null
    });

    const [login, setLogin] = useState<ILogin>({
        email: "",
        password: ""
    })


    const eyeOpenClose = ():void => {
        setEye(!eye)
    }

    const handleSubmit = async () => {
      try {
          setUserData({...userData, loading: true})

          
          const response = await loginApi(login)
          // dispatch(loginStore(response.data))
          localTokenStorage.tokens.setAccess(response.data?.access_token)
          localTokenStorage.tokens.setRefresh(response.data?.refresh_token)
          localUserStorage.setUserDataInStorage(response.data?.user)
          navigate('/profile')
          
        } catch (error: any) {
          
          setUserData({...userData, error: error?.response?.data})
        }finally{
          setUserData({...userData, loading: false})
        }
    }
    

  return (
    <>
    <div>
      <div className="w-full h-screen bg-amber-200">
          <div className="w-full h-full flex bg-[url('/img/login-image.svg')] bg-no-repeat bg-cover bg-bottom">

        <div className="flex-1 flex justify-center items-center">
            <div className="w-8/12 min-h-96 flex items-center flex-col bg-white/20 rounded-2xl backdrop-blur-md border-white/30 shadow-lg">
                <h1 className="text-center font-bold text-5xl tracking-widest my-14">Login In</h1>
               <div className="w-11/12 flex items-center flex-col my-8">
                 <div className="w-11/12 h-14 bg-gray-400/70 rounded-2xl my-3 flex justify-center items-center">
                    <input className="w-11/12 h-1/2 border-none outline-none text-2xl" value={login.email} onChange={(e) => setLogin({...login, email: e.target.value})} placeholder="email" type="text" name="email" id="email" />
                </div>
                 <div className="w-11/12 h-14 bg-gray-400/70 rounded-2xl my-3 flex justify-center items-center">
                    <input className="w-11/12 h-1/2 border-none outline-none text-2xl" value={login.password} onChange={(e) => setLogin({...login, password: e.target.value})} placeholder="password" type={eye ? "text" : "password"} name="password" id="password" />
                    {eye ? <Eye className="text-gray-600" onClick={eyeOpenClose} /> : <EyeClosed className="text-gray-600"  onClick={eyeOpenClose}/>}
                </div>
               </div>
               <div className="w-11/12 h-18 mx-auto flex justify-center">
                <button onClick={handleSubmit} className="w-5/12 h-14 bg-[#34A853] uppercase text-xl font-bold text-black rounded-full">login in</button>
               </div>
               <Link to="/signup" className="text-[#337FFF] text-xl font-bold mb-8 tracking-wide">Sign up</Link>
            </div>
        </div>
        <div className="flex-1"></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login