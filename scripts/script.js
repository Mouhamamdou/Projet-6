// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {

    // Base URL for the API
    const baseURL = "http://localhost:8000/api/v1/titles/";

    // Get references to HTML elements
    const bestRatedMovies = document.querySelector(".movie-list")
    const categoryMovies = document.querySelectorAll(".category-movies")

    // Defins URLs for different categories
    const urls = {
        bestRated: `${baseURL}?sort_by=-imdb_score`,
        romance: `${baseURL}?genre=Romance&sort_by=-imdb_score`,
        action: `${baseURL}?genre=Action&sort_by=-imdb_score`,
        horror: `${baseURL}?genre=Horror&sort_by=-imdb_score`,
        bestMovie: `${baseURL}?sort_by=-imdb_score`
    };

    // Function to generate movie data by fetching additional pages
    function generateMovie(movieData){
        const page2url = movieData.next
        
        return fetch(page2url)
            .then(response => response.json())
            .then(dataPage2 => {
                // Append results from page 2 to the existing list under the "results" key
                movieData.results = movieData.results.concat(dataPage2.results);
            })
            .catch(error => console.error('erreur lors de la récupération des données de la page 2:', error))
            .then(() => movieData);
        
    }

    // Function to load movies from the API
    function loadMovies(url) {
        return fetch(url)
            .then(response => response.json())
            .then(movies => generateMovie(movies))
            .catch(error => console.error(error));
    }

    // Function to create a movie element form a template
    function createMovieElement(result, i) {
        const movieTemplate = document.getElementById('movie-template');
        const movieClone = document.importNode(movieTemplate.content, true);

        const imageElement = movieClone.querySelector('img');
        imageElement.src = result.image_url

        /*const titleElement = movieClone.querySelector('.movie-title');
        titleElement.textContent = result.title;
            
        const genreElement = movieClone.querySelector('.movie-genre');
        genreElement.textContent = result.genres;*/
    
        return movieClone;
    }

    //Function to load and display movie for a given category
    function loadAndDisplayMovies(url, categoryElement, moviesToDisplay, element) {
        return loadMovies(url)
            .then(movieData => {
                const movieClones = movieData.results
                    .slice(0, Math.min(moviesToDisplay, movieData.results.length))
                    .map((result, i) => {
                        const movieClone = createMovieElement(result, i)

                        const imageElement = movieClone.querySelector('img');
                        imageElement.addEventListener('click', () => openModal(movieData, i));

                        return movieClone
                    })
            
                categoryElement.append(...movieClones);

                executeCarousel(element);

            })
            .catch(error => console.error(error));
    }

    function executeCarousel(element) {
        new Carousel(document.querySelector(element), {
            slidesToScroll: 1,
            slidesVisible: 4
        })
    }
  
    // load and display movies for each category
    loadAndDisplayMovies(urls.romance, categoryMovies[0], 7, "#romance-movies"),
    loadAndDisplayMovies(urls.action, categoryMovies[1], 7, "#action-movies"),
    loadAndDisplayMovies(urls.horror, categoryMovies[2], 7, "#horror-movies"),
    loadAndDisplayMovies(urls.bestRated, bestRatedMovies, 7, "#best-movies-list"),
    loadAndDisplayMovies(urls.bestMovie, document.querySelector(".best-movie"), 1)

    // Open the modal window by clicking the details button
    document.getElementById('modal-button').addEventListener('click', function() {
        loadMovies(urls.bestMovie)
            .then(movieData => openModal(movieData, 0))
            .catch(error => console.error(error));
    });

});

