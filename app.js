const API_KEY = 'de4a48fa';

document.getElementById('searchBtn').addEventListener('click', () => {
  const query = document.getElementById('query').value.trim();
  if (!query) return;

  // Hide static content
  document.getElementById('staticMovies').style.display = 'none';
   document.getElementById('heading1').textContent="Results"

  // Use backticks for template literal
  fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        displayError(data.Error || "No movies found.");
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      displayError("Something went wrong.");
    });
});

function displayMovies(movies) {
  const container = document.getElementById('movies');
  container.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const poster = movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150x220?text=No+Image';
    card.innerHTML = `
      <img src="${poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    container.appendChild(card);
  });
}

function displayError(message) {
  const container = document.getElementById('movies');
  container.innerHTML = `<p class="error">${message}</p>`;
}
