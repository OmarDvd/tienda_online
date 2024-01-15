

// definimos una variable para actualizar en función de la petición que estemos haciendo a la api
// esto será en función de lo que elijamos en nuestra barra de navegación (tres posibilidades)
// en la barra de navegación esto se hace gracias a enlaces que solo ejecutan funciones que mencionaremos
// más adelante en esta hoja de script
// películas populares, menos populares o próximo estrenos

let ordenActual = "populares"; 


/*cualquiera de las peticiones que hagamos tiene una variable página en el registro que nos manda. En cada
página nos da 20 elementos. Nuestro scroll infinito será cuando hayamos visto la tarjeta 20 y queramos seguir viendo más,
que llamaremos a la siguiente página*/
let pagina=1;


/*Necesitamos un observador*/
let observador = new IntersectionObserver(async (entradas, observador) => {
    entradas.forEach(entrada => {
        /*si observamos ese elemento, mostramos un cargando durante un segundo y luego lo ocualtamos justo cuando cargamos peliculas
        Esto lo hemos hecho para simular un loading*/
        if (entrada.isIntersecting) {
            document.getElementById('loader').style.display = 'flex';

            setTimeout(() => {
                document.getElementById('loader').style.display = 'none';
                /*funcion asincrona que carga películas en función del ordenActual establecido. Justo aquí 
                es la que permite el scroll infinito porque es cuando el observador encuentra lo que busca y carga más*/
                cargarPeliculas();
            }, 1000);
        }
    });
}, {
    /*Hemos puesto 200px del bottom para que se carguen antes de agotar de ver el último elemento, así se va preparando*/
    rootMargin: '0px 0px 200px 0px',
    threshold: 1.0
});

const cargarPeliculas = async () => {
    try {
        // en funcion del ordenActual hacemos una petición u otra y le pasamos la página que toque en función de nuestro uso en el momento
        // cada vez que cambiamos de orden, la página vuelve a 0 y solo se muestran los primeros 20 elementos
        if(ordenActual==="populares"){
             respuesta = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&include_adult=false&include_video=false&language=en-US&page=${pagina}&sort_by=popularity.desc`);
        }else if(ordenActual==="menosPopulares"){
             respuesta = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&include_adult=false&include_video=false&language=en-US&page=${pagina}&sort_by=popularity.asc`);
        }else{
             respuesta = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&include_adult=false&include_video=false&language=en-US&page=${pagina}`);

        }

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            const peliculasNuevas = datos.results;

            peliculasNuevas.forEach(pelicula => {
                /*creamos la tarjeyta película*/
                const peliculaHTML = `
                    <div class="pelicula" >
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                        <button type="button" id="${pelicula.id}" onClick="cargarDetalle(this.id)">Ver</button>
                    </div>
                `;


                /*en función del orden, añadimos cada unos de esos 20 elementos (estamos dentro de un bucle)
                al div pertinente (podemos ver los div vacíos preparados en popular.html) Cada uno tiene su propio div
                el cual vaciaremos o llenaremos según cambiemos de ordenActual*/
                if(ordenActual==="populares"){

                    document.getElementById('contenedor').innerHTML += peliculaHTML;
                    
                }else if(ordenActual==="menosPopulares"){

                    document.getElementById('contenedorN').innerHTML += peliculaHTML;
                }else{

                    document.getElementById('contenedorU').innerHTML += peliculaHTML;
       
               }
            });


/*Lo siguiente es para decir que nuestra próxima llamada a la api para cargar películas será cuando nuestro observador observe a la última película cuando su tarjeta se escape en los 200px del bottom*/
            var peliculasEnPantalla;
            if(ordenActual==="populares"){
                 peliculasEnPantalla = document.querySelectorAll('.contenedor .pelicula');
            }else if(ordenActual==="menosPopulares"){
                 peliculasEnPantalla = document.querySelectorAll('.contenedorN .pelicula');
            }else{
                 peliculasEnPantalla = document.querySelectorAll('.contenedorU .pelicula');
   
           }


            const ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length - 1];
            observador.observe(ultimaPelicula);
/*preparamos el valor de página a uno más por si siguiesemos scroleando, así llamaríamos a 20 nuevos elementos, si no serían los mismos 20*/
            pagina++;
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

/*esta llamada se hace una vez, cuando cargamos la página popular.html Es obligatoria porque es la que hace que se accione el resto de funcionalidad*/
cargarPeliculas();


/*A continuación se definen las tres funciones asociadas a los diferentes ordenes establecidos (Selecccionables desde el ul de la navegación)*/
// cada una de ellas cambia el parámetro del orden actual, vacia el contenido de los contenedores
// que tienen un orden distinto y llena el suyo llamando a cargarPelículas(). Por supuesto,
// como hemos cambiado de orden, también nuestro número de página vuelve a ser 1. Aquí mostramos
// la potencia de la carga en una sola página

function ordenarMenosPopulares() {
    if(ordenActual!=="menosPopulares"){
        console.log("entro menos " + ordenActual);

        pagina=1;
    ordenActual = "menosPopulares";
    document.getElementById('lugar').innerHTML = "Películas menos populares";


    document.getElementById('contenedor').innerHTML = "";
    document.getElementById('contenedorU').innerHTML = "";

    cargarPeliculas();
    }

}

function ordenarMasPopulares() {
    if(ordenActual!=="populares"){
        console.log("entro más " + ordenActual);

    pagina=1;
    ordenActual = "populares";
    document.getElementById('lugar').innerHTML = "Películas más populares";

    document.getElementById('contenedorN').innerHTML = "";
    document.getElementById('contenedorU').innerHTML = "";

    cargarPeliculas();
    }

}

function ordenarProximosEstrenos() {
    if(ordenActual!=="proximosEstrenos"){
        console.log("entro proximo " + ordenActual);

    pagina=1;
    ordenActual = "proximosEstrenos";
    document.getElementById('lugar').innerHTML = "Próximos estrenos";

    document.getElementById('contenedor').innerHTML = "";
    document.getElementById('contenedorN').innerHTML = "";

    cargarPeliculas();
    }

}
