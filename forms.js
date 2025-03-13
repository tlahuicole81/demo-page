const URL_ACTIVA = "https://script.google.com/macros/s/AKfycbxUikU8nYgjUAFrmntQKEATjZDMprmlvQqs2BK7nYJdOYaCVntSVKnKDIOYA1V3WbNp/exec";
function $(id) {
  return document.getElementById(id);
}

// Get value
function GV(id) {
  const x = document.getElementById(id);
  return x.value;
}

// Limpia la entrada
function CLi(id) {
  const x = $(id);
  x.value = '';
}

// Regresamos el value de los elementos
function VL(id) {
  const x = $(id).value;
  return x;
}

// Arrays con las opciones disponibles:
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
var laFuncion = "";
var laSubFuncion = "";
var base64String = "";
var lasDisciplinas = "";
var asociacionSelec = "";
var clubSelec = "";
/* Fin de variables GLOBALES*/

// Al cargar la página, generamos las opciones de los selects
window.addEventListener('DOMContentLoaded', () => {
  fetchData("?tipo=clubes");
  generarOpcionesSelect("genero", elGenero);
  generarOpcionesSelect("escolaridad", laEscolaridad);
  generarOpcionesSelect("estado", estados);
  generarCheckboxes();
  generarOpcionesSelect("tipoSangre", tipoSangre);
  generarOpcionesSelect("funcion", funcion);
  //
  //cargaDataTemporal();
  laFuncion = GV('funcion');
});


// Función para enviar una solicitud GET
async function fetchData(tipo) {
  //const url = URL_ACTIVA;
  try {
    const respuesta = await fetch(URL_ACTIVA);
    if (!respuesta.ok) {
      throw new Error(`Error en la solicitud: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    console.log("Datos recibidos:", datos);        
    llenarSelectAsociaciones(datos);
    //const _x = $('clubes');
    //llenarSelectClubes(datos, _x);
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

function llenarSelectAsociaciones(clubes) {
  let selectAsociaciones = $("asociacion");  
  let cont = true;
  let _estado1 ="";
  for (let estado in clubes) {
    let option = document.createElement("option");
    if(cont === true){
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

// Función para llenar el select de clubes
function llenarSelectClubes(clubes, estado) {
  asociacionSelec = clubes[estado].asociacion; // guardamos la Asociación
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
  if(cambios === true){
    // Acá escuchamos cuando el usuario seleccione un club
    selectClubes.addEventListener("change", function () {      
      clubSelec = this.value;
      console.log("Club seleccionado: ", clubSelec);
    });
  }
}


// Función para generar las opciones de un select a partir de un array
function generarOpcionesSelect(selectId, opciones) {
  const selectElement = $(selectId);

  // Añadir una opción inicial vacía
  const opcionVacia = document.createElement("option");
  opcionVacia.value = "";
  opcionVacia.textContent = "Selecciona una opción";
  selectElement.appendChild(opcionVacia);

  // Generar las opciones
  opciones.forEach(opcion => {
    const optionElement = document.createElement("option");
    optionElement.value = opcion;
    optionElement.textContent = opcion;
    selectElement.appendChild(optionElement);
  });
}

// Función para generar los checkboxes para las Disciplinas
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
    container.appendChild(document.createElement('br'));
  });
}


/* Función TEMPORAL para cargar datos al formulario */
function cargaDataTemporal() {
  $('nombre').value = "Bartolo";
  $('apellidoPaterno').value = "Rodriguez";
  $('apellidoMaterno').value = "González";
  $('email').value = "correo.ejemplo@hotmail.com";
  $('curp').value = "YJUY15874AQ";
  $('genero').value = "Femenino";
  $('escolaridad').value = "Media superior";
  $('estado').value = "Tlaxcala";
  $('municipio').value = "Chiautempan";
  $('colonia').value = "Centro";
  $('calle_numero').value = "Peligro #7";
  $('codigo_postal').value = "63587";
  $('contanto_emergencia').value = "Florentino Saldivar";
  $('telefono_emergencia').value = "2461235698";
  $('enfermedades').value = "Psico";
  $('alergias').value = "Ninguna";
  $('tipoSangre').value = "O-";
  $('funcion').value = "Deportista";
  $('subfuncion').value = ""
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
  const sub = $('subfuncion');

  switch (funcionSeleccionada) {
    case 'Personal técnico':
      sub.innerHTML = "";
      generarOpcionesSelect("subfuncion", funcion_personalTec);
      sub.disabled = false;
      break;
    case 'Consejo directivo':
      sub.innerHTML = "";
      generarOpcionesSelect("subfuncion", funcion_consejo);
      sub.disabled = false;
      break;
    case 'Servicio médico':
      sub.innerHTML = "";
      generarOpcionesSelect("subfuncion", funcion_serMed);
      sub.disabled = false;
      break;
    default:
      sub.innerHTML = "";
      sub.disabled = true;
      laSubFuncion = ""; // Limpiamos        
  }
  laFuncion = funcionSeleccionada;
});

document.getElementById('subfuncion').addEventListener('change', function () {
  laSubFuncion = GV('subfuncion');
  console.log(laFuncion + " -> " + laSubFuncion);
});


function regresaDatosform() {
  const idAso = formatoParcialCredencial();
  let _enfermedades = GV('enfermedades');
  if(_enfermedades === ""){
    _enfermedades = "No enfermedades";
  }
  let _alergias = GV('alergias');
  if(_alergias === ""){    
    _alergias = "No alergias";    
  }
  console.log("Enfermedades: ", _enfermedades);
  console.log("Alergias: ", _alergias);

  const formData = {
    destino: "formulario",
    idAsociado: idAso,
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
  // Obtener el archivo seleccionado
  const file = event.target.files[0];
  console.log("Revisando el input de la imagen");
  // Verificar si se seleccionó un archivo
  if (file) {
    console.log("Sí hay imagen");
    //const output = $('output');
    //output.value = "";
    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      alert("El archivo es demasiado grande. El tamaño máximo permitido es 2 MB.");
    } else {
      // Crear una URL temporal para la imagen
      const imageUrl = URL.createObjectURL(file);
      // Mostrar la imagen en el área de previsualización
      imagePreview.innerHTML = `<img src="${imageUrl}" alt="Vista previa" style="max-width: 100%; height: auto;">`;
      // 
      const reader = new FileReader();
      reader.onload = function (event) {
        console.log("Cargado basa64");
        base64String = event.target.result;
        //output.value = base64String;
        //console.log(base64String);  // <----
        //preview.src = base64String; // Mostrar la imagen cargada
      };
      reader.readAsDataURL(file);
    }
  } else {
    // Limpiar el área de previsualización si no se seleccionó un archivo
    console.log("No imagen seleccionada");
    imagePreview.innerHTML = "";
  }
});


function convertToBase64() {
  const fileInput = document.getElementById('fileInput');
  const output = document.getElementById('output');
  const preview = document.getElementById('preview');

  if (fileInput.files.length === 0) {
    alert("Por favor, selecciona una imagen.");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    base64String = event.target.result;
    output.value = base64String;
    preview.src = base64String; // Mostrar la imagen cargada
  };
  reader.readAsDataURL(file);
}


/* Formato para el número de credencial:
  Letra A (de afiliado)
  Número de entidad federativa
  Guión
  4 letras RFC o CURP
  Número consecutivo de registro estatal a 3 dígitos*
  *Este valor se asignará cuando ya se haya enviado la información
*/
function formatoParcialCredencial() {
  const ent = $('estado');
  const curp = GV('curp');
  const _curp = curp.substring(0, 4);
  const numEstado = String(ent.selectedIndex).padStart(2, "0");
  var frm = "A" + numEstado + "-" + _curp;
  return frm;
}

// Función para guardar la selección de las Disciplinas
function guardarDisciplina() {
  const checkboxes = document.querySelectorAll('input[name="actividad"]:checked');
  const actividadesSeleccionadas = [];
  checkboxes.forEach(checkbox => {
    actividadesSeleccionadas.push(checkbox.value);
  });
  lasDisciplinas = actividadesSeleccionadas.join(', ');
  //console.log("Disciplinas seleccionadaS: " + resultado);  
}


function enviarPost(jsonData) {
  const _bt = $('btn-enviar');
  const _btImg = $('btn-img');  
  _btImg.disabled = true;
  
  //contentTypeHeader = 'application/json; charset=utf-8';  // parece que este no
  //contentTypeHeader = 'text/plain;charset=utf-8'; // este parece que sí
  //contentTypeHeader = 'application/json'; este no

  // Configurar el objeto de headers usando el tipo de contenido

  fetch(URL_ACTIVA, {
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

// Obtener todos los campos requeridos
//const camposRequeridos = formulario.querySelectorAll("[required]");

// Función para verificar si todos los campos están completos
function verificarCampos() {
  guardarDisciplina();
  if (lasDisciplinas === "") {
    alert("Selecciona al menos una disciplina");
    return false;
  } else {
    let todosCompletos = true;
    const frm = $('registroForm');  // Obtener referencias al formulario y al botón de envío
    const cR = frm.querySelectorAll("[required]");

    cR.forEach(campo => {
      if (!campo.value.trim() || !campo.checkValidity()) {
        todosCompletos = false;
        alert("Por favor verifica los datos ingresados.");
      }
    });
    return todosCompletos;
  }
}

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
