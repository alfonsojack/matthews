import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Search from './Search';
import CombinedPoem from './CombinedPoem';
import Header from './Header';
import Home from './Home';
import About from './About';
import Create from './Create';
import Error from './Error'

function App() {

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/combine" element={<Search/>} />
        <Route path="/create" element={<Create/>} />
        <Route path='/*' element={<Error message="The page you're looking for doesn't exist."/>}/>
      </Routes>
    </div>
  );
}

export default App;
