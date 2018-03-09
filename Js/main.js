const arrayPersonajes = [
    {
        nombre: "abra",
        rutaImagen: "Img/abra.png",
    },{
        nombre: "bullbasaur",
        rutaImagen: "Img/bullbasaur.png",
    },{
        nombre: "charmander",
        rutaImagen: "Img/charmander.png",
    },{
        nombre: "dratini",
        rutaImagen: "img/dratini.png",
    },{
        nombre: "eevee",
        rutaImagen: "Img/eevee.png",
    },{
        nombre: "jigglypuff",
        rutaImagen: "Img/jigglypuff.png",
    },{
        nombre: "mankey",
        rutaImagen: "Img/mankey.png",
    },{
        nombre: "meowth",
        rutaImagen: "Img/meowth.png",
    },{
        nombre: "pidgey",
        rutaImagen: "Img/pidgey.png",
    },{
        nombre: "pikachu-2",
        rutaImagen: "Img/pikachu-2.png",
    },{
        nombre: "psyduck",
        rutaImagen: "Img/psyduck.png",
    },{
        nombre: "squirtle",
        rutaImagen: "Img/squirtle.png",
    }
]

const game = document.getElementById("game");   //Constante game del div game de HTML
const rejilla = document.createElement("section"); //Creamos una constante rejilla donde irán los personajes
const ganador = document.getElementById("ganador");

const doblePersonajes = arrayPersonajes.concat (arrayPersonajes).sort(()=> 0.5 - Math.random());    //Al refrescar mezcla las cartas cada vez de difrente manera 

var contador = 0;       //Para contar cuantas cartas llevamos seleccionadas
var primerSeleccionado = ""; //Primera carta seleccionada
var segundoSeleccionado = "";    //Segunda carta seleccionada
var selPrevio = null;   //Para el doble click

//Audio

var inicio = document.getElementById("inicio"); //Creamos variable
var clic = document.getElementById("clic"); //Creamos variable
var acierto = document.getElementById("acierto");   //Creamos variable
var fail = document.getElementById("fail"); //Creamos variable
var win = document.getElementById("win");   //Creamos variable

//Reloj cuenta atrás

var segcon = 0;
var segundos = 20;  //150 =2.30min


rejilla.setAttribute("class","rejilla");    //Damos clase rejilla a la constante rejilla
game.appendChild(rejilla);

doblePersonajes.forEach(personaje => {      //Creamos el doble de personajes para hacer parejas
    const {nombre, rutaImagen } = personaje;        //Crea una constande de nombre personaje con imagen y ruta de cada personaje
    tarjeta = document.createElement("div");   //Crea un div de cada uno de los personajes < div></div>
    tarjeta.classList.add("tarjeta");   //Crea un div de cada uno de los personajes y le da la clase < div class="tarjeta" ></div>
    tarjeta.dataset.name = nombre;      //Crea un div de cada uno de los personajes y le da la clase y el dataset < div class="tarjeta" dataset="nombre"></div>
    
    anverso = document.createElement("div");    //Crear un elemento div
    anverso.classList.add("anverso");   //Le damos la clase anverso a ese div

    reverso = document.createElement("div");    //Crear un elemento div
    reverso.classList.add("reverso")        //Le damos la clase reverso a ese div
    reverso.style.backgroundImage = `url(${rutaImagen})`;   //Fondo de cada div,la imagen de cada personaje
    
    rejilla.appendChild(tarjeta);   //Creamos un div tarjeta dentro del div rejilla
    tarjeta.appendChild(anverso);   //Creamos un div anverso dentro del div tarjeta
    tarjeta.appendChild(reverso);   //Creamos un div reverso dentro del div tarjeta
});

rejilla.addEventListener("click",function(evento){      //Detecta cuando hacemos click en la rejilla
    var seleccionado = evento.target;     //Cuando seleccionamos el objeto le da el evento
    inicio.pause(); //Pausa el audio del inicio
    clic.play();    //Activa al hacer click en las tarjetas
    inicio.play();  //Activa el inicio

    if(seleccionado.nodeName === "SECTION" || //No selecciona la rejilla externa solo los div de cada personaje
    seleccionado.parentNode === selPrevio || 
    seleccionado.parentNode.classList.contains("eliminado")){     
        return; 
    }

    if(contador <2){    //Si el contador es menor de 2 al hacer click
        contador++;  //contador sube de 1 en 1 hasta 2
        if (contador === 1) {   // "si selecciona 1" //Al seleccionar el primero 
            primerSeleccionado = seleccionado.parentNode.dataset.name; //lo almacena en primerSeleccionado
            seleccionado.parentNode.classList.add("seleccionado");     //Selecciona los personajes
        } else {        // "si además selecciona otro" //Al seleccionar el segundo
            segundoSeleccionado = seleccionado.parentNode.dataset.name;    //lo almacena en segundoSeleccionado
            seleccionado.parentNode.classList.add("seleccionado");     //Selecciona los personajes
        }
        if (primerSeleccionado !== "" && segundoSeleccionado !== "") {      //Si primerSeleccionado es distinto de vacío y segundo seleccionado es distinto de vacío
            if (primerSeleccionado === segundoSeleccionado) {    //Si primerSeleccionado es igual a segundoSeleccionado
               setTimeout(eliminar,1200);  //Los elimina ...
               setTimeout(resetSelect,1200);      //...si son iguales
                contEliminados();
            } else {            //Resetea... 
                setTimeout(resetSelect,1200);    //...si no son iguales
            }
        }
        selPrevio = seleccionado.parentNode;     //Para que solo nos deje marcar uno
    } 
});

var eliminar = function (){
    var eliminados = document.querySelectorAll(".seleccionado");     //Coge todos los que tengan la clase seleccionado y los almacena es la variable eliminados
    
    eliminados.forEach(eliminado => {       
        eliminado.classList.add("eliminado");     //Al hacer click en una tarjeta le quita la clase seleccionado y le da la clase eliminado y lo elimina
        inicio.pause(); //Pausa el audio de inicio
        acierto.play()  //Activa el audio acierto al acertar cada pareja
        inicio.play();   //Activa el inicio
    });
}

var resetSelect = function () {        //Se acierte o no se vuelve a poder jugar
    primerSeleccionado = "";    //Vuelve a poner vacío el primer seleccionado para volver a elegir otro
    segundoSeleccionado = "";       //Vuelve a poner vacío el segundo seleccionado para volver a elegir otro
    contador = 0;       //volvemos a poner el contador a 0 para poder seguir uniendo variables

    var seleccionados = document.querySelectorAll(".seleccionado"); //Almacena todos los objetos que tengan la clase seleccionado al contador ser menor que 2,solo podrá haber 2 con esa clase
    seleccionados.forEach(seleccionado => {    //Al elegir las dos cartas iguales ...
        seleccionado.classList.remove("seleccionado");  //...quita la clase seleccionado a los que la tengan
    });
}

var contEliminados = function () {
    var eliminados = document.querySelectorAll(".eliminado").length +2; //+ 2 porque todavia no ha contado los elementos eliminados
    if (eliminados === 2) {
        inicio.pause(); //Pausa el inicio 
        win.play(); //Activa el audio de ganador
        document.getElementById("boton").disabled = false;
        update();
        document.getElementById("game").style.display = "none";
        ganador.classList.add("open");
        document.getElementById("reloj").style.display = "none"; //Quita el reloj al ganar
        document.getElementById("game-over").style.display = "none";    //Quita el game over
    }
};


//Reloj cuenta atrás

function reloj (){
    var s = parseInt(segundos % 60);
    var ss = ("0" + s).slice (-2);
    var m = parseInt(segundos / 60);
    var mm = ("0" + m).slice(-2);
    document.getElementById("reloj").innerHTML = mm + ":" + ss;
    if (segundos > 0) {
        var t = setTimeout(function(){
            reloj();    //Recursividad
        },1000);
        document.getElementById("game-over").style.display = "none"; //No muestra el game over
        document.getElementById("game").style.display = "initial";  //Muestra el juego al pulsar botón
        document.getElementById("img").style.display = "none";  //Quita el logo de Pokemon al iniciar el juego
    } else{
        inicio.pause();
        fail.play();
        document.getElementById("game-over").style.display = "initial";     //Muestra el game-over cuando acaba el tiempo   
        document.getElementById("game-over").innerHTML = "Game Over!!";
        document.getElementById("boton").disabled = false;  // Deshabilita el botón durante está el contador
        update();   //Llamamos a la función para que se vuelvan a mezclar las tarjetas
        segundos = 20; //151 = 2.50 min + 1
    }
    segundos--;
    
}

boton.addEventListener("click", function(){
    inicio.currentTime = 0;         //Al comenzar el juego con el boton comienza el audio
    inicio.play();
});

function update () {
    while (rejilla.firstChild) {
        rejilla.removeChild (rejilla.firstChild);
    }
    const doblePersonajes = arrayPersonajes.concat (arrayPersonajes).sort(()=> 0.5 - Math.random());    //Al refrescar mezcla las cartas cada vez de difrente manera 
    
    doblePersonajes.forEach(personaje => {      //Creamos el doble de personajes para hacer parejas
        const {nombre, rutaImagen } = personaje;        //Crea una constande de nombre personaje con imagen y ruta de cada personaje
        tarjeta = document.createElement("div");   //Crea un div de cada uno de los personajes < div></div>
        tarjeta.classList.add("tarjeta");   //Crea un div de cada uno de los personajes y le da la clase < div class="tarjeta" ></div>
        tarjeta.dataset.name = nombre;      //Crea un div de cada uno de los personajes y le da la clase y el dataset < div class="tarjeta" dataset="nombre"></div>
        
        anverso = document.createElement("div");    //Crear un elemento div
        anverso.classList.add("anverso");   //Le damos la clase anverso a ese div
    
        reverso = document.createElement("div");    //Crear un elemento div
        reverso.classList.add("reverso")        //Le damos la clase reverso a ese div
        reverso.style.backgroundImage = `url(${rutaImagen})`;   //Fondo de cada div,la imagen de cada personaje
        
        rejilla.appendChild(tarjeta);   //Creamos un div tarjeta dentro del div rejilla
        tarjeta.appendChild(anverso);   //Creamos un div anverso dentro del div tarjeta
        tarjeta.appendChild(reverso);   //Creamos un div reverso dentro del div tarjeta
    });
};



