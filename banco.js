const coleccion = [];
coleccion.push(new Usuario("Jhenny", 0827, "contraseña"));
coleccion.push(new Usuario("Isabella", 1104, "contraseña"));
coleccion.push(new Usuario("Agustin", 1379, "contraseña"));

var u = document.getElementById("username");
var p = document.getElementById("password");
var b = document.getElementById("entrar");
b.addEventListener("click", paso);

function paso(){
    for (i = 0; i < 3; i++){
      if(u.value == coleccion[i] || p.value == "contraseña"){
        document.write("redirigiendo...");
        setTimeout( function() { window.location.href = "pantalla_logueo.html"; }, 3000 );
        return;
      }
      else{
        document.write("incorrecto");
        i=3;
        setTimeout( function() { window.location.href = "Banco.html"; }, 2000 );
      }
    }
}
