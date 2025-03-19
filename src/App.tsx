
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import KishanParivarPage from './pages/KishanParivarPage';

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kishanParivarPage" element={<KishanParivarPage />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;