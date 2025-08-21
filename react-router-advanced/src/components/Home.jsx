import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-[#233038] mb-4">Home Page</h2>

      <nav className="space-x-4 mb-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
        <Link to="/posts" className="hover:underline">Posts</Link>
      </nav>

      <p className="text-2xl text-center animate-colorChange">
        Welcome to the React Router Advanced Home Page!
      </p>
    </div>
  )
}

export default Home
