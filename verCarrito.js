/*definimos una funcion para cargar el contenido del carrito, como vemos, lo haremos de uno en uno (la peticion a la api usada aqui busca por id)*/


const cargarContenido = async (id) => {

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX`);

        console.log(respuesta);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
console.log(datos.title);
/*tenemos exito y creeamos un contenedor para el elemento con el que estemos trabajando*/
var peliculas = document.createElement('div');


/*como hemos hecho un foreach no tenemos idea del index del array en el que estamos, por eso usamos la función findIndex para poder acceder
al número de unidades del elemento que acabamos de buscar en el carrito*/
const index = carrito.findIndex(element => element[0] ===  datos.id);
var cantidad=carrito[index][1];/*aqui lo hemos encontrado y almacenado*/
/*creamos la tarjeta del elemento leido en el carrito, decimos también su cantidad, y habilitamos los botones con su función asociada que se encuentran 
en el archivo carrito.js. Esto es un acercamiento a un crud de los elementos del carrito*/

                peliculas.innerHTML += `	<div class="carritoTarjeta" id="carritoTarjeta${datos.id}">

                        <img class="posterDetalle" src="https://image.tmdb.org/t/p/w500/${datos.poster_path}">
                        <h3 class="tituloDetalle">${datos.title}</h3>
                        <h3 class="cantidadDetalle" id="cantidadDetalle${datos.id}">Cantidad: ${cantidad}</h3>

                        <button type="button" onClick="sumaleUno(${datos.id})">Sumar uno</button>
                        <button type="button" onClick="restaleUno(${datos.id})">Quitar uno</button>
                        <button type="button" onClick="quita(${datos.id})">Elimina película</button>
                        <!--<button type="button" onClick="vaciarCarrito()">Vaciar todo</button>-->
                        
                    </div>
                `;
                var contenedorCarrito=document.querySelectorAll(".contenedorCarrito")[0];

                contenedorCarrito.appendChild(peliculas);





           

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

/*cargamos el contenido del carrito, como vemos de uno en uno y solo accediendo al primer valor del array de cada elemento,
el primer valor es el id del elemento y el segundo valor es la cantidad. La api solo necesita el id, obviamente, por eso le pasamos
solo el primer valor*/
carrito.forEach(item => {
    cargarContenido(item[0]);
});














