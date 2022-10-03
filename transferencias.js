class Destino {
  constructor(name, count, cbu) {
    this.nombre = name;
    this.cuenta = count;
    this.cbuu = cbu;
  }
}
const destinos = [];
destinos.push(new Destino("TOPO", 001, 123456789));
destinos.push(new Destino("Joaquin", 002, 234567891));
destinos.push(new Destino("Pocoyo", 003, 345678912));
destinos.push(new Destino("Pato", 004, 456789123));
destinos.push(new Destino("Eli", 005, 567891234));


var s = document.getElementById("contactos").value;
//var m = document.getElementById("dinero").value;
var b = document.getElementById("ok");
b.addEventListener("click", mandar);

function mandar(){
  
  //console.log(m);
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
