// Open the modal window by clicking the image
function openModal(movieData, index) {

    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    // Fill the movie data in the modal window
    document.getElementById('modal-image').src = movieData.results[index].image_url;
    document.getElementById('modal-title').textContent = movieData.results[index].title;
    document.getElementById('modal-genre').textContent = movieData.results[index].genres;
    document.getElementById('modal-release-date').textContent = movieData.results[index].year;
    document.getElementById('modal-rated').textContent = movieData.results[index].votes;
    document.getElementById('modal-imdb-score').textContent = movieData.results[index].imdb_score;
    document.getElementById('modal-director').textContent = movieData.results[index].directors;
    document.getElementById('modal-actors').textContent = movieData.results[index].actors;
         
}

// Close the modal window
document.getElementById('close-button').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});
