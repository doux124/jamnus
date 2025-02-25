import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Law from './components/Legal/Law';
import Resume from './components/HR/Resume';
import Main from './components/Main';
import Legal from './components/Legal/Legal';
import Sales from './components/Sales/Sales';
import HR from './components/HR/HR';
import Conflict from './components/HR/Conflict'
import Nego from './components/Sales/Nego'
import Marketing from './components/Marketing/Marketing'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/legal" element={<Legal />} />
        <Route path="/law" element={<Law />} />

        <Route path="/hr" element={<HR />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/conflict" element={<Conflict />} />
        
        <Route path="/sales" element={<Sales />} />
        <Route path="/nego" element={<Nego />} />

        <Route path="/marketing" element={<Marketing />} />
      </Routes>
    </Router>
  );
}

export default App;
