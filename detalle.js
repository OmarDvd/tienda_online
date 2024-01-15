
/*con esta función llamamos al detalle cada vez que pulsamos al boton ver (tiene esta funcion asociada que asigna al boton el valor del id de la pelicula)*/

const cargarDetalle = async (id) => {

    try {
        //la llamada a la api solo devuelve un elemento porque busca por id
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX`);

        console.log(respuesta);

        if (respuesta.status === 200) {
            //tenemos exito en la busqueda
            const datos = await respuesta.json();
console.log(datos.title);
//creamos contenedor tarjeta de la película detalle y habilitamos los botones para añadir al carrito o de volver a la vista de peliculas
var peliculas = document.createElement('div');

                peliculas.innerHTML += `	<div class="detalle" id="details">

                    <div class="peliculaDetalle">
                    <button type="button" class="botonCarrito" onclick="vercarrito()">Carrito: ${actualizaCarritoVista()
                    }</button>

                        <img class="posterDetalle" src="https://image.tmdb.org/t/p/w500/${datos.poster_path}">
                        <h3 class="tituloDetalle">${datos.title}</h3>
                        <div class="descripcionDetalle">Sinopsis:</br> ${datos.overview}</div>
                        <div class="popularidadDetalle">Puntuación:</br>  ${datos.popularity}</div>
                        <div class="flotaBotones"><button type="button" id="${datos.id}" onClick="anade(${datos.id})">Añadir al carrito</button>
                        <button type="button" onClick="cerrarDetalle()">Volver</button>
                        </div>
                    </div>
                    </div>
                `;
                //añadimos la tarjeta al body
                document.body.appendChild(peliculas);

                //por la forma de mostrar el detalle(en la misma pagina, como una especie de modal que ocupa el 100%, se puede ver en el css)
                //tenemos que ocultar las películas de vistazo general para crear el efecto de ver solo el detalle. Pues las recorremos 
                // porque su clase es pelicula y no peliculaDetalle y las ocultamos
                const elementos = document.getElementsByClassName('pelicula');
                for (let i = 0; i < elementos.length; i++) {
                  elementos[i].style.display = 'none';
                  
                }
                //mostramos el detalle
                document.getElementById('details').style.display = 'flex';
                document.getElementById('details').style.flexDirection = 'column';



           

        } else if (respuesta.status === 401) {
            console.log('Pusiste la llave mal');
        } else if (respuesta.status === 404) {
            console.log('La película que buscas no existe');
        } else {
            console.log('Hubo un error y no sabemos qué pasó');
        }

    } catch (error) {
        console.log(error);
    }
}



/*el botón volver nos borrar el detalle y ver las películas al mostrarlas de nuevo*/
function cerrarDetalle(){
    document.getElementById('details').remove();


    const elementos = document.getElementsByClassName('pelicula');
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].style.removeProperty('display')     }}