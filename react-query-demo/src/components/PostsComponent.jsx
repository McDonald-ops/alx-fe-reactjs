import { useQuery } from '@tanstack/react-query';

// Fetch function for API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function PostsComponent() {
  // useQuery handles fetching, caching, and updating
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['posts'], // cache key
    queryFn: fetchPosts, // function to fetch data
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={() => refetch()}>Refetch Posts</button>
      <ul>
        {data.slice(0, 10).map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;
