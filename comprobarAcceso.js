/*tanto en populares.html como en carrito.html,
si la llave no es true, es porque no ha habido token de identificacion de vuelta a la peticion de logeo
contra la api de la fakestore, por tanto, nos lleva de nuevo al login que el index.html. Si es true la llave
entonces guardamos el nombre de usuario y lo mostramos en la barra de navegacion de nuestras paginas, en el li con clase nonbreUsuario*/

if (!sessionStorage.getItem('llave')) {
    window.location.href = 'index.html';
} else {
    console.log(sessionStorage.getItem('username'));
    var elementos = document.querySelectorAll(".nombreUsuario");

    elementos.forEach(element => {
        element.textContent = sessionStorage.getItem('username');
    });

}









