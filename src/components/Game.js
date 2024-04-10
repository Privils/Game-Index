import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Game = () => {
    const [getData, setGameData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        displayGameData();
        fetchGenres();
    }, [currentPage]);

    async function displayGameData() {
        const apiKey = '65ba8ad64ee544b492cdaf7c34634b8f';
        const url = `https://api.rawg.io/api/games?key=${apiKey}&page=${currentPage}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.log('Response error fetching data');
            }
            const data = await response.json();
            console.log('Your data is', data.results);
            setGameData(prevData => [...prevData, ...data.results]);
        } catch (error) {
            console.log('Error fetching game data', error);
        }
    }

    async function fetchGenres() {
        const apiKey = '65ba8ad64ee544b492cdaf7c34634b8f';
        const url = `https://api.rawg.io/api/genres?key=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.log('Response error fetching genres');
            }
            const data = await response.json();
            console.log('Genres:', data.results);
            setGenres(data.results);
        } catch (error) {
            console.log('Error fetching genres', error);
        }
    }

    const loadMoreData = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleGenreClick = async (genreId) => {
        setGameData([]); 
        const apiKey = '65ba8ad64ee544b492cdaf7c34634b8f';
        const url = `https://api.rawg.io/api/games?key=${apiKey}&genres=${genreId}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.log('Response error fetching data');
            }
            const data = await response.json();
            console.log(`Games in genre ${genreId}:`, data.results);
            setGameData(data.results);
        } catch (error) {
            console.log(`Error fetching games in genre ${genreId}`, error);
        }
    };
    
    if (!Game) {
        return <div className="page">Page Loading...</div>;
      }
    return (
        <>
            <div className="game">
                <div className="genresContainer">
                    {genres.map(genre => (
                        <div className="genres" key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                            {genre.name}
                        </div>
                    ))}
                </div>
                <div className="gameData">
                    {getData.map(values => (
                        <Link to={`/game-info/${values.id}`} key={values.id}>
                            <div className="gameImage">
                                <img src={values.background_image} alt="" />
                                <div>
                                    <span className='gameName'>{values.name}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="viewMoreBtn">
                    <button onClick={loadMoreData}>View More</button>
                </div>
            </div>
        </>
    );
};

export default Game;
