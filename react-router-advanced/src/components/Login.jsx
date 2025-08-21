const Login = () => {
  const handleLogin = () => {
    localStorage.setItem('authToken', 'sample-token')
    window.location.href = '/profile'
  }

  return (
    <div>
      <h2 className="text-center text-4xl font-bold text-[#233038]">Login Page</h2>
        <p className="text-center text-3xl animate-colorChange mt-4">
            Please click the button below to login.</p>
      <div className="flex justify-center mt-6">
        <button 
          onClick={handleLogin} 
          className="px-6 py-2 bg-[#d6e06b] text-white font-semibold rounded-lg hover:bg-[#c0ca5a] transition"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
