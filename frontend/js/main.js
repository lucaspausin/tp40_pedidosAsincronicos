window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

try {
  
  const response = await fetch('http://localhost:3031/api/movies')
  const {meta, data} = await response.json()

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length?movie.length:0}`;

      const link = document.createElement("a");
      link.textContent = "Ver Más"
      link.setAttribute('href', `formulario.html?movie=${movie.id}`)
      link.setAttribute('id',"botonFavorito")
      link.classList.add("botonVerMas")

      const addFavorite = document.createElement('button');
      addFavorite.textContent="Añadir a favoritos";
      addFavorite.classList.add("botonFavorito");
      addFavorite.setAttribute('id',"botonFavorito");
      addFavorite.addEventListener('click',function(){
        if(localStorage.getItem('peliculasfavoritas')){
          let peliculasfavoritas=localStorage.getItem('peliculasfavoritas');
          let variableFavoritas = peliculasfavoritas.split("-");
          if(!(variableFavoritas.includes(movie.id.toString()))){
            peliculasfavoritas+="-"+movie.id;
            localStorage.setItem('peliculasfavoritas',peliculasfavoritas);
          }
        }else{
          let peliculasfavoritas=[];
          peliculasfavoritas.push(movie.id)
          localStorage.setItem('peliculasfavoritas',peliculasfavoritas);
        }
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
      card.appendChild(addFavorite);
    });
} catch (error) {
  console.log(error);
}

};
