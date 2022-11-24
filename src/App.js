
import './App.css';
import Todo from './pages/Todo';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import SetTodo from './pages/SetTodo';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className='todo'>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todo/" element={<HomePage />} />
          <Route path="/todo/setTodo" element={<SetTodo />} />
          <Route path="/todo/todo" element={<Todo />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
