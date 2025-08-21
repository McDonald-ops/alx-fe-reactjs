import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h2 className="text-center text-4xl font-bold text-[#233038]">Home Page</h2>
      <nav className="mt-2 text-center">
        <Link to="/">Home</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/profile">Profile</Link> |{' '}
        <Link to="/posts">Posts</Link>
      </nav>
      <p className="text-center text-3xl animate-colorChange">
        Welcome to the React Router Advanced Home Page!
      </p>
    </div>
  )
}

export default Home
