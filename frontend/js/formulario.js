window.onload = async () => {

    let query = new URLSearchParams(location.search);
    console.log(query.get('movie'));

    try {

        const response = await fetch(`http://localhost:3031/api/movies/${query.get('movie')}`)

        const { meta, data } = await response.json();
        let title = document.getElementById('title');
        title.value = data?data.title:null;
        let rating = document.getElementById('rating');
        rating.value = data?data.rating:null;
        let awards = document.getElementById('awards');
        awards.value = data?data.awards:null;
        let release_date = document.getElementById('release_date');
        release_date.value = data?data.release_date.split("T")[0]:null;
        let length = document.getElementById('length');
        length.value = data?data.length:null;
        let titular=document.getElementById("peliculatitulo");
        if(data){titular.innerText="Edicion de pelicula: "+data.title};
    } catch (error) {
        console.log(error);
    };
    let titular = document.getElementById("peliculatitulo");
    let titular2 = document.getElementById("peliculatitulo2");
    if(titular.innerHTML.length>0){
        titular.hidden=false;
    }else{
        titular2.hidden=false;
    };
    let botonCrear = document.getElementById("botonCrear");
    let botonEditar = document.getElementById("botonEditar");
    let botonEliminar = document.getElementById("botonEliminar");
    if(!query.get("movie")){
        botonCrear.hidden=false;
    }else{
        botonEditar.hidden=false;
        botonEliminar.hidden=false;
    };
    
    botonCrear.addEventListener('click', async function (event) {
        event.preventDefault();
        var formulario = document.querySelector("form");
        var datos = new FormData(formulario);
        var jsonData = {};
        datos.forEach((value, key) => {
          jsonData[key] = value;
        });
        jsonData= JSON.stringify(jsonData);
        await fetch("http://localhost:3031/api/movies/create", {
            method: 'POST',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
              throw new Error('Error al agregar la película');
            }
            console.log('Película agregada');
          })
          .catch(error => {
            console.error('Error:', error);
        });
        window.location.href = "http://localhost:5500/home.html";
    });
    botonEditar.addEventListener("click",async function(event){
        event.preventDefault();
        var formulario = document.querySelector("form");
        var datos = new FormData(formulario);
        var jsonData = {};
        datos.forEach((value, key) => {
          jsonData[key] = value;
        });
        jsonData= JSON.stringify(jsonData);
        await fetch(`http://localhost:3031/api/movies/update/${query.get("movie")}`, {
            method: 'PUT',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
              throw new Error('Error al editar la película');
            }
            console.log('Película Editada');
          })
          .catch(error => {
            console.error('Error:', error);
        });
        location.reload();
    });

    botonEliminar.addEventListener('click',async function(event){
        event.preventDefault();
        await fetch(`http://localhost:3031/api/movies/delete/${query.get("movie")}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            if(!response.ok){
                throw new Error("Error al eliminar la película");
            }
            console.log("Pelicula eliminada!");
        }).catch(error=>{
            console.log(error);
        })
        window.location.href = "http://localhost:5500/home.html";
    });
}