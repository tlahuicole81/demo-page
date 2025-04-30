const URL_ACTIVA0 = "https://script.google.com/macros/s/AKfycbzw644S7yCml9Ui_AZvu29swKpUeshyqK535fKr-WsqPGq6b5_8e5bZPyj-6JB3lkMxlw/exec"; // 01
function $(id) {
  return document.getElementById(id);
}

function GV(id) {
  const x = document.getElementById(id);
  return x.value;
}

function CLi(id) {
  const x = $(id);
  x.value = '';
}

function VL(id) {
  const x = $(id).value;
  return x;
}

const estados = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
  "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima",
  "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México (Edo.)",
  "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora",
  "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
];

const disciplinas = [
  "Alta Montaña",
  "Barranquismo",
  "Escalada Deportiva",
  "Escalada en roca",
  "Espeleología",
  "Senderismo",
  "Vía Ferrata",
  "Escalada en hielo"
];

const tipoSangre = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
];

const elGenero = ["Masculino", "Femenino"];

const laEscolaridad = [
  "Primaria", "Secundaria", "Media superior", "Superior"
];

const funcion = [
  "Deportista", "Entrenador", "Fisiatra", "Juez/Árbitro", "Personal administrativo", "Prensa",
  "Voluntariado", "Personal técnico", "Consejo directivo", "Servicio médico"
];

const funcion_personalTec = [
  "Equipador de rutas", "Equipador de barrancos", "Registro de senderos", "Medio ambiente", "Acceso", "Seguridad", "Armador de bloques"
];
const funcion_consejo = [
  "Presidente club", "Vicepresidente club", "Secretario club", "Presidente asociación", "Vicepresidente asociación",
  "Tesorero asociación", "Secretario asociación", "Vocal directivo asociación", "Vocal deportivo asociacón", "Comisario asociación", "Representante jurídico asociación"
];

const funcion_serMed = [
  "Médico", "Psicólogo", "Nutriólogo"
];

/* Variables GLOBALES */
let laFuncion = "";
let laSubFuncion = "";
let base64String = "";
let lasDisciplinas = "";
let asociacionSelec = "";
let clubSelec = "";
/* Fin de variables GLOBALES*/

window.addEventListener('DOMContentLoaded', () => {
  fetchData();
  generarOpcionesSelect("genero", elGenero);
  generarOpcionesSelect("escolaridad", laEscolaridad);
  generarOpcionesSelect("estado", estados);
  generarCheckboxes();
  generarOpcionesSelect("tipoSangre", tipoSangre);
  generarOpcionesSelect("funcion", funcion);
  laFuncion = GV('funcion');
});

async function fetchData() {
  try {
    const respuesta = await fetch(URL_ACTIVA0);
    if (!respuesta.ok) {
      throw new Error(`Error en la solicitud: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    console.log("Datos recibidos:", datos);
    llenarSelectAsociaciones(datos);    
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

function llenarSelectAsociaciones(clubes) {
  let selectAsociaciones = $("asociacion");
  let cont = true;
  let _estado1 = "";
  for (let estado in clubes) {
    let option = document.createElement("option");
    if (cont === true) {
      cont = false;
      _estado1 = estado;
    }
    option.value = estado; // Usamos el nombre del estado como valor
    option.textContent = `${estado} - ${clubes[estado].asociacion}`;
    selectAsociaciones.appendChild(option);
  }
  llenarSelectClubes(clubes, _estado1);
  // Escuchar cambios en el select de asociaciones
  selectAsociaciones.addEventListener("change", function () {
    let estadoSeleccionado = this.value;
    console.log("Ehhhh  " + this.value);
    llenarSelectClubes(clubes, estadoSeleccionado);
  });
}

function llenarSelectClubes(clubes, estado) {
  asociacionSelec = clubes[estado].asociacion;
  console.log("Asociación seleccionada: ", asociacionSelec);
  let selectClubes = $("clubes");
  selectClubes.innerHTML = '<option value="">Seleccione un club</option>'; // Limpiar antes de llenar  
  var cambios = true;
  if (estado && clubes[estado]) {
    clubes[estado].clubes.forEach(club => {
      if (club !== "Sin clubes") {
        let option = document.createElement("option");
        option.value = club;
        option.textContent = club;
        selectClubes.appendChild(option);

      } else {
        console.log("No hay clubes");
        selectClubes.innerHTML = '<option value="">Sin clubes</option>'; // Limpiamos
        clubSelec = "Sin clubes";
        cambios = false;
      }
    });
  }
  if (cambios === true) {
    // Acá escuchamos cuando el usuario seleccione un club
    selectClubes.addEventListener("change", function () {
      clubSelec = this.value;
      console.log("Club seleccionado: ", clubSelec);
    });
  }
}

function generarOpcionesSelect(selectId, opciones) {
  const selectElement = $(selectId);

  const opcionVacia = document.createElement("option");
  opcionVacia.value = "";
  opcionVacia.textContent = "Selecciona una opción";
  selectElement.appendChild(opcionVacia);

  opciones.forEach(opcion => {
    const optionElement = document.createElement("option");
    optionElement.value = opcion;
    optionElement.textContent = opcion;
    selectElement.appendChild(optionElement);
  });
}

function generarCheckboxes() {
  const container = $('checkboxesContainer');
  disciplinas.forEach(actividad => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'actividad';
    checkbox.value = actividad;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + actividad));
    container.appendChild(label);
  });
}

function limpiaCampos() {
  $('nombre').value = "";
  $('apellidoPaterno').value = "";
  $('apellidoMaterno').value = "";
  $('fechaNacimiento').value = "";
  $('numTelefono').value = "";
  $('email').value = "";
  $('curp').value = "";
  $('genero').value = "Selecciona una opción";
  $('escolaridad').value = "Selecciona una opción";
  $('estado').value = "Selecciona una opción";
  $('municipio').value = "";
  $('colonia').value = "";
  $('calle_numero').value = "";
  $('codigo_postal').value = "";
  $('contanto_emergencia').value = "";
  $('telefono_emergencia').value = "";
  $('enfermedades').value = "";
  $('alergias').value = "";
  $('tipoSangre').value = "Selecciona una opción";
  $('asociacion').value = "Selecciona una opción";
  //$('clubes').value = "";
  $('disciplina').value = "Selecciona una opción";
  $('funcion').value = "Selecciona una opción";
  $('subfuncion').value = "";
}


document.getElementById('funcion').addEventListener('change', function () {
  const funcionSeleccionada = GV('funcion');
  laFuncion = funcionSeleccionada;
  const sub = $('subfuncion');
  sub.innerHTML = "";
  laSubFuncion = ""; // Limpiamos
  let prueba;
  switch (funcionSeleccionada) {
    case 'Personal técnico':
      prueba = funcion_personalTec;      
      break;
    case 'Consejo directivo':
      prueba = funcion_consejo;      
      break;
    case 'Servicio médico':
      prueba = funcion_serMed;      
      break;
    default:
      document.getElementById('subfuncion').classList.remove('error');
      sub.disabled = true;
      return;
  }
  sub.disabled = false;
  generarOpcionesSelect("subfuncion", prueba);
  sub.classList.add('error');
});


function regresaDatosform() {
  let _enfermedades = GV('enfermedades');
  if (_enfermedades === "") {
    _enfermedades = "No registradas";
  }
  let _alergias = GV('alergias');
  if (_alergias === "") {
    _alergias = "No registradas";
  }
  console.log("Enfermedades: ", _enfermedades);
  console.log("Alergias: ", _alergias);

  const formData = {
    destino: "formulario",
    nombre: GV('nombre'),
    apellidoPaterno: GV('apellidoPaterno'),
    apellidoMaterno: GV('apellidoMaterno'),
    fechaNacimiento: GV('fechaNacimiento'),
    telefono: GV('numTelefono'),
    email: GV('email'),
    curp: GV('curp'),
    genero: GV('genero'),
    escolaridad: GV('escolaridad'),
    estado: GV('estado'),
    municipio: GV('municipio'),
    colonia: GV('colonia'),
    calleNumero: GV('calle_numero'),
    zip: GV('codigo_postal'),
    contactoEmergencia: GV('contanto_emergencia'),
    telefonoEmergencia: GV('telefono_emergencia'),
    enfermedades: _enfermedades,
    alergias: _alergias,
    tipoSangre: GV('tipoSangre'),
    asociacion: asociacionSelec,
    club: clubSelec,
    disciplina: lasDisciplinas,
    funcion: laFuncion,
    subfuncion: laSubFuncion,
    imagenBase64: base64String
  };
  // Convertir a JSON
  const jsonData = JSON.stringify(formData);
  console.log('Datos en formato JSON:', jsonData);
  return jsonData;
}

function abrirPathImg() {
  // Activar el input de archivo
  console.log("Abrir la imagen");
  fileInput.click();
}

// Escuchar el cambio en el input de archivo
fileInput.addEventListener("change", function (event) {
  console.log("Versión 1");
  // Obtener el archivo seleccionado
  const file = event.target.files[0];  
  if (file) {    
    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      alert("El archivo es demasiado grande. El tamaño máximo permitido es 2 MB.");
    } else {
      // 1) Detectamos BMP por MIME o extensión
      const isBMP = file.type === "image/bmp" || file.name.toLowerCase().endsWith(".bmp");
      if (!isBMP) {
        console.log("No es un bmp");
        // Crear una URL temporal para la imagen
        const imageUrl = URL.createObjectURL(file);
        // Mostrar la imagen en el área de previsualización
        imagePreview.innerHTML = `<img src="${imageUrl}" alt="Vista previa" style="max-width: 100%; height: auto;">`;
        // 
        const reader = new FileReader();
        reader.onload = function (event) {
          console.log("Acá poner función a redimensión");
          base64String = event.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        console.log("Tenemos un bmp");
      }
    }
  } else {
    // Limpiar el área de previsualización si no se seleccionó un archivo
    console.log("No imagen seleccionada");
    imagePreview.innerHTML = "";
  }
});

function revisaBMP(file) {
  // 2) Leemos como DataURL
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      // 3) Creamos canvas y dibujamos la BMP
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      // 4) Exportamos como JPEG (puedes ajustar calidad 0.8)
      canvas.toBlob(blob => {
        // 5) Volvemos a convertir a Base64 para enviarlo
        const reader2 = new FileReader();
        reader2.onload = ev2 => {
          base64String = ev2.target.result; // esto ya es data:image/jpeg;base64,...
          // Actualiza la previsualización
          imagePreview.innerHTML = `<img src="${base64String}" style="max-width:100%; height:auto;">`;
        };
        reader2.readAsDataURL(blob);
      }, "image/jpeg", 0.8);
    };
    img.onerror = () => {
      alert("No se pudo procesar el BMP. Usa JPG o PNG, por favor.");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function guardarDisciplina() {
  const checkboxes = document.querySelectorAll('input[name="actividad"]:checked');
  const actividadesSeleccionadas = [];
  checkboxes.forEach(checkbox => {
    actividadesSeleccionadas.push(checkbox.value);
  });
  lasDisciplinas = actividadesSeleccionadas.join(', ');  
}

function enviarPost(jsonData) {
  const _bt = $('btn-enviar');
  const _btImg = $('btn-img');
  _btImg.disabled = true;

  fetch(URL_ACTIVA0, {
    method: 'POST',
    body: jsonData,
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then(data => {
      console.log("Datos recibidos: ", data);
      // Filtrar y procesar la respuesta
      if (data.status === "success") {
        console.log("Éxito:", data.message);
        _bt.textContent = "Registro enviado";
        //alert("Éxito: " + data.message + "  ID: " + data.id); // Mostrar un mensaje al usuario        
        alert("Este es tu número de registro " + data.id + " enviado exitosamente.")
      } else {
        console.error("Error:", data.message);
        alert("Error: " + data.message); // Mostrar un mensaje de error al usuario
      }
    })
    .catch(error => {
      console.error('Error al enviar el correo:', error);
      alert("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
    });
}

// Función para verificar si todos los campos están completos
function verificarCampos() {
  guardarDisciplina();

  // Limpiamos errores previos
  document.querySelectorAll('.error').forEach(el => {
    el.classList.remove('error');
  });

  let todosCompletos = true;
  // 1) Validación de disciplinas
  if (lasDisciplinas === "") {
    // Resaltamos el fieldset
    document.querySelector('fieldset').classList.add('error');
    todosCompletos = false;
  }
  const frm = $('registroForm');  // Obtener referencias al formulario y al botón de envío
  const requeridos = frm.querySelectorAll("[required]");

  requeridos.forEach(campo => {
    // Si es el teléfono, chequeamos 10 dígitos explícitamente
    if (campo.id === 'numTelefono' || campo.id === 'telefono_emergencia') {
      console.log("Revisando teléfonos....")
      const soloDigitos = campo.value.replace(/\D/g, '');
      if (!/^\d{10}$/.test(soloDigitos)) {
        campo.classList.add('error');
        todosCompletos = false;
      }
    }
    else if (campo.id === "clubes") {
      // Cuando se llegue a clubes se debe verificar la asociación
      const cAs = GV('asociacion');
      if (cAs !== "-") {
        // Si el valor seleccionado es diferente a "No asociación"
        // entonces sí se debe verificar el campo "clubes"
        if (!campo.value.trim() || !campo.checkValidity()) {
          campo.classList.add('error');
          todosCompletos = false;
        }
      }
    }
    else if (campo.id === "subfuncion") {
      // Al igual que clubes, está ligado estrechamente con otro control
      const fn = GV('funcion');
      if (fn === 'Personal técnico' || fn === 'Consejo directivo' || fn === 'Servicio médico') {
        // Si función tiene el valor de estos campos entonces sí es necesario que
        // en subfunción tenga un valor.
        if (!campo.value.trim() || !campo.checkValidity()) {
          campo.classList.add('error');
          todosCompletos = false;
        }
      }
    }
    // Si está vacío o inválido
    else if (!campo.value.trim() || !campo.checkValidity()) {
      campo.classList.add('error');
      todosCompletos = false;
      //alert("Por favor verifica los datos ingresados.");
    }
  });
  if (!todosCompletos || base64String === "") {
    if (!todosCompletos) {
      alert("Por favor verifica los datos ingresados (marcados en rojo).");
      return false;
    }
    if (base64String === "") {
      alert("Por favor carga una imagen");
      return false;
    }
  }
  return todosCompletos;
}

function checaCampos(campo) {
  if (!campo.value.trim() || !campo.checkValidity()) {
    campo.classList.add('error');
    todosCompletos = false;
  }
}

// Para todos los inputs y selects
document.querySelectorAll('#registroForm input, #registroForm select').forEach(el => {
  el.addEventListener('input', () => {
    if (el.id === 'subfuncion') {
      laSubFuncion = el.value;
      console.log(laFuncion + " -> " + laSubFuncion);
    }
    el.classList.remove('error');
  });
});

// Para los checkboxes (disciplinas), al hacer clic quitamos el error del fieldset
document.querySelectorAll('input[type="checkbox"][name="actividad"]').forEach(cb => {
  cb.addEventListener('change', () => {
    document.querySelector('fieldset').classList.remove('error');
  });
});

function enviarFormulario() {
  if (verificarCampos()) {
    console.log("Desactivamos el botón");
    const _bt = $('btn-enviar');
    _bt.textContent = "Espera unos segundos por favor...";
    _bt.disabled = true; // Deshabilitar el botón
    var jsonData = regresaDatosform();
    enviarPost(jsonData);
  } else {
    console.log("Datos incompletos");
  }
}
