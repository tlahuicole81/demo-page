
window.addEventListener('DOMContentLoaded', () => {
  fetchDatosEventosYCompetencias();
});

const URL_ACTIVA = 'https://script.google.com/macros/s/AKfycby2ncpiLXY6vWg2hOQ4XGYCLcvcJnesYaYY6037eXDlxiKl3UT8o8BkbsZd4fAD59YZsA/exec';


async function fetchDatosEventosYCompetencias() {
  try {
    const res = await fetch(URL_ACTIVA);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log("Datos recibidos:", data);

    if (data.success) {
      cargarFichas("eventos", data.eventos);
      cargarFichas("competencias", data.competencias);
    } else {
      console.error("Error del servidor:", data.message || "Sin mensaje");
    }
  } catch (err) {
    console.error("Error al obtener datos:", err);
  }
}

function formatearFecha(fechaStr) {
  if (!fechaStr) return '';
  const [anio, mes, dia] = fechaStr.split("-");
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                 "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const nombreMes = meses[parseInt(mes, 10) - 1];
  return `${parseInt(dia, 10)} de ${nombreMes} de ${anio}`;
}

function formatearMoneda(valor) {
  if (isNaN(valor)) return valor; // si ya viene formateado
  return Number(valor).toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  });
}

function cargarFichas(idContenedor, lista) {
  const contenedor = document.getElementById(idContenedor);
  contenedor.innerHTML = '';

  lista.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${item.Nombre}</h2>
      ${item.Fecha ? `<p><strong>Fecha:</strong> ${formatearFecha(item.Fecha)}</p>` : ''}
      ${item.FechaIni && item.FechaFin ? `<p><strong>Fechas:</strong> ${formatearFecha(item.FechaIni)} – ${formatearFecha(item.FechaFin)}</p>` : ''}
      ${item.Duracion ? `<p><strong>Duración:</strong> ${item.Duracion}</p>` : ''}
      ${item.Lugar ? `<p><strong>Lugar:</strong> ${item.Lugar}</p>` : ''}
      ${item.Cuota ? `<p><strong>Cuota:</strong> ${formatearMoneda(item.Cuota)}</p>` : ''}
      ${item.Costo ? `<p><strong>Costo:</strong> ${formatearMoneda(item.Costo)}</p>` : ''}
      ${item.Categoria ? `<p><strong>Categoría:</strong> ${item.Categoria}</p>` : ''}
      ${item.Subcategoria ? `<p><strong>Subcategoría:</strong> ${item.Subcategoria}</p>` : ''}
      ${item.Rama ? `<p><strong>Rama:</strong> ${item.Rama}</p>` : ''}
      ${item.FechaLimite ? `<p><strong>Inscripción hasta:</strong> ${item.FechaLimite}</p>` : ''}
      ${item.DatosPago ? `<p><strong>Datos de pago:</strong> ${item.DatosPago}</p>` : ''}
      ${item.Imagen ? `<img src="${item.Imagen}" alt="Cartel">` : ''}
      <div class="contacto">
        ${item.AsociacionOrg ? `<p><strong>Asociación:</strong> ${item.AsociacionOrg}</p>` : ''}
        ${item.Telefono ? `<p><strong>Tel.:</strong> ${item.Telefono}</p>` : ''}
        ${item.Correo ? `<p><strong>Email:</strong> <a href="mailto:${item.Correo}">${item.Correo}</a></p>` : ''}
        ${item.WebPage ? `<p><strong>Web:</strong> <a href="${item.WebPage}" target="_blank">${item.WebPage}</a></p>` : ''}
      </div>
    `;

    contenedor.appendChild(card);
  });
}

// function CargaLosEventos(losEventos) {
//   const contenedor = document.getElementById("eventos");
//   contenedor.innerHTML = ''; // limpia por si hay recarga

//   losEventos.forEach(evento => {
//     const card = document.createElement("div");
//     card.className = "card";

//     card.innerHTML = `
//       <h2>${evento.Nombre}</h2>
//       <p><strong>Fechas:</strong> ${evento.FechaIni} – ${evento.FechaFin}</p>
//       <p><strong>Duración:</strong> ${evento.Duracion}</p>
//       <p><strong>Lugar:</strong> ${evento.Lugar}</p>
//       <p><strong>Cuota:</strong> ${evento.Cuota}</p>
//       <p><strong>Inscripción hasta:</strong> ${evento.FechaLimite}</p>
//       ${evento.Imagen ? `<img src="${evento.Imagen}" alt="Cartel del evento">` : ''}
//       <div class="contacto">
//         <p><strong>Asociación:</strong> ${evento.AsociacionOrg}</p>
//         <p><strong>Tel.:</strong> ${evento.Telefono}</p>
//         <p><strong>Email:</strong> <a href="mailto:${evento.Correo}">${evento.Correo}</a></p>
//         <p><strong>Web:</strong> <a href="${evento.WebPage}" target="_blank">${evento.WebPage}</a></p>
//       </div>
//     `;
//     contenedor.appendChild(card);
//   });
// }

// function CargaCompetencias(lasCompetencias) {
//   const contenedor = document.getElementById("eventos");
//   contenedor.innerHTML = ''; // limpia por si hay recarga

//   lasCompetencias.forEach(competencia => {
//     const card = document.createElement("div");
//     card.className = "card";

//     card.innerHTML = `
//       <h2>${competencia.Nombre}</h2>
//       <p><strong>Fecha:</strong> ${competencia.Fecha}</p>
//       <p><strong>Lugar:</strong> ${competencia.Lugar}</p>
//       <p><strong>Costo:</strong> ${competencia.Costo}</p>
//       <p><strong>Categoría:</strong> ${competencia.Categoria}</p>
//       <p><strong>Subcategoría:</strong> ${competencia.Subcategoria}</p>
//       ${competencia.Imagen ? `<img src="${competencia.Imagen}" alt="Cartel del evento">` : ''}
//       <div class="contacto">
//         <p><strong>Asociación:</strong> ${competencia.AsociacionOrg}</p>
//         <p><strong>Tel.:</strong> ${competencia.Telefono}</p>
//         <p><strong>Email:</strong> <a href="mailto:${competencia.Correo}">${competencia.Correo}</a></p>
//         <p><strong>Web:</strong> <a href="${competencia.WebPage}" target="_blank">${competencia.WebPage}</a></p>
//       </div>
//     `;
//     contenedor.appendChild(card);
//   });
// }

/*
function CargaLosEventos(losEventos) {
  const contenedor = document.getElementById("eventos");
  contenedor.innerHTML = ''; // limpia por si hay recarga

  losEventos.forEach(evento => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${evento.Nombre}</h2>
      <p><strong>Fechas:</strong> ${evento.FechaIni} – ${evento.FechaFin}</p>
      <p><strong>Duración:</strong> ${evento.Duracion}</p>
      <p><strong>Lugar:</strong> ${evento.Lugar}</p>
      <p><strong>Cuota:</strong> ${evento.Cuota}</p>
      <p><strong>Inscripción hasta:</strong> ${evento.FechaLimite}</p>
      ${evento.Imagen ? `
        <iframe src="${evento.Imagen}" allowfullscreen frameborder="0"></iframe>
      ` : ''}
      <div class="contacto">
        <p><strong>Asociación:</strong> ${evento.AsociacionOrg}</p>
        <p><strong>Tel.:</strong> ${evento.Telefono}</p>
        <p><strong>Email:</strong> <a href="mailto:${evento.Correo}">${evento.Correo}</a></p>
        <p><strong>Web:</strong> <a href="${evento.WebPage}" target="_blank">${evento.WebPage}</a></p>
      </div>
    `;

    contenedor.appendChild(card);
  });
}
*/

// async function fecthDatosEventos() {
//   try {
//     const respuesta = await fetch(URL_ACTIVA);
//     if (!respuesta.ok) {
//       throw new Error(`Error en la solicitud: ${respuesta.status}`);
//     }
//     const datos = await respuesta.json();
//     console.log("Datos recibidos:", datos);
//     CargaLosEventos(datos.eventos);
//     CargaCompetencias(datos.competencias);
//   } catch (error) {
//     console.error("Error al obtener datos:", error);
//   }
// }