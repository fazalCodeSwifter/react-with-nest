import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react";
import { Link } from "react-router-dom";

interface ISignup {
  username: string,
  email: string,
  password: string
}

const Signup = () => {

  const [eye, setEye] = useState<boolean>(false)

  const [signup, setSignup] = useState<ISignup>({
    username: "",
    email: "",
    password: ""
  })


  const eyeOpenClose = (): void => {
    setEye(!eye)
  }

  return (
    <>
      <div>
        <div className="w-full h-screen bg-amber-200">
          <div className="w-full h-full flex bg-[url('/img/login-image.svg')] bg-no-repeat bg-cover bg-bottom">

            <div className="flex-1 flex justify-center items-center">
              <div className="w-8/12 min-h-96 flex items-center flex-col bg-white/20 rounded-2xl backdrop-blur-md border-white/30 shadow-lg">
                <h1 className="text-center font-bold text-5xl tracking-widest my-14">Sign Up</h1>
                <div className="w-11/12 flex items-center flex-col my-8">
                  <div className="w-11/12 h-14 bg-gray-400/70 rounded-2xl my-3 flex justify-center items-center">
                    <input className="w-11/12 h-1/2 border-none outline-none text-2xl" value={signup.username} onChange={(e) => setSignup({ ...signup, username: e.target.value })} placeholder="username" type="text" name="username" id="username" />
                  </div>
                  <div className="w-11/12 h-14 bg-gray-400/70 rounded-2xl my-3 flex justify-center items-center">
                    <input className="w-11/12 h-1/2 border-none outline-none text-2xl" value={signup.email} onChange={(e) => setSignup({ ...signup, email: e.target.value })} placeholder="email" type="text" name="email" id="email" />
                  </div>
                  <div className="w-11/12 h-14 bg-gray-400/70 rounded-2xl my-3 flex justify-center items-center">
                    <input className="w-11/12 h-1/2 border-none outline-none text-2xl" value={signup.password} onChange={(e) => setSignup({ ...signup, password: e.target.value })} placeholder="password" type={eye ? "text" : "password"} name="password" id="password" />
                    {eye ? <Eye className="text-gray-600" onClick={eyeOpenClose} /> : <EyeClosed className="text-gray-600" onClick={eyeOpenClose} />}
                  </div>
                </div>
                <div className="w-11/12 h-18 mx-auto flex justify-center">
                  <button className="w-5/12 h-14 bg-[#34A853] uppercase text-xl font-bold text-black rounded-full">Signup</button>
                </div>
                <Link to="/login" className="text-[#337FFF] text-xl font-bold mb-8 tracking-wide">Login up</Link>

              </div>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup