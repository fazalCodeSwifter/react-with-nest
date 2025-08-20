import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-6xl m-20">Dashboard Page</h1>
      <Link to="/profile" className="m-20 text-blue-500 text-2xl hover:underline font-bold">Profile Page</Link>
    </div>
  )
}

export default Dashboard