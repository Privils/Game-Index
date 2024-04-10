// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Game from './components/Game'; // Import the Game component
import GameInfo from './components/GameInfo'; // Import the GameInfo component
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Game/>}/>
        <Route path="/game-info/:id" element={<GameInfo />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;