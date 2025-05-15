"use strict";

let modoEdicionCompe = false;
let nombreOriginalCompe = "";

const competenciasSelect = $("competenciasSelect");

const selectClubes = $("clubesSelect");
const inputClub = $("clubNombreInput");
const form = $("clubForm");

function inicializarClubes() {
  cargaDatosSlctCom();

  competenciasSelect.addEventListener("change", () => {
    const seleccionComp = eventosSelect.value;
    console.log("Selección de evento (value): ", seleccionComp);
    switch (seleccionComp) {
      case "":
        console.log("A ocultar la ficha de competencias...");
        eventosDetails.style.display = "none";
        break;
      case "Nuevo evento":
        console.log("Nuevo evento...");
        const eventoSinDatos = creaEventoVacIo();
        populateFormEventos(eventoSinDatos);
        eventosDetails.style.display = "block";
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
        eventosDetails.style.display = "block"; //
        modoEdicionEvento = true;
        beliminarEvento.style.display = "block";
    }
    // Restauramos valores:
    objCambios = {};
  });


  // Llenar selector
  selectClubes.innerHTML = '<option value="">Selecciona un club</option>';
  losClubes.forEach(club => {
    const op = document.createElement("option");
    op.value = club;
    op.textContent = club;
    selectClubes.appendChild(op);
  });

  // Mostrar datos al seleccionar
  selectClubes.addEventListener("change", () => {
    if (selectClubes.value) {
      inputClub.value = selectClubes.value;
      form.style.display = "block";
    } else {
      form.style.display = "none";
    }
  });

  // Guardar cambios
  $("guardarClubBtn").addEventListener("click", () => {
    const original = selectClubes.value;
    const nuevo = inputClub.value.trim();
    if (!nuevo) return alert("Ingresa un nombre válido.");
    const i = losClubes.indexOf(original);
    if (i !== -1) losClubes[i] = nuevo;
    alert(`Club actualizado: ${original} → ${nuevo}`);
    inicializarClubes(); // recargar lista
  });

  // Eliminar club
  $("eliminarClubBtn").addEventListener("click", () => {
    const aEliminar = selectClubes.value;
    if (confirm(`¿Eliminar el club "${aEliminar}"?`)) {
      losClubes = losClubes.filter(c => c !== aEliminar);
      alert("Club eliminado.");
      inicializarClubes();
    }
  });

  // Agregar nuevo club
  $("agregarClubBtn").addEventListener("click", () => {
    const nuevo = $("nuevoClubInput").value.trim();
    if (!nuevo) return alert("Ingresa un nombre.");
    if (losClubes.includes(nuevo)) return alert("Ese club ya existe.");
    losClubes.push(nuevo);
    alert("Nuevo club agregado.");
    $("nuevoClubInput").value = "";
    inicializarClubes();
  });
}


function cargaDatosSlctCom() {
  opcComp = [];
  opcComp[0] = "Nueva competencia"; //  
  competencias.forEach(nombre => {
    // fieldMappingEventos.eventName es lo mismo que 'Nombre del evento'
    opcComp.push(nombre[fieldMappingCompetencia.competenciaName]);
  });
  generarOpcionesSelect("competenciasSelect", opcComp);
}