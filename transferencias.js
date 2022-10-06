class Destino {
  constructor(name, lastname, count, type, cbu, address, phone) {
    this.nombre = name;
    this.apellido = lastname;
    this.cuenta = count;
    this.tipo = type;
    this.cbuu = cbu;
    this.direccion = address;
    this.telefono = phone;
  }
}
const destinos = []
destinos.push(new Destino("TOPO", "Gomez", "001", "a sueldo", 12340000056789, "pascual toso 1090", 2613653368))
destinos.push(new Destino("Joaquin", "Gomez", "002", "corriente", 2345600000007891, "pascual toso 1090", 2613675552))
destinos.push(new Destino("Pocoyo", "pelado", "003", "en dolares", 345678900000012, "calle falsa 123", 55513444))
destinos.push(new Destino("Pato", "amarillo", "004", "en dolares", 45678900000123, "calle falsa 123", 55513444))
destinos.push(new Destino("Eli", "rosa", "005", "en dolares", 56789100000234, "calle falsa 123", 55513444))

var b = document.getElementById("ok")
b.addEventListener("click", mandar) 
var x = 0
var sal = document.getElementById("22").value
function mandar(){
  var s = document.getElementById("contactos").value
  if(s == destinos[0].nombre){
    x = 0
    imprimir()
  }
  else if(s == destinos[1].nombre){  
    x = 1
    imprimir()
  }
  else if(s == destinos[2].nombre){  
    x = 2
    imprimir()
  }
  else if(s == destinos[3].nombre){  
    x = 3
    imprimir()
  }
  else if(s == destinos[4].nombre){  
    x = 4
    imprimir()
  }
}
function imprimir(){
  const userDest = document.createElement("body")
  userDest.innerText = "Cuenta: " + destinos[x].cuenta + " Nombre: " + destinos[x].nombre + " CBU: " + destinos[x].cbuu
  document.body.append(userDest)
  
  var seg = document.createElement("button")
  seg.innerText = "ok"
  seg.id = 12
  document.body.append(seg)
  var o = document.getElementById("12")  
  o.addEventListener("click", final)
}

function final(){
  document.write("va a realizar una trasferencia al siguiente destinatario <br>")
  document.write("<br>Nombre de Destinatario: " + destinos[x].nombre + "<br>")
  document.write("Apellido de Destinatario: " + destinos[x].apellido + "<br>")
  document.write("CBU: " + destinos[x].cbuu + "<br>")
  document.write("Nro de Cuenta:" + destinos[x].cuenta + "<br>")
  document.write("Tipo de Cuenta:" + destinos[x].tipo + "<br>")
  document.write("Telefono:" + destinos[x].telefono + "<br>")
  document.write("Direccion:" + destinos[x].direccion + "<br>")

  f = prompt("ingrese monto a transferir a: " + destinos[x].nombre + " " + destinos[x].apellido, "")
  console.log(f)
  console.log(sal)

  if(f < sal){
    document.write("<br> se envio correctamente: $ " + f)
    document.write("<br> saldo: $ " + (sal - f))
  }
  else{
    alert("no hay tanto dinero")
    setTimeout( function() { window.location.href = "pantalla_logueo.html"; }, 1000 );
  }
}

//reloj
function actual() {
  fecha=new Date(); //Actualizar fecha.
  hora=fecha.getHours(); //hora actual
  minuto=fecha.getMinutes(); //minuto actual
  segundo=fecha.getSeconds(); //segundo actual
         if (hora<10) { //dos cifras para la hora
            hora="0"+hora;
            }
         if (minuto<10) { //dos cifras para el minuto
            minuto="0"+minuto;
            }
         if (segundo<10) { //dos cifras para el segundo
            segundo="0"+segundo;
            }
         //ver en el recuadro del reloj:
         mireloj = hora+" : "+minuto+" : "+segundo;
				 return mireloj;
}
function actualizar() { //función del temporizador
   mihora=actual(); //recoger hora actual
   mireloj=document.getElementById("reloj"); //buscar elemento reloj
   mireloj.innerHTML=mihora; //incluir hora en elemento
	 }
setInterval(actualizar,1000); //iniciar temporizador
