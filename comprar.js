/*Si intentamos acceder al carrito desde la barra de navegación, si está vacío,
nos va a llevar de nuevo a la página principal de ver películas, si no es al caso y hay elementos,
nos lleva a la página de carrito y nos crear los botones de vacias carrito y de comprar definitivamente
*/

if(carrito.length>0){

    var botonVaciar = document.createElement("button");
    botonVaciar.type = "button";
    botonVaciar.className = "botonVaciar";
    botonVaciar.id = "botonVaciar";
    botonVaciar.innerHTML = "Vaciar carrito";
    botonVaciar.addEventListener("click", function() {
        vaciarCarrito();
    });

document.body.appendChild(botonVaciar);


    var botonComprar = document.createElement("button");
botonComprar.type = "button";
botonComprar.className = "botonComprar";
botonComprar.id = "botonComprar";
botonComprar.innerHTML = "Comprar definitivamente";
document.body.appendChild(botonComprar);
}else{
    window.location.href = 'popular.html';

}



/*la siguiente variable va a ser el contenido del mensaje que se va a enviar al correo
introducido en el login referente a la comprar y número de elementos comprados en el carrito*/
//esta variable se va a actualizar cuando vayamos a comprar defintivamente dandole al boton correposdiente
// primero se llenará con el contenido del carrito y tras enviar el mensaje se reseteará a cero
var mensajePedido="";


/*esta función será llamada cuando compremos y se ejecurará por cada elemento del carrito.
Como vemos hay dos argumentos, el id del elemento, y el número de unidades solicitadas*/
const cargaContenidoCarrito = async (idPeli,cantidadPeli) => {

    try {
        console.log(idPeli);
        console.log(cantidadPeli);

/*como tenemos el id del producto, queremos su nombre para el mensaje, pues tenemos que buscarlo llamando a la api y que nos traiga su registro y coger su titulo*/
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${idPeli}?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX`);

        console.log("estaremos aqui?");

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            console.log(cantidadPeli +" unidades de la película "+datos.title+"\n");
            /*Añadimos una línea con el nombre de la película y el número de unidades solicitadas*/
            mensajePedido+=cantidadPeli +" unidades de la película "+datos.title+"\n";
            console.log(mensajePedido);

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



























/*Aquí es donde asignamos una función al boton comprar que llamará para cada elemento del carrito
a la función mencionada anteriormente
Como en cada interacción llamamos a la api y hay una petición, por tanto la llamada es await y por ende,
esta función asignada al botonComprar es asincrona*/

const btn = document.getElementById('botonComprar');
console.log(sessionStorage.getItem('email'));
btn.addEventListener('click', async function(event) {
    var prepararPedidoStr = sessionStorage.getItem('carrito');
    console.log("Contenido de 'carrito' en sessionStorage:", prepararPedidoStr);
    var prepararPedido = JSON.parse(prepararPedidoStr);
    console.log(prepararPedido[0][0]);
    
    for(let i=0;i<prepararPedido.length;i++){
        /*esta linea añade una linea a mensajePedido con el nombre de la película y su número de unidades*/
        await cargaContenidoCarrito(prepararPedido[i][0], prepararPedido[i][1]);

    }
    
   event.preventDefault();

   /*aquí mandamos el correo con la información comprada al email introducido en el login*/
   btn.textContent = 'Comprando...';
   emailjs.send("service_o6x5yhr","template_2hju27i",{
    emailjs_name: sessionStorage.getItem('username'),
    emailjs_to: sessionStorage.getItem('email'),
    emailjs_email: "omarescamez@gmail.com",
    emailjs_message: mensajePedido,
    });
    btn.textContent = 'Compra realizada. Hemos mandado un email';
    /*limpiamos el mensaje*/
    mensajePedido="";
    /*en dos segunos, esta función nos llevará de nuevo a la sercción en la que podemos ver películas*/
    comprar();
});



