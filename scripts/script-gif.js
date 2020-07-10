const $BOTON_COMENZAR = document.getElementById('boton-comenzar');
const $CAJA_FONDO_GRIS = document.getElementById('caja-fondo-gris');
const $ELIMINAR_CAJA = document.getElementById('eliminar-caja');
const $PRIMER_CAMARA =document.getElementById('primer-camara')
const $BOTON_CAPTURAR = document.getElementById('boton-capturar');
const $CAJA_BOTON_CAPTURAR = document.getElementById('caja-del-boton-capturar');
const $CAJA_BOTON_GRABAR = document.getElementById('caja-del-boton-grabar');
const $BOTON_GRABAR = document.getElementById('boton-grabar');
const $CAJA_SUBIR_GIF = document.getElementById('caja-subir-gif')
const $CONTADOR = document.getElementById('contador')
const CONTENEDOR_MIS_GIFOS = document.getElementById('contenedor-mis-gifos')
if (localStorage.getItem("tema")=== "Tema-Oscuro"){
  
  document.documentElement.style.setProperty("--logo-azul", "url(../imagenes/gifOF_logo_dark.png)")
    document.documentElement.style.setProperty("--rosa-claro", "#EE3EFE")
    document.documentElement.style.setProperty("--azul-claro", "#2E32FB")
    document.documentElement.style.setProperty("--rosa-active", "#997D97")
    document.documentElement.style.setProperty("--texto-claro", "#FFFFFF")
    document.documentElement.style.setProperty("--fondo-claro", "#110038")
    document.documentElement.style.setProperty("--gris-claro", "#8F8F8F")
    document.documentElement.style.setProperty("--fuente-clara", "white")
    document.documentElement.style.setProperty("background", "var(--fondo-claro)")
    
}

$BOTON_COMENZAR.addEventListener('click', function () {
   $ELIMINAR_CAJA.style.setProperty("display", "none") 
  $PRIMER_CAMARA.style.setProperty("display", "flex")
  $PRIMER_CAMARA.style.setProperty("flex-direction", "column")
 

  navigator.mediaDevices.getUserMedia(
    {
      audio: false,
      video:true,
      
  
    }
  ).then (function (mediaStream) {
    
    let video =  document.getElementById("video")
    video.srcObject =  mediaStream
    video.play();
  })
})
$BOTON_CAPTURAR.addEventListener('click', function () {
  $CAJA_BOTON_CAPTURAR.style.setProperty("display", "none")
  $CAJA_BOTON_GRABAR.style.setProperty("display", "flex")
  $CAJA_SUBIR_GIF.style.setProperty("display", "none")
  let n = 0;
  let m = 00;
let l = document.getElementById("contador");
window.setInterval(function(){
  if (n === 60){
    n=0
    m++;
  }else n++;
  l.innerHTML = `${m}:${n}`;
 

},1000);
})

var videoPreview = document.getElementById("preview")
$BOTON_GRABAR.onclick = function(){
  recorder.stopRecording();
  video.innerHTML=`<style>.video-preview{display:flex} .pantalla-video{display: none;}</style>`;
 

  recorder.getDataURL(url => {
    videoPreview.src = url;
  })

blob = recorder.getBlob();
console.log(blob)
  recorder.getDataURL((url) => {
  try {console.log(url)
  console.log(document.getElementById("preview"))
      document.getElementById("preview").src = url;}
      catch{
        console.log(error);
        
      }
  })
  $CAJA_SUBIR_GIF.style.setProperty("display", "flex");
  $BOTON_GRABAR.style.setProperty("display", "none")
  $CONTADOR.style.setProperty("display", "none")
  }

function startRecording() {
  recorder.startRecording();
}


navigator.mediaDevices.getUserMedia(
  {
      audio: false,
      video: true
  }
).then(function (mediaStream) {
  let video = document.getElementById("video")

  recorder = RecordRTC(mediaStream, {
      type: 'gif',
      quality: 10,
      width: 360,
      hidden: 240,
      frameRate: 1,
  });



  $BOTON_CAPTURAR.onclick = startRecording;
  video.srcObject = mediaStream
  video.play();
}).catch(function (err) {

  console.log(err)
  alert("error")
});
var buttonSubir = document.getElementById("subir")

buttonSubir.onclick = subirVideo;
async function subirVideo() {
  var form = new FormData();
  form.append("file", blob, "file.gif")
  let post =  await fetch("https://upload.giphy.com/v1/gifs?&api_key=igY9hZqLYu5goaPfGeVuhM8DmxXLxu3v", {
   
      method: "POST",
      body: form
  })
  let id_post =  await post.json()
  localStorage.setItem("mis-gifs", id_post.data.id)
}

async function mis_gifos() {
  let mis_gifs = await fetch(`https://api.giphy.com/v1/gifs/${gifs_pagina}?api_key=KSRFihSLXt224ZjBa5gK4SUm9msngCqt`)
  try{
    let gif_por_id = await mis_gifs.json()
  for (let i = 0; i < localStorage.getItem("mis-gifs").length; i++) {
    var gifs_pagina = localStorage.getItem("mis-gifs")[i];
    CONTENEDOR_MIS_GIFOS.innerHTML= `<div class="elemento">
    <div> 
    <img src="${gif_por_id.images.original.url}" class="gifos">
    </div>
  </div>`
  }
  }catch{
    console.error("Error al conseguir mis guifos")
  }
}
mis_gifos()