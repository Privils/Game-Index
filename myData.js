



const apiKey = '65ba8ad64ee544b492cdaf7c34634b8f';

// Fetching genres
async function fetchGenres() {
    const url = `https://api.rawg.io/api/genres?key=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Response error fetching genres');
            return [];
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching genres', error);
        return [];
    }
}

// Display genres and attach click events
async function displayGenres() {
    const data = await fetchGenres();
    if (!data || !data.results) {
        console.error("No genres data available");
        return;
    }

    let myGenreHtml = "";
    data.results.forEach(genre => {
        myGenreHtml += `
        <ul class="trending-filter">
            <li>
                <a class="is_active" href="#!" data-genre-id="${genre.id}">${genre.name}</a>
            </li>
        </ul>
        `;
    });

    const container = document.querySelector('#ul-container');
    if (container) {
        container.innerHTML = myGenreHtml;

        // Add click event listeners for genre links
        const genreLinks = document.querySelectorAll('.trending-filter a');
        genreLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const genreId = event.target.getAttribute('data-genre-id');
                handleGenreClick(genreId);
            });
        });
    } else {
        console.error("Container element not found");
    }
}

// Fetch game data from API
async function fetchGameData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Response error fetching game data');
            return [];
        }
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching game data', error);
        return [];
    }
}

function renderGameData() {
    const container = document.querySelector('.trending-box');
    if (!container) {
        console.error("Game container not found");
        return;
    }

    container.innerHTML = "";
    gameData.forEach(game => {
        const gameHtml = `
            <div class="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 adv">
                <div class="item">
                    <div class="thumb">
                        <a href="product-details.html?id=${game.id}">
                            <img src="${game.background_image}" alt="${game.name}">
                        </a>
                        <span class="price">${game.rating}</span>
                    </div>
                    <div class="down-content">
                        <span class="category">${game.released}</span>
                        <h4>${game.name}</h4>
                        <a href="product-details.html?id=${game.id}">
                            <i class="fa fa-shopping-bag"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += gameHtml;
    });
}

let currentPage = 1;
let gameData = [];

// Display game data from API
async function displayGameData() {
    const url = `https://api.rawg.io/api/games?key=${apiKey}&page=${currentPage}`;
    try {
        const data = await fetchGameData(url);
        if (data.length > 0) {
            gameData = [...gameData, ...data];
            renderGameData();
        } else {
            console.log('No more games to display');
        }
    } catch (error) {
        console.error('Error fetching game data', error);
    }
}

// Load more games when button is clicked
function loadMoreData() {
    currentPage += 1;
    displayGameData();
}

// Handle genre selection and fetch games for the selected genre
async function handleGenreClick(genreId) {
    gameData = [];
    const url = `https://api.rawg.io/api/games?key=${apiKey}&genres=${genreId}`;
    const games = await fetchGameData(url);
    if (games.length > 0) {
        gameData = games;
        renderGameData();
    } else {
        console.log('No games available for this genre');
    }
}

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
    displayGenres();
    displayGameData();

    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", loadMoreData);
    }
});



const fetchGameInfo = async () => {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("id");
    if (!gameId) {
        console.error("Game ID not found in URL");
        return;
    }

    const url = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Error fetching game info");
            return;
        }
        const game = await response.json();
        displayGameDetails(game);
    } catch (error) {
        console.error("Error fetching game info", error);
    }
};

const displayGameDetails = (game) => {
    const titleElement = document.querySelector("#game-name");
    const breadcrumbElement = document.querySelector(".breadcrumb");
    const imageElement = document.querySelector(".left-image img");
    const priceElement = document.querySelector(".product-price");
    const descriptionElement = document.querySelector(".description");
    const genresElement = document.querySelector(".game-genres");
    const tagsElement = document.querySelector(".game-tags");

    // Populate details
    if (titleElement) {
        console.log("Game Name:", game.name); // Log game name for debugging
        titleElement.textContent = game.name; // Assign game name to the element
    } else {
        console.error("Title element not found in DOM");
    }

    if (breadcrumbElement) {
        breadcrumbElement.innerHTML = `<a href="index.html">Home</a> > <a href="game.html">Shop</a> > ${game.name}`;
    }
    if (imageElement) imageElement.src = game.background_image;
    if (priceElement) {
        priceElement.innerHTML = `<em>rating : ${game.rating}</em><br> ID : ${game.id}`;
    }
    if (descriptionElement) {
        descriptionElement.textContent = game.description_raw || "No description available.";
    }
    if (genresElement) {
        const genres = game.genres.map((genre) => genre.name).join(", ");
        genresElement.textContent = `Genres: ${genres}`;
    }
    if (tagsElement) {
        const tags = game.tags.map((tag) => tag.name).join(", ");
        tagsElement.textContent = `Tags: ${tags}`;
    }
};

// Call fetch function on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchGameInfo();
});




const titleElement = document.querySelector("#game-name");
const breadcrumbElement = document.querySelector(".breadcrumb");
const imageElement = document.querySelector(".Game-Image");
const priceElement = document.querySelector(".product-price");
const descriptionElement = document.querySelector(".description");


console.log(titleElement)
console.log(breadcrumbElement)
console.log(imageElement )
console.log(priceElement )
console.log(descriptionElement)
console.log()            