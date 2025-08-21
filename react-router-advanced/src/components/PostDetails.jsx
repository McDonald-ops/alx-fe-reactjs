import { useParams } from 'react-router-dom'

const PostDetails = () => {
  const { id } = useParams()
  return <h3>Viewing Post #{id}</h3>
}

export default PostDetails
