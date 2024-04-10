import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="CenterLogo">
        <p><span className="logoName">playPort</span><span className="dot">~</span><span className="logoInfo">the game archive</span></p>
      </div>
      <div className="buttonContainer">
        <Link to="/games">
          <button className="Viewbtn">View Games</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
