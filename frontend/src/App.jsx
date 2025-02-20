import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Law from './components/Law';
import Main from './components/Main';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/law" element={<Law />} />
      </Routes>
    </Router>
  );
}

export default App;
