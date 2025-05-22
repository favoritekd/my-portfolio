async function searchMovies() {
  const input = document.getElementById('searchInput').value.trim();
  const movieList = document.getElementById('movieList');
  movieList.innerHTML = ''; // Clear previous results

  if (!input) return;

  const url = `https://www.omdbapi.com/?s=${input}&apikey=856a53e5`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === 'True') {
      data.Search.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';

        card.innerHTML = `
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
          <div class="movie-title">${movie.Title}</div>
          <div class="movie-year">${movie.Year}</div>
        `;

        movieList.appendChild(card);
      });
    } else {
      movieList.innerHTML = `<p>No movies found.</p>`;
    }
  } catch (error) {
    movieList.innerHTML = `<p>Error fetching movies.</p>`;
    console.error(error);
  }
}
