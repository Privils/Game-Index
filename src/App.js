import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Game from './components/Game'; 
import GameInfo from './components/GameInfo'; 
import './App.css'

function App() {
  return (
    <Router basename='/Game-Index'>
      <Header />
      <Routes>
      <Route index element={<Home />} />
        <Route path="/Game-Index" element={<Home />} />
        <Route path="/games" element={<Game/>}/>
        <Route path="/game-info/:id" element={<GameInfo />} />
      </Routes>
    </Router>
  );
}

export default App;