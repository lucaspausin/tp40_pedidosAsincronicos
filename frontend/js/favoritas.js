window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  try {
    const response = await fetch('http://localhost:3031/api/movies')
    const { meta, data } = await response.json()
    let peliculasfavoritas = localStorage.getItem('peliculasfavoritas');
    let favoritas=peliculasfavoritas.split("-")
    data.forEach((movie) => {
      if (favoritas.includes(movie.id.toString())) {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length?movie.length:0}`;
        
        const link = document.createElement('a');
      link.textContent = "Ver Más"
      link.setAttribute('href',`formulario.html?movie=${movie.id}`)
      link.setAttribute('id',"botonFavorito");
        const removeFavorite = document.createElement('button');
        removeFavorite.textContent="Remover de Favoritos";
        removeFavorite.classList.add("botonFavorito")
        removeFavorite.setAttribute('id',"botonFavorito");
        removeFavorite.addEventListener('click',function(){
          let peliculasfavoritas=localStorage.getItem('peliculasfavoritas');
          let idPelis = peliculasfavoritas.split("-").map(Number);
          let idPelisSinLaPeli = idPelis.filter(numero=>numero != movie.id);
          let nuevoStringPelisFavoritas=idPelisSinLaPeli.join("-");
          localStorage.setItem('peliculasfavoritas',nuevoStringPelisFavoritas);
          location.reload()
        })

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
        card.appendChild(link);
        card.appendChild(removeFavorite);
    }
    });
  } catch (error) {
  }
};
