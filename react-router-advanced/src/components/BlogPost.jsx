import { useParams } from 'react-router-dom'

const BlogPost = () => {
  const { id } = useParams()

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-bold text-[#233038]">Blog Post</h2>
      <p className="mt-4 text-xl">You are viewing Blog Post #{id}</p>
    </div>
  )
}

export default BlogPost
