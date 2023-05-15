import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home.js';
import Predict from './pages/Predict.js';
import Check from './pages/Check.js';
import Labs from './pages/Labs.js';

function App() {
  return (
    <div className="App">
      <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/check" element={<Check />} />
          <Route path="/labs" element={<Labs />} />
      </Routes>
    </div>
  );
}

export default App;
