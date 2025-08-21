import { Link, Outlet, useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <div>
      <h2 className="text-center text-4xl font-bold text-[#233038]">Profile Page</h2>
      <nav className="mt-2 text-center">
        <Link to="details">Profile Details</Link> |{' '}
        <Link to="settings">Profile Settings</Link>
      </nav>
      
     <div className="flex justify-center mt-6">
      <button onClick={handleLogout} className="px-6 py-2 bg-[#d6e06b] text-white font-semibold rounded-lg hover:bg-[#c0ca5a] transition" style={{ marginTop: '10px' }}>
        Logout
      </button>
    </div>
      <Outlet />
    </div>
  )
}

export default Profile
