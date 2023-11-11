import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Search from './Search';
import CombinedPoem from './CombinedPoem';
import Header from './Header';
import Home from './Home';
import About from './About';
import Create from './Create';

function App() {
  const [poem1, setPoem1] = useState(null);
  const [poem2, setPoem2] = useState(null);
  const [combinedPoem, setCombinedPoem] = useState(null);

  const handleDataTransfer = (data1, data2, combinedData) => {
    setPoem1(data1);
    setPoem2(data2);
    setCombinedPoem(combinedData);
  };

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/combine" element={<Search onDataTransfer={handleDataTransfer}/>} />
        <Route path="/create" element={<Create/>} />
      </Routes>
    </div>
  );
}

export default App;
