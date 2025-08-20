import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsComponent from './components/PostsComponent';

// Create a query client instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>React Query Demo - Posts</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
}

export default App;
