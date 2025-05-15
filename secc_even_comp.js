"use strict";

let modoEdicionEvento = false;
let nombreOriginalEvento = "";

const beliminarEvento = $("eliminarEvento");
const bsalvarEvento = $("salvarEvento");

const eventosSelect = $("eventosSelect");
const detallesEventos = $("eventosDetails");
/* 
*/
function inicializarEventos() {
  cargaDatosSlctEventos();
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
        const eventoSinDatos = creaEventoVacIo();
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
    // Primero revisar si hay algo para enviar    
    if (confirm(`¿Enviar la información?`)) {
      deshabilitaBotonesPArteEvento();
      const datos = {};
      // Recorremos el fieldMappingEventos
      Object.entries(fieldMappingEventos).forEach(([idCampo, nombreHeader]) => {
        const valor = document.getElementById(idCampo)?.value || "";
        datos[nombreHeader] = valor;
      });
      // Campos extra fuera del mapping
      datos["Usuario Organizador"] = elCorreo;
      datos["Asociación Organizador"] = nombreAsociacion;
      //
      let destino = "EditarEvento"; // presuponemos
      if (modoEdicionEvento) {
        // Se editaron los campos para los eventos. La imagen es opcional
        // condición ? expresiónSiVerdadero : expresiónSiFalso
        datos["Imagen"] = imagenProcesadaOK ? base64Comprobante : "";
        // Sin embargo es necesario enviar el nombre original del evento
        datos["nombreOriginal"] = nombreOriginalEvento;
      } else {
        destino = "NuevoEvento";
        if (imagenProcesadaOK) {
          // La imagen base64 
          datos["Imagen"] = base64Comprobante;
        } else {
          // Acá la imagen es obligatoria
          habilitaBotonesPArteEvento();
          mostrarToast("Por favor selecciona una imagen");
          return;
        }
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
      const objetivo = nombreOriginalEvento
      const val = JSON.stringify({ destino, objetivo });
      console.log(val);
      const resp = await enviarPOST(val);
      alert(resp.message);
      habilitaBotonesPArteEvento();
    }
  });


  document.querySelectorAll('.edit-field-evento').forEach(field => {
    field.addEventListener('input', () => {
      // Obtenemos la ID del control para poder configurar el nombre del valor en el JSON
      //let nmb = field.id.toString().replace("Input", "");
      //nmb = nmb[0].toUpperCase() + nmb.slice(1);
      //console.log("El control del cambio fue: ", field.name);
      // Se comparan valores, 
      // El valor constante para identificar dónde está ocurriendo la modificación es por
      // medio del comboBox de selección de eventos, ya que tiene la opción de "Nuevo evento"
      // y los eventos descargados.
      console.log("Selección hecha por el usuario: ", eventosSelect.value);
      if (eventosSelect.value === "Nuevo evento") {
        if (field.value === "") {

        } else {

        }


      } else {
        // Comparamos los valores ingresados        
      }
      /*if (initialData[nmb] !== field.value) {
        // El usuario modificó un campo, se resalta cambiando el color del borde.
        field.style.borderColor = "#ff9800";
        contCambios++;
        if (contCambios === 1) {
          // Ocurrió la primera modificación, cuando esto sucede se deshabilitan
          // los botones...
        }
      } else {
        // El usuario regresó al valor previo del cambio en el campo
        field.style.borderColor = "#ccc";
        contCambios--;
      }*/
    });
  });
}

// Cuando el usuario modificó la información del evento se actualizará
// el objeto "eventos" que es donde está almacenada a información.
function modificarArr(nuevaImg) {
  console.log("La nueva imagen: ", nuevaImg);
  // nombreOriginalEvento
  // Buscar el objeto evento en el array
  const evento = eventos.find(e => e["Nombre del evento"] === nombreOriginalEvento);
  if (evento) {
    // evento[campo] = nuevoValor;
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
    cargaDatosSlctEventos();
  }
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

function creaEventoVacIo() {
  const eventoVac1o = {};
  Object.entries(fieldMappingEventos).forEach(([fieldId, config]) => {
    eventoVac1o[config] = "";
  });
  return eventoVac1o;
}

function populateFormEventos(selectedEvento) {
  //console.log("Examinando estructura evento: ", selectedEvento);  
  Object.entries(fieldMappingEventos).forEach(([fieldId, config]) => {
    const viewField = $(fieldId); // fieldId corresponde al nombre de los controles html
    //console.log("fieldId: ", fieldId, "   config: ", config);
    switch (fieldId) {
      case "eventPoster":
        //console.log("Sí, acá va el poster: ", selectedEvento[config]);
        if (selectedEvento[config] !== "") {
          const match = selectedEvento[config].match(/\/d\/([a-zA-Z0-9_-]+)\//);
          if (match && match[1]) {
            const fileId = match[1];
            const iframe = document.createElement('iframe');
            iframe.src = `https://drive.google.com/file/d/${fileId}/preview`;
            iframe.style.border = "none";

            const contenedor = $('previewCompEvento');
            // Eliminar iframe anterior si ya existe
            const anterior = contenedor.querySelector("iframe");
            if (anterior) contenedor.removeChild(anterior);
            // Eliminar img anterior si ya existe
            const otraAnterior = contenedor.querySelector("img");
            if (otraAnterior) contenedor.removeChild(otraAnterior);
            contenedor.appendChild(iframe);
          }
        } else {
          // Se tiene que limpiar la posible imagen previa
          $("previewCompEvento").innerHTML = "";
          document.getElementById("fotoEventoInput").value = "";
        }
        break;
      case "eventDuration":
        viewField.value = selectedEvento[config];
        break;
      default:
        viewField.value = selectedEvento[config] || '';
    }
    base64Comprobante = null;
    imagenProcesadaOK = false;
    nombreOriginalEvento = "";
  });
}
