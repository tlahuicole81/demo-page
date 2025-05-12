window.addEventListener('DOMContentLoaded', () => {
  fetchDatosEventosYCompetencias();
  document.getElementById("comprobanteSeguro").value = "";
  document.getElementById("comprobante").value = "";

  validarArchivoImagen("comprobanteSeguro", "previewSeguro");
  //validarArchivoImagen("comprobante", "previewCompEvento");
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

function __cargarFichas(idContenedor, lista) {
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
    // obsoleto:  
    // ${item.Imagen ? `<iframe src="${adaptarLinkDrive(item.Imagen)}" width="100%" height="220" frameborder="0" loading="lazy"></iframe>` : ''}
  });
}
function cargarFichas(idContenedor, lista) {
  const contenedor = $(idContenedor);
  contenedor.innerHTML = '';

  lista.forEach((item, idx) => {
    //console.log("Revisando la imagen a ver qué onda");
    const esCompetencia = idContenedor === 'competencias';
    console.log("Revisando para dónde va ", esCompetencia);
    /* ----  Cartel  (base64 o enlace Drive) ---- */
    let cartelHTML = '';
    if (item.Imagen) {
      cartelHTML = item.Imagen.startsWith('data:image')
        ? `<img src="${item.Imagen}" alt="Cartel">`
        : `<iframe src="${adaptarLinkDrive(item.Imagen)}"
                   width="100%" height="220" frameborder="0" loading="lazy"></iframe>`;
    }
    
    /* ➜  Clave única para evitar colisiones */
    const key = `${idContenedor}-${idx}`;
console.log("A ver la famosa key ", key);
    /* ----  Tarjeta  ---- */
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${item.Nombre}</h2>
      ${item.Fecha ? `<p><strong>Fecha:</strong> ${formatearFecha(item.Fecha)}</p>` : ''}
      ${item.FechaIni && item.FechaFin
        ? `<p><strong>Fechas:</strong> ${formatearFecha(item.FechaIni)} – ${formatearFecha(item.FechaFin)}</p>` : ''}
      ${item.Duracion ? `<p><strong>Duración:</strong> ${item.Duracion}</p>` : ''}
      ${item.Lugar ? `<p><strong>Lugar:</strong> ${item.Lugar}</p>` : ''}
      ${item.Cuota ? `<p><strong>Cuota:</strong> ${formatearMoneda(item.Cuota)}</p>` : ''}
      ${item.Costo ? `<p><strong>Costo:</strong> ${formatearMoneda(item.Costo)}</p>` : ''}
      ${item.Categoria ? `<p><strong>Categoría:</strong> ${item.Categoria}</p>` : ''}
      ${item.Subcategoria ? `<p><strong>Subcategoría:</strong> ${item.Subcategoria}</p>` : ''}
      ${item.Rama ? `<p><strong>Rama:</strong> ${item.Rama}</p>` : ''}
      ${item.FechaLimite ? `<p><strong>Inscripción hasta:</strong> ${item.FechaLimite}</p>` : ''}
      ${item.DatosPago ? `<p><strong>Datos de pago:</strong> ${item.DatosPago}</p>` : ''}
      ${cartelHTML}

      <button class="btn-registrar"
              onclick="mostrarFormulario('${key}')">Registrarme</button>

      <!-- FORMULARIO INLINE OCULTO -->
      <div id="formContainer-${key}" class="form-inline" style="display:none;">
        <form id="formRegistro-${key}" data-tipo="${esCompetencia ? 'competencia' : 'evento'}">
          <label>Nombre completo:<input type="text" name="nombre" required></label>
          <label>ID o CURP:<input type="text" name="id" required></label>
          <label>E-mail:<input type="email" name="email" required></label>

          <label>Comprobante de pago:
            <input type="file" name="comprobante"
                   id="comp-${key}" accept="image/jpeg,image/png" required>
          </label>
          <div id="prev-${key}"></div>

          <!-- Campos extra SOLO para competencias -->
          <div class="extraComp" ${esCompetencia ? '' : 'style="display:none;"'}>
            <label>Estatura (cm):<input type="text" name="estatura" ${esCompetencia ? 'required' : ''}></label>
            <label>Talla de playera:
              <select name="talla" ${esCompetencia ? 'required' : ''}>
                <option value="">Selecciona</option>
                <option value="Chica">Chica</option>
                <option value="Mediana">Mediana</option>
                <option value="Grande">Grande</option>
                <option value="Extragrande">Extragrande</option>
              </select>
            </label>
          </div>

          <button type="submit">Enviar registro</button>
        </form>
      </div>

      <div class="contacto">
        ${item.AsociacionOrg ? `<p><strong>Asociación:</strong> ${item.AsociacionOrg}</p>` : ''}
        ${item.Telefono ? `<p><strong>Tel.:</strong> ${item.Telefono}</p>` : ''}
        ${item.Correo ? `<p><strong>Email:</strong> <a href="mailto:${item.Correo}">${item.Correo}</a></p>` : ''}
        ${item.WebPage ? `<p><strong>Web:</strong> <a href="${item.WebPage}" target="_blank">${item.WebPage}</a></p>` : ''}
      </div>
    `;

/* Guardamos algunos metadatos en dataset para el envío */
    card.dataset.nombreEvento   = item.Nombre;
    card.dataset.correoOrg      = item.CorreoOrg || item.Correo || '';
    card.dataset.asociacionOrg  = item.AsociacionOrg || '';

    contenedor.appendChild(card);

    /* === Activamos validación de la imagen para este formulario === */
    validarArchivoImagen(`comp-${key}`, `prev-${key}`);
    /* === Listener de envío de este formulario específico === */
    document.getElementById(`formRegistro-${key}`).addEventListener('submit', e => enviarRegistroInline(e, card));

  });
  
}

/* ============  Mostrar / ocultar el form de una ficha  ============ */
function mostrarFormulario(key) {
  console.log("Nombre del formulario: ", key);
  const div = document.getElementById(`formContainer-${key}`);
  div.style.display = div.style.display === 'none' ? 'block' : 'none';
  setTimeout(() => {
    div.querySelector('button[type="submit"]')
       .scrollIntoView({ behavior:'smooth', block:'end' });
  }, 100);
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
  //${data.Lugar ? `<p><strong>Lugar:</strong> ${data.Lugar}</p>` : ''}
  const info = `
    <p><strong>Nombre:</strong> ${data.Nombre}</p>
    ${data.Fecha ? `<p><strong>Fecha:</strong> ${formatearFecha(data.Fecha)}</p>` : ''}
    
    ${data.Costo ? `<p><strong>Costo:</strong> ${formatearMoneda(data.Costo)}</p>` : ''}
  `;

  document.getElementById("modalTitulo").textContent = esCompetencia ? "Registro a competencia" : "Registro a evento";
  document.getElementById("modalDatosEvento").innerHTML = info;
  document.getElementById("seccionPlayera").style.display = esCompetencia ? "block" : "none";
  document.getElementById("laEstatura").style.display = esCompetencia ? "block" : "none";
  modal.style.display = "block";
  // Espera un instante para asegurar que todo el contenido esté renderizado
  setTimeout(() => {
    const boton = document.getElementById("enviarRegistro");
    boton.scrollIntoView({ behavior: "smooth", block: "end" });
  }, 100);
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
    //console.log(JSON.stringify(payload));
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
  document.getElementById("comprobante").value = "";
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
  document.getElementById("comprobanteSeguro").value = "";
  resetearSeguro();
});

function resetearSeguro() {
  $("enviarSeguro").disabled = false;
  $("enviarSeguro").textContent = "Enviar comprobante";
  $("spinnerSeguro").style.display = "none";
}
