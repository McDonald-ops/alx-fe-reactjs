import { useQuery } from '@tanstack/react-query';

// Fetch function
const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const PostsComponent = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    // ✅ Required options for caching behavior
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 1, // 1 minute
    refetchOnWindowFocus: true, // refetch when window regains focus
    keepPreviousData: true, // keep showing old data while refetching
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={() => refetch()}>Refetch Posts</button>
      <ul>
        {data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
