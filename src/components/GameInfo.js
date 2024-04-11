import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const GameInfo = () => {
  const { id } = useParams();
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    fetchGameInfo();
  }, [id]);

  const fetchGameInfo = async () => {
    const apiKey = '65ba8ad64ee544b492cdaf7c34634b8f';
    const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log("Response error fetching game info");
      }
      const data = await response.json();
      console.log("Game info:", data);
      setGameInfo(data);
    } catch (error) {
      console.log("Error fetching game info", error);
    }
  };

  if (!gameInfo) {
    return <div className="page">Page Loading...</div>;
  }

  return (
    <>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
     
      <div className="InfoContainer">
        <div className="infoImage">
          <img src={gameInfo.background_image} alt="" />
        </div>
        <div className="infoData">
          <h1 className="h1">{gameInfo.name}</h1>
          <p className="description"> {gameInfo.description} </p>
          <p className="rating">rating: {gameInfo.rating_top}</p>
          <p className="year">release date: {gameInfo.released}</p>
        </div>
      </div>
   <div className="back">   <Link to="/games">Back to Games</Link></div>
    </>
  );
};

export default GameInfo;



