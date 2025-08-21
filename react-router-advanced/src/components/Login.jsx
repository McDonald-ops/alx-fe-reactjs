const Login = () => {
  const handleLogin = () => {
    localStorage.setItem('authToken', 'sample-token')
    window.location.href = '/profile'
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-[#233038] mb-4">Login Page</h2>

      <p className="text-xl animate-colorChange mb-6">
        Please click the button below to login.
      </p>

      <button 
        onClick={handleLogin} 
        className="px-6 py-2 bg-[#d6e06b] text-white font-semibold rounded-lg hover:bg-[#c0ca5a] transition"
      >
        Login
      </button>
    </div>
  )
}

export default Login
