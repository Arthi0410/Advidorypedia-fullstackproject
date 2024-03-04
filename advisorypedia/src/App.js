import './App.css';
import SignUp from './components/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/postlist';
import 'tailwindcss/tailwind.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/posts" element={<PostList />} />
      </Routes>
    </Router>
  );
}

export default App;
