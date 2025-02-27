
const URL_ACTIVA = "https://script.google.com/macros/s/AKfycbxjdUiro5VagJHK9GUm-DIZ-PCo-0oINfzqKHCxNUwSTZE5xy0Juk7eWy_umJ2URBQX/exec";  // prueba08

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

const asociacion = [
  "Asociación de Deportes de Montaña y Escalada del Estado de Tlaxcala, A.C.",
  "Asociación de Excursionismo y Montañismo del Estado de Puebla, A.C.",
  "Asociación Michoacana de Deportes de Montaña y Escalada, A.C.",
  "Asociación de Excursionismo, Montañismo y Escalada de Jalisco, A.C.",
  "Asociación de Excursionismo y Montañismo del Instituto Politécnico Nacional",
  "Asociación de Excursionismo, Montañismo y Escalada del Estado de Nuevo León, A.C.",
  "Asociación de Montañismo de la UNAM",
  "Asociación de Escalada Deportiva del Estado de Oaxaca, A.C.",
  "Asociación Hidalguense de Excursionismo, Alpinismo y Exploración, A.C.",
  "Asociación de Excursionismo, Montañismo y Escalada del Estado de Nayarit, A.C.",
  "Asociación de Deportes de Montaña y Escalada del Distrito Federal, A.C.",
  "Asociación Potosina de Escalada Deportiva, AC",
  "Asociación de Montañismo, Escalada y Excursionismo de Baja California AC",
  "Asociación de Montaña y Escalada de Chihuahua AC",
  "Asociación de Deportes de Montaña y Escalada de Querétaro AC",
  "Asociación Aguascalentense de Deportes de Montaña y Escalada AC"
];

const funcion = [
  "Deportista", "Entrenador", "Fisiatra", "Juez/Árbitro", "Personal administrativo", "Prensa",
  "Voluntariado", "Personal técnico", "Consejo directivo", "Servicio médico"
];

const funcion_personalTec = [
  "Equipador de rutas", "Equipador de barrancos", "Registro de senderos", "Medio ambiente", "Acceso", "Seguridad", "Armador de bloques"
];
const funcion_consejo = [
  "Presidente club", "Vicepresidente club", "Secretario club", "Presidente Asociación", "Vicepresidente  Asociación",
  "Tesorero  Asociación", "Secretario  Asociación", "Vocal  Asociación", "Comisario  Asociación", "Representante Jurídico"
];

const funcion_serMed = [
  "Médico", "Psicólogo", "Nutriólogo"
];

/* Variables GLOBALES */
var laFuncion = "";
var laSubFuncion = "";
var base64String = "";
/* Fin de variables GLOBALES*/

// Al cargar la página, generamos las opciones de los selects
window.addEventListener('DOMContentLoaded', () => {
  generarOpcionesSelect("genero", elGenero);
  generarOpcionesSelect("escolaridad", laEscolaridad);
  generarOpcionesSelect("estado", estados);
  generarOpcionesSelect("disciplina", disciplinas);
  generarOpcionesSelect("tipoSangre", tipoSangre);
  generarOpcionesSelect("funcion", funcion);

  cargaDataTemporal();
  laFuncion = GV('funcion');  
});

// Función para generar las opciones de un select a partir de un array
function generarOpcionesSelect(selectId, opciones) {
  const selectElement = document.getElementById(selectId);

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

/* Función TEMPORAL para cargar datos al formulario */
function cargaDataTemporal() {
  const dT = {
    nombre: "Marto",
    paterno: "Jacinto",
    materno: "Saldivar",
    fechaNacimiento: "02/23/1925",
    telefono: "555-1234",
    email: "juan.perez@example.com",
    curp: "ADJSS15584",
    genero: "Masculino",  // ¡Atención!
    escolaridad: "Secundaria",
    estado: "Puebla",
    municipio: "Texmelucan",
    colonia: "La Brava",
    calleNumero: "sangría #95",
    zip: "350158",
    contactoEmergencia: "Juanita Maldonado",
    telefonoEmergencia: "587-36984",
    enfermedades: "psicosis",
    alergias: "al populismo",
    tipoSangre: "O+",
    asociacion: "La de montaña",
    club: "Tlahui",
    id_afiliacion: "29+36",
    disciplina: "Alta Montaña",
    funcion: "Deportista",
  };
  $('nombre').value = dT.nombre;
  $('apellidoPaterno').value = dT.paterno;
  $('apellidoMaterno').value = dT.materno;
  $('fechaNacimiento').value = dT.fechaNacimiento;
  $('numTelefono').value = dT.telefono;
  $('email').value = dT.email;
  $('curp').value = dT.curp;
  $('genero').value = dT.genero;
  $('escolaridad').value = dT.escolaridad;
  $('estado').value = dT.estado;
  $('municipio').value = dT.municipio;
  $('colonia').value = dT.colonia;
  $('calle_numero').value = dT.calleNumero;
  $('codigo_postal').value = dT.zip;
  $('contanto_emergencia').value = dT.contactoEmergencia;
  $('telefono_emergencia').value = dT.telefonoEmergencia;
  $('enfermedades').value = dT.enfermedades;
  $('alergias').value = dT.alergias;
  $('tipoSangre').value = dT.tipoSangre;
  $('asociacion').value = dT.asociacion;
  $('club').value = dT.club;
  $('id_afiliacion').value = dT.id_afiliacion;
  $('disciplina').value = dT.disciplina;
  $('funcion').value = dT.funcion;
}

function limpiaCampos(){
  $('nombre').value = "";
  $('apellidoPaterno').value = "";
  $('apellidoMaterno').value = "";
  $('fechaNacimiento').value = "";
  $('numTelefono').value = "";
  $('email').value = "";
  $('curp').value = "";
  $('genero').value = "";
  $('escolaridad').value = dT.escolaridad;
  $('estado').value = dT.estado;
  $('municipio').value = dT.municipio;
  $('colonia').value = dT.colonia;
  $('calle_numero').value = dT.calleNumero;
  $('codigo_postal').value = dT.zip;
  $('contanto_emergencia').value = dT.contactoEmergencia;
  $('telefono_emergencia').value = dT.telefonoEmergencia;
  $('enfermedades').value = dT.enfermedades;
  $('alergias').value = dT.alergias;
  $('tipoSangre').value = dT.tipoSangre;
  $('asociacion').value = dT.asociacion;
  $('club').value = dT.club;
  $('id_afiliacion').value = dT.id_afiliacion;
  $('disciplina').value = dT.disciplina;
  $('funcion').value = dT.funcion;
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

  const formData = {
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
    enfermedades: GV('enfermedades'),
    alergias: GV('alergias'),
    tipoSangre: GV('tipoSangre'),
    asociacion: GV('asociacion'),
    club: GV('club'),
    disciplina: GV('disciplina'),
    id_afiliacion: GV('id_afiliacion'),
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
        console.log(base64String);
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

function enviarPost(jsonData) {
  const _bt = $('btn-enviar');
  const _btImg = $('btn-img');
  _bt.disabled = true; // Deshabilitar el botón
  _btImg.disabled = true;

  console.log('Datos en formato JSON:', jsonData);
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
        alert("Registro de " + data.id + " enviado exitosamente.")
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
  const frm = $('registroForm');  // Obtener referencias al formulario y al botón de envío
  const cR = frm.querySelectorAll("[required]");
  let todosCompletos = true;
  cR.forEach(campo => {
    if (!campo.value.trim() || !campo.checkValidity()) {
      todosCompletos = false;
      alert("Por favor verifica los datos ingresados.");
    }
  });
  return todosCompletos;
}

function enviarFormulario() {
  if (verificarCampos()) {
    console.log("A enviar el formulario");
    var jsonData = regresaDatosform();
    enviarPost(jsonData);
  } else {
    console.log("Datos incompletos");
  }
}
