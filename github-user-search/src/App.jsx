import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import UserCard from './components/UserCard';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: 600, margin: '2rem auto' }}>
        <h1 className="text-3xl font-bold mb-4">GitHub User Search</h1>

        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/user/:profile" element={<UserCard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
