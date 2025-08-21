const useAuth = () => {
  const token = localStorage.getItem('authToken')
  return { isAuthenticated: !!token }
}

export default useAuth
