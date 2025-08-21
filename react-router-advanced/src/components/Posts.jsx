import { Link } from 'react-router-dom'

const dummyPosts = [
  { id: 1, title: 'First Post' },
  { id: 2, title: 'Second Post' },
  { id: 3, title: 'Third Post' },
]

const Posts = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-[#233038] mb-6">Posts</h2>

      <ul className="space-y-3">
        {dummyPosts.map((post) => (
          <li key={post.id}>
            <Link 
              to={`/posts/${post.id}`} 
              className="text-blue-600 hover:underline text-lg"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Posts
