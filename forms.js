
// Definir la URL activa (puedes cambiar entre CONFIG.LOCAL y CONFIG.ESP32 según la prueba que realices)
//const URL_ACTIVA = "https://script.google.com/macros/s/AKfycbyK8raY8-XZQUfzVjOSS7NeHU0vx31C_0Ro0xg_gu00YjQPo28zvmUmtspbsv73hRA/exec";
//const URL_ACTIVA = "https://script.google.com/macros/s/AKfycbwexrnVhu2I_rmXnsRDhYJ3cVkzFHrpiXHY5ccuzu23-9lw70oqyTCz1_e03N6CaphX/exec";
const URL_ACTIVA = "https://script.google.com/macros/s/AKfycbzlqjVaLA4MMMJ9aafpGkNgkvDpSx-PqdRQ0geX4KxTI951vlTXmX01-OO3oBhDvBTT/exec";
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

function DS(id){

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

const elGenero =["Masculino", "Femenino"];

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

function cargaDataTemporal(){
  const dT = {    
    nombre: "Ezequiel",
    paterno: "Jacinto",
    materno: "Saldivar",
    fechaNacimiento: "20 / 02 / 1925", 
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

// Al cargar la página, generamos las opciones de los selects
window.addEventListener('DOMContentLoaded', () => {
  generarOpcionesSelect("genero", elGenero);
  generarOpcionesSelect("escolaridad", laEscolaridad);
  generarOpcionesSelect("estado", estados);
  generarOpcionesSelect("disciplina", disciplinas);
  generarOpcionesSelect("tipoSangre", tipoSangre);
  generarOpcionesSelect("funcion", funcion);

  cargaDataTemporal();
});


document.getElementById('registroForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío tradicional
  
  // 1. Validar reCAPTCHA (opcional, normalmente se verifica en el servidor).
  //    Aquí solo mostramos cómo obtener el token, la validación real se hace en backend:
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    alert('Por favor, completa el reCAPTCHA antes de enviar.');
    return;
  }

  // 2. Obtener los valores del formulario
  const formData = {
    estado: document.getElementById('estado').value,
    disciplina: document.getElementById('disciplina').value,
    genero: document.getElementById('genero').value,
    escolaridad: document.getElementById('escolaridad').value,
    tipoSangre: document.getElementById('tipoSangre').value,
    asociadoId: document.getElementById('asociadoId').value,
    nombre: document.getElementById('nombre').value,
    apellidoPaterno: document.getElementById('apellidoPaterno').value,
    apellidoMaterno: document.getElementById('apellidoMaterno').value,
    fechaNacimiento: document.getElementById('fechaNacimiento').value,
    // Nota: El archivo se maneja distinto si vas a enviarlo a un servidor
  };

  // 3. Convertir a JSON
  const jsonData = JSON.stringify(formData);
  console.log('Datos en formato JSON:', jsonData);

  // 4. Manejar la subida de archivo (si se requiere)
  // Para enviar el archivo y los datos juntos a un servidor,
  // lo normal es usar un objeto FormData en lugar de JSON puro:
  /*
  const fileInput = document.getElementById('archivo');
  const file = fileInput.files[0];
  const formDataToSend = new FormData();
  formDataToSend.append('datos', jsonData); // El JSON de los campos
  formDataToSend.append('archivo', file);   // El archivo

  fetch('TU_ENDPOINT_O_URL_DESTINO', {
    method: 'POST',
    body: formDataToSend
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Aquí podrías mostrar un mensaje de éxito al usuario
  })
  .catch(error => {
    console.error('Error:', error);
    // Manejo de errores
  });
  */

  // 5. Si aún no has definido el servidor:
  //    - Podrías guardar los datos localmente o imprimirlos en consola para pruebas
  alert('Datos capturados en la consola como JSON. Falta implementar el envío final.');
});

let datosAsociado= {
  "idAsociado": '',
    "nombre": '',
    "apellidoPaterno": '',
    "apellidoMaterno": '',
    "fechaNacimiento": '',
    "telefono": '',
    "email": '',
    "curp": '',
    "genero": '',
    "escolaridad": '',
    "estado": '',
    "municipio": '',
    "colonia": '',
    "calleNumero": '',
    "zip": '',
    "contactoEmergencia": '',
    "telefonoEmergencia": '',
    "enfermedades": '',
    "alergias": '',
    "tipoSangre": '',    
    "asociacion": '',
    "club": '',
    "disciplina": '',
    "id_afiliacion": '',
    "funcion": ''    
  };

function regresaDatosform(){
  const formData = {
    idAsociado: "",
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
    funcion: GV('funcion'),
    imagenBase64: base64String
    // Nota: El archivo se maneja distinto si vas a enviarlo a un servidor
  };  
  // Convertir a JSON
  const jsonData = JSON.stringify(formData);    
  return jsonData;
}

function enviarFormulario(){
 // alert("Enviando")
  var jsonData = regresaDatosform();
  enviarPost(jsonData);
}

var base64String = "nope";

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

  reader.onload = function(event) {
      base64String = event.target.result;
      output.value = base64String;
      preview.src = base64String; // Mostrar la imagen cargada
  };

  reader.readAsDataURL(file);
}


function enviarPost(jsonData){
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
  .then(response => response.text())
  .then(data => {
    console.log("Datos recibidos");
    console.log(data);
  })
  .catch(error => {
    console.error('Error al enviar el correo:', error);
  });
}