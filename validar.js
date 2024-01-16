// la variable llave es la que pasa a true si hay token en la respuesta a nuestra peticion de login
// esta será la variable responsable de que si no nos hemos loegado, volvamos al login si intentamos acceder desde otra página

var llave = false;


/*
usaremos username y password para logearnos contra la api de fakestore. Solamente usaremos esta api para el login
el nombre lo usaremos para simular estar logeados con un perfil
el email es al que se enviará la información de la compra con la plantilla creada en emailjs*/
function validar() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var nombreUsuario=document.getElementById("nombre").value;
    var email=document.getElementById("email").value;

    /*preparamos los datos para el logeo que necesita la api*/

    var formData = {
        username: username,
        password: password
    };
/*llamada a logeo de la api*/
    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //si el logeo es correcto pasamos a true y probamos a irnos a popular.html, si no, seguiremos en el login
            if (data.token) {
                sessionStorage.setItem('username', nombreUsuario);
                sessionStorage.setItem('llave',true);
                sessionStorage.setItem('carrito', []);
                sessionStorage.setItem('email', email);

                

                window.location.href = 'popular.html';
            } else {
                alert("usuario o contraseña incorrectos");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}









