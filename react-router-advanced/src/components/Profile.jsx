import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import ProfileDetails from './ProfileDetails'
import ProfileSettings from './ProfileSettings'

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
        <Link to="details" className="mx-2 text-blue-600 hover:underline">Profile Details</Link> |{' '}
        <Link to="settings" className="mx-2 text-blue-600 hover:underline">Profile Settings</Link>
      </nav>

      <div className="flex justify-center mt-6">
        <button 
          onClick={handleLogout} 
          className="px-6 py-2 bg-[#d6e06b] text-white font-semibold rounded-lg hover:bg-[#c0ca5a] transition"
        >
          Logout
        </button>
      </div>

      {/* Nested routes for profile */}
      <div className="mt-6 text-center">
        <Routes>
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Routes>
      </div>
    </div>
  )
}

export default Profile
