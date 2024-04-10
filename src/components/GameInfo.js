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
      <div className="InfoContainer">
        <div className="infoImage">
          <img src={gameInfo.background_image} alt="" />
        </div>
        <div className="infoData">
          <h1 className="h1">{gameInfo.name}</h1>
          <p className="description"> {gameInfo.description} </p>
          <p className="rating">{gameInfo.rating_top}</p>
          <p className="year">release date: {gameInfo.released}</p>
        </div>
      </div>
      <Link to="/games">Back to Games</Link>
    </>
  );
};

export default GameInfo;



