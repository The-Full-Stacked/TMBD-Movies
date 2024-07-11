const apiKey = '1ea90721265232919876bf080480bc4b'; 
const baseUrl = 'https://api.themoviedb.org/3';

// Fetch and display popular movies
fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => displayMovies(data.results, 'popular-grid'));

// Fetch and display top-rated movies
fetch(`${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => displayMovies(data.results, 'top-rated-grid'));

// Fetch and display upcoming movies
fetch(`${baseUrl}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => displayMovies(data.results, 'upcoming-grid'));

function displayMovies(movies, gridId) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = '';  // Clear previous content
    movies.forEach(movie => {
        const movieTile = document.createElement('div');
        movieTile.classList.add('movie-tile');

        const movieImage = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieTile.appendChild(movieImage);

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-info');

        const movieTitle = document.createElement('h4');
        movieTitle.classList.add('movie-title');
        movieTitle.textContent = movie.title;
        movieInfo.appendChild(movieTitle);

        const movieYear = document.createElement('p');
        movieYear.classList.add('movie-year');
        movieYear.textContent = `Release Year: ${movie.release_date.split('-')[0]}`;
        movieInfo.appendChild(movieYear);

        const movieDescription = document.createElement('p');
        movieDescription.classList.add('movie-description');
        movieDescription.textContent = movie.overview;
        movieInfo.appendChild(movieDescription);

        const movieGenres = document.createElement('p');
        movieGenres.classList.add('movie-genre');
        movieGenres.textContent = `Genre: ${getGenres(movie.genre_ids)}`;
        movieInfo.appendChild(movieGenres);

        movieTile.appendChild(movieInfo);
        grid.appendChild(movieTile);
    });
}

function getGenres(genreIds) {
    const genres = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Science Fiction',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western'
    };
    return genreIds.map(id => genres[id]).join(', ');
}

