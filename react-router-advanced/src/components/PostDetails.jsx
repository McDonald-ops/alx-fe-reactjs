import { useParams } from 'react-router-dom'

const PostDetails = () => {
  const { id } = useParams()
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h3 className="text-2xl font-semibold">Viewing Post #{id}</h3>
    </div>
  )
}

export default PostDetails
