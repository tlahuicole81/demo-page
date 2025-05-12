window.addEventListener('DOMContentLoaded', () => {
  fetchDatosEventosYCompetencias();
  validarArchivoImagen("comprobanteSeguro", "previewSeguro");
  validarArchivoImagen("comprobante", "previewCompEvento");
});

let base64Comprobante = null;
let imagenProcesadaOK = false;

async function fetchDatosEventosYCompetencias() {
  try {    
    const res = await fetch(URL_ACTIVA);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log("Datos recibidos:", data);

    if (data.success) {
      cargarFichas("eventos", data.eventos);
      cargarFichas("competencias", data.competencias);
      // ¡Oculta el loader!
      document.getElementById("loader").style.display = "none";
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
    const esCompetencia = idContenedor === "competencias";
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
      <button class="btn-registrar" onclick='abrirModal(${JSON.stringify(item)}, ${esCompetencia})'>Registrarme</button>
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

function adaptarLinkDrive(link) {
  const match = link.match(/[-\w]{25,}/);
  return match ? `https://drive.google.com/file/d/${match[0]}/preview` : '';
}


// Modal
const modal = document.getElementById("registroModal");
const cerrarModal = document.getElementById("cerrarModal");
cerrarModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target == modal) modal.style.display = "none"; }
let tipoActual = "evento"; // o "competencia", lo definimos al abrirModal()
let nombreCompEvento = "";
let correoOrganizador = "";
let asociacionOrganizador = "";


function abrirModal(data, esCompetencia) {
  nombreCompEvento = data.Nombre; // Almacenamos el nombre de la competencia o evento
  correoOrganizador = data.CorreoOrg;
  asociacionOrganizador = data.AsociacionOrg;

  tipoActual = esCompetencia ? "competencia" : "evento";

  const campoTalla = document.getElementById("tallaPlayera");
  const _estatura = document.getElementById("estatura");
  if (esCompetencia) {
    campoTalla.required = true;
    _estatura.required = true;
  } else {
    campoTalla.required = false;
    _estatura.required = false;
    campoTalla.value = "";
    _estatura.value = "";
  }

  const info = `
    <p><strong>Nombre:</strong> ${data.Nombre}</p>
    ${data.Fecha ? `<p><strong>Fecha:</strong> ${formatearFecha(data.Fecha)}</p>` : ''}
    ${data.Lugar ? `<p><strong>Lugar:</strong> ${data.Lugar}</p>` : ''}
    ${data.Costo ? `<p><strong>Costo:</strong> ${formatearMoneda(data.Costo)}</p>` : ''}
  `;

  document.getElementById("modalTitulo").textContent = esCompetencia ? "Registro a competencia" : "Registro a evento";
  document.getElementById("modalDatosEvento").innerHTML = info;
  document.getElementById("seccionPlayera").style.display = esCompetencia ? "block" : "none";
  document.getElementById("laEstatura").style.display = esCompetencia ? "block" : "none";
  modal.style.display = "block";
}

// Listener del formulario (placeholder)
document.getElementById("formularioRegistro").addEventListener("submit", async e => {
  e.preventDefault();
  // UI: ocultar errores previos, mostrar spinner
  const spinner = document.getElementById("spinnerEnvio");
  const btn = document.getElementById("enviarRegistro");
  spinner.style.display = "block";
  btn.disabled = true;
  btn.textContent = "Enviando...";

  const nombre = document.getElementById("nombre").value.trim();
  const id = document.getElementById("idParticipante").value.trim();
  const emailUsuario = document.getElementById("correo").value.trim();
  const talla = document.getElementById("tallaPlayera").value;
  const estaturaPart = document.getElementById("estatura").value;
  if (!nombre || !id || (tipoActual === "competencia" && !talla && !estaturaPart)) {
    alert("Por favor completa todos los campos.");
    resetearFormulario();
    return;
  }
  if (!imagenProcesadaOK || !base64Comprobante) {
    console.log("Por favor selecciona una imagen válida para el evento o competencia antes de enviar.");
    mostrarToast("Por favor selecciona una imagen válida antes de enviar.");
    resetearFormulario();
    return;
  }

  try {
    console.log("Preparando el envío");
    const payload = {
      destino: tipoActual === "evento" ? "registroEvento" : "registroCompetencia",
      nombreCompEvento,
      correoOrganizador,
      asociacionOrg: asociacionOrganizador,
      nombre,
      emailUsuario,
      idParticipante: id,
      talla: tipoActual === "competencia" ? talla : null,
      estatura: tipoActual === "competencia" ? estaturaPart : null,
      comprobante: base64Comprobante
    };    
    const response = await fetch(URL_ACTIVA0, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log("Los datos recibidos: ", data);
    if (data.success) {
      alert("¡Registro enviado correctamente!");
      document.getElementById("formularioRegistro").reset();
      modal.style.display = "none";
    } else {
      alert("Error: " + (data.message || "no se pudo enviar."));
    }

  } catch (err) {
    console.error("Error al enviar:", err);
    alert("Ocurrió un error al enviar el registro.");
  }

  resetearFormulario();
});

// Oculta spinner y reactiva botón
function resetearFormulario() {
  document.getElementById("spinnerEnvio").style.display = "none";
  const btn = document.getElementById("enviarRegistro");
  btn.disabled = false;
  btn.textContent = "Enviar registro";
}

document.getElementById("formularioSeguro").addEventListener("submit", async e => {
  e.preventDefault();

  const btn = $("enviarSeguro");
  const spinner = $("spinnerSeguro");
  btn.disabled = true;
  btn.textContent = "Enviando...";
  spinner.style.display = "block";

  const nombre = $("nombreSeguro").value.trim();
  const id = $("idSeguro").value.trim();
  const email = $("emailSeguro").value.trim();

  if (!imagenProcesadaOK || !base64Comprobante) {
    console.log("Por favor selecciona una imagen válida antes de enviar.");
    mostrarToast("Por favor selecciona una imagen válida antes de enviar.");
    resetearSeguro();
    return;
  }
  if (!nombre || !id || !email) {
    alert("Por favor completa todos los campos.");
    resetearSeguro();
    return;
  }

  try {
    const payload = {
      destino: "pagoSeguroMed",
      nombre,
      idParticipante: id,
      emailUsuario: email,
      comprobante: base64Comprobante
    };

    const res = await fetch(URL_ACTIVA0, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success) {
      const info = "El recibo de pago ha sido enviado correctamente. " + data.message;
      console.log(info);
      mostrarToast(info);
      $("formularioSeguro").reset();
    } else {
      alert("Error al enviar: " + (data.message || "sin detalle"));
    }
  } catch (err) {
    console.error(err);
    alert("Ocurrió un error inesperado.");
  }
  $('enviarSeguro').textContent = "Comprobante enviado";
  $("enviarSeguro").disabled = true;  
});

function resetearSeguro() {
  $("enviarSeguro").disabled = false;
  $("enviarSeguro").textContent = "Enviar comprobante";
  $("spinnerSeguro").style.display = "none";
}
