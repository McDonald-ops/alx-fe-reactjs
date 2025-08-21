import { Link, Outlet, useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-[#233038] mb-4">Profile Page</h2>

      <nav className="space-x-4 mb-6">
        <Link to="details" className="hover:underline">Profile Details</Link>
        <Link to="settings" className="hover:underline">Profile Settings</Link>
      </nav>

      <button 
        onClick={handleLogout} 
        className="px-6 py-2 bg-[#d6e06b] text-white font-semibold rounded-lg hover:bg-[#c0ca5a] transition mb-6"
      >
        Logout
      </button>

      <Outlet />
    </div>
  )
}

export default Profile
