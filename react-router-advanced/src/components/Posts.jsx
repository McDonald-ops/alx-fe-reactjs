import { Link } from 'react-router-dom'

const dummyPosts = [
  { id: 1, title: 'First Post' },
  { id: 2, title: 'Second Post' },
  { id: 3, title: 'Third Post' },
]

const Posts = () => {
  return (
    <div>
      <h2 className="text-center text-4xl font-bold text-[#233038]">Posts</h2>
      <ul>
        {dummyPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Posts
