"use strict";


const selectClubes = $("clubesSelect");
const inputClub = $("clubNombreInput");
const form = $("clubForm");

function inicializarClubes() {
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
