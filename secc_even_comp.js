"use strict";

let modoEdicionEvento = false;
let nombreOriginalEvento = "";
let opcEventos = [];

const beliminarEvento = $("eliminarEvento");
const bsalvarEvento = $("salvarEvento");

const eventosSelect = $("eventosSelect");
const detallesEventos = $("eventosDetails");

/* 
*/
function inicializarEventos() {
  cargaDatosSlctEventos();
  document.getElementById("fotoEventoInput").value = "";
  validarArchivoImagen("fotoEventoInput", "previewCompEvento");
  $('previewCompEvento').innerHTML = "";
  // ComboBox para la selección del evento
  eventosSelect.addEventListener("change", () => {
    const seleccionEvento = eventosSelect.value;
    console.log("Selección de evento (value): ", seleccionEvento);
    switch (seleccionEvento) {
      case "":
        console.log("A ocultar la ficha de eventos...");
        detallesEventos.style.display = "none";
        break;
      case "Nuevo evento":
        console.log("Nuevo evento...");
        //const eventoSinDatos = creaEventoVacIo();
        const eventoSinDatos = creaObjetoVacio(fieldMappingEventos);
        populateFormEventos(eventoSinDatos);
        detallesEventos.style.display = "block";
        modoEdicionEvento = false;
        beliminarEvento.style.display = "none";
        break;
      default:
        // Si estamos acá se editará la información de los eventos.         
        console.log("Acá se leerá y pondrá la información de los eventos ya registrados");
        //const selectedEvento = eventos.find(evento => evento[fieldMappingEventos.eventName] === eventosSelect.value);
        const selectedEvento = eventos.find(evento => evento["Nombre del evento"] === eventosSelect.value);
        populateFormEventos(selectedEvento);
        nombreOriginalEvento = selectedEvento["Nombre del evento"];
        detallesEventos.style.display = "block"; //
        modoEdicionEvento = true;
        beliminarEvento.style.display = "block";
    }
    // Restauramos valores:
    objCambios = {};
  });

  bsalvarEvento.addEventListener("click", async () => {
    if (!modoEdicionEvento && !imagenProcesadaOK) {
      //console.log("Si estamos en modo Nuevo evento y no hay imagen disponible");
      mostrarToast("Por favor selecciona una imagen");
      return;
    }

    // Primero revisar si hay algo para enviar    
    if (confirm(`¿Enviar la información?`)) {
      deshabilitaBotonesPArteEvento();
      const datos = camposHtmlAObjeto(fieldMappingEventos);
      //                condición ? expresiónSiVerdadero : expresiónSiFalso     
      datos["Imagen"] = imagenProcesadaOK ? base64Comprobante : "";

      let destino = "NuevoEvento"; // presuponemos
      if (modoEdicionEvento) {
        // Estamos en modo edición, en este modo se puede enviar o no una nueva imagen
        // Es necesario enviar el nombre original del evento
        destino = "EditarEvento";
        datos["nombreOriginal"] = nombreOriginalEvento;
      }
      const val = JSON.stringify({ destino, datos });
      console.log(val);
      const resp = await enviarPOST(val);
      alert(resp.message);
      modificarArr(resp.nuevaURLImg);
      habilitaBotonesPArteEvento();
      return;
    }
  });

  beliminarEvento.addEventListener("click", async () => {
    if (confirm(`¿Eliminar la información de este evento?`)) {
      deshabilitaBotonesPArteEvento();
      console.log("Sí, se quiere eliminar");
      const destino = "EliminarEvento";
      const objetivo = nombreOriginalEvento;
      const val = JSON.stringify({ destino, objetivo });
      console.log(val);
      const resp = await enviarPOST(val);
      alert(resp.message);
      if(resp.success){
        // Se eliminará la información del evento del array principal
        eliminaEvento();
      }
      habilitaBotonesPArteEvento();
    }
  });


  document.querySelectorAll('.edit-field-evento').forEach(field => {
    field.addEventListener('input', () => {

      console.log("Selección hecha por el usuario: ", eventosSelect.value);
      if (eventosSelect.value === "Nuevo evento") {
        if (field.value === "") {

        } else {

        }


      } else {
        // Comparamos los valores ingresados        
      }

    });
  });
}

// Cuando el usuario modificó la información del evento se actualizará
// el objeto "eventos" que es donde está almacenada a información.
function modificarArr(nuevaImg) {
  // Buscar el objeto evento en el array
  const evento = eventos.find(e => e["Nombre del evento"] === nombreOriginalEvento);
  if (evento) {
    // Como sí se encontró el objeto entonces vamos a modificar los valores.
    Object.entries(fieldMappingEventos).forEach(([fieldId, config]) => {
      if (fieldId === "eventPoster") {
        if (nuevaImg !== "")
          evento["Imagen"] = nuevaImg;
      } else {
        const viewField = $(fieldId); // fieldId corresponde al nombre de los controles html
        //console.log("Valor nuevo: ", viewField.value, "  Valor actual: ", evento[config]);
        // Actualizamos el campo en el objeto
        evento[config] = viewField.value;
      }
    });
    //     
  } else {
    // Se agregará un nuevo evento
    const datos = camposHtmlAObjeto(fieldMappingEventos);
    datos["Imagen"] = (nuevaImg !== "") ? nuevaImg : "";
    eventos.push(datos);
  }
  cargaDatosSlctEventos();
}

function eliminaEvento(){
// Con .filter() se recorre todo el array
  const eventosActualizados = eventos.filter(evento => evento["Nombre del evento"] !== nombreOriginalEvento);
  //console.log("La actualización de los eventos: ", eventosActualizados);
  eventos.length = 0; // Se vacía el array original
  eventos.push(...eventosActualizados); // Rellenas con el nuevo contenido
  cargaDatosSlctEventos();
}

function cargaDatosSlctEventos() {
  opcEventos = [];
  opcEventos[0] = "Nuevo evento"; //  
  eventos.forEach(nombre => {
    // fieldMappingEventos.eventName es lo mismo que 'Nombre del evento'
    opcEventos.push(nombre[fieldMappingEventos.eventName]);
  });
  generarOpcionesSelect("eventosSelect", opcEventos);
}

function revisaCamposEventos() {
  const fichaActiva = document.querySelector(".content.active");
  const requeridos = fichaActiva.querySelectorAll("[required]");
}

function deshabilitaBotonesPArteEvento() {
  bsalvarEvento.innerText = "Espera un momento por favor";
  bsalvarEvento.disabled = true;
  beliminarEvento.disabled = true;
  //
  bAsociados.disabled = true;
  bClubes.disabled = true;
  bEventos.disabled = true;
  bCompetencias.disabled = true;
}

function habilitaBotonesPArteEvento() {
  bsalvarEvento.innerText = "Guardar";
  bsalvarEvento.disabled = false;
  beliminarEvento.disabled = false;

  bAsociados.disabled = false;
  bClubes.disabled = false;
  bEventos.disabled = false;
  bCompetencias.disabled = false;
  // Forzamos un cambio en el <select>
  eventosSelect.value = "Nuevo evento";
  eventosSelect.dispatchEvent(new Event('change'));
}

function populateFormEventos(selectedEvento) {
  //console.log("Examinando estructura evento: ", selectedEvento);  
  Object.entries(fieldMappingEventos).forEach(([fieldId, config]) => {
    const viewField = $(fieldId); // fieldId corresponde al nombre de los controles html
    //console.log("fieldId: ", fieldId, "   config: ", config);
    switch (fieldId) {
      case "eventPoster":
        //console.log("Sí, acá va el poster: ", selectedEvento[config]);
        imagenContenedor('previewCompEvento', "fotoEventoInput", selectedEvento[config]);
        break;
      case "eventDuration":
        viewField.value = selectedEvento[config];
        break;
      default:
        viewField.value = selectedEvento[config] || '';
    }    
    nombreOriginalEvento = "";
  });
}

/* Esta función compartida permite visualizar una imagen con iframe tomando la url proporcionada por GAS  
*/
function imagenContenedor(elContenedor, elInput, urlImg) {
  const contenedor = $(elContenedor);
  const laInput = $(elInput);
  if (urlImg !== "") {
    const match = urlImg.match(/\/d\/([a-zA-Z0-9_-]+)\//);
    if (match && match[1]) {
      const fileId = match[1];
      const iframe = document.createElement('iframe');
      iframe.src = `https://drive.google.com/file/d/${fileId}/preview`;
      iframe.style.border = "none";

      // Eliminar iframe anterior si ya existe
      const anterior = contenedor.querySelector("iframe");
      if (anterior) contenedor.removeChild(anterior);
      // Eliminar img anterior si ya existe
      const otraAnterior = contenedor.querySelector("img");
      if (otraAnterior) contenedor.removeChild(otraAnterior);
      contenedor.appendChild(iframe);
    }
  }
  else {
    // Se tiene que limpiar la posible imagen previa
    contenedor.innerHTML = "";
    laInput.value = "";
  }
  base64Comprobante = null;
  imagenProcesadaOK = false;
}

/* Función compartida
*/
function creaObjetoVacio(fieldMapping) {
  let objVacio = {};
  Object.entries(fieldMapping).forEach(([fieldId, config]) => {
    objVacio[config] = "";
  });
  return objVacio;
}

function camposHtmlAObjeto(fieldMapping) {
  const datos = {};
  // Recorremos el fieldMappingEventos.
  // idCampo es el nombre del control html  ||| nombreHeader es el valor del campo recibido en el JSON
  Object.entries(fieldMapping).forEach(([idCampo, nombreHeader]) => {
    //            condición ? expresiónSiVerdadero : expresiónSiFalso
    const valor = document.getElementById(idCampo)?.value || "";
    datos[nombreHeader] = valor;
  });
  // Campos extra fuera del mapping
  datos["Usuario Organizador"] = elCorreo;
  datos["Asociación Organizador"] = nombreAsociacion;

  return datos;
}
