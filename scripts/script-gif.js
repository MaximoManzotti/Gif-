const BOTON_COMENZAR = document.getElementById('boton-comenzar');
const CAJA_FONDO_GRIS = document.getElementById('caja-fondo-gris');
const ELIMINAR_CAJA = document.getElementById('eliminar-caja');
const PRIMER_CAMARA = document.getElementById('primer-camara')
const BOTON_CAPTURAR = document.getElementById('boton-capturar');
const CAJA_BOTON_CAPTURAR = document.getElementById('caja-del-boton-capturar');
const CAJA_BOTON_GRABAR = document.getElementById('caja-del-boton-grabar');
const BOTON_GRABAR = document.getElementById('boton-grabar');
const CAJA_SUBIR_GIF = document.getElementById('caja-subir-gif')
const CONTADOR = document.getElementById('contador')
const CONTENEDOR_MIS_GIFOS = document.getElementById('contenedor-mis-gifos')
const CONTENEDOR_SUBIENDO = document.getElementById('id-caja-subiendo')
const CAJAFINAL = document.getElementById('cajavideoybotonesfinal')
const BOTON_FINAL = document.getElementById("botonesfinal")
const BOTON_LISTO = document.getElementById("ready")
const DOWNLOAD = document.getElementById("descargar")
const COPY = document.getElementById("copiar_enlace")
const TXT_COPY = document.getElementById("link")


if (localStorage.getItem("tema") === "Tema-Oscuro") {

  document.documentElement.style.setProperty("--logo-azul", "url(../imagenes/gifOF_logo_dark.png)")
  document.documentElement.style.setProperty("--rosa-claro", "#EE3EFE")
  document.documentElement.style.setProperty("--azul-claro", "#2E32FB")
  document.documentElement.style.setProperty("--rosa-active", "#997D97")
  document.documentElement.style.setProperty("--texto-claro", "#FFFFFF")
  document.documentElement.style.setProperty("--fondo-claro", "#110038")
  document.documentElement.style.setProperty("--gris-claro", "#8F8F8F")
  document.documentElement.style.setProperty("--fuente-clara", "white")
  document.documentElement.style.setProperty("--boton-sugerido", "#8F8F8F")
  document.documentElement.style.setProperty("background", "var(--fondo-claro)")
  document.documentElement.style.setProperty("--boton-night", "blue")
}

let recorder = navigator.mediaDevices.getUserMedia(
  {
    audio: false,
    video: true
  }
).then(function (mediaStream) {
   recorder = RecordRTC(mediaStream, {
    type: 'gif',
    quality: 10,
    width: 360,
    hidden: 240,
    frameRate: 3,
  });
  
BOTON_COMENZAR.addEventListener('click', function () {
  ELIMINAR_CAJA.style.setProperty("display", "none")
  PRIMER_CAMARA.style.setProperty("display", "flex")
  PRIMER_CAMARA.style.setProperty("flex-direction", "column")
  BOTON_FINAL.style.setProperty("display", "none")
  BOTON_LISTO.style.setProperty("display", "none")



  navigator.mediaDevices.getUserMedia(
    {
      audio: false,
      video: true,


    }
  ).then(function (mediaStream) {

    let video = document.getElementById("video")
    video.srcObject = mediaStream
    video.play();
  })
})



BOTON_CAPTURAR.addEventListener('click', function () {
  CAJA_BOTON_CAPTURAR.style.setProperty("display", "none")
  CAJA_BOTON_GRABAR.style.setProperty("display", "flex")
  CAJA_SUBIR_GIF.style.setProperty("display", "none")
  let n = 0;
  let m = 00;
  let l = document.getElementById("contador");
  window.setInterval(function () {
    if (n === 60) {
      n = 0
      m++;
    } else n++;
    l.innerHTML = `${m}:${n}`;


  }, 1000);
})

const videoPreview = document.getElementById("preview")
BOTON_GRABAR.onclick = function () {
  recorder.stopRecording();
  video.innerHTML = `<style>.video-preview{display:flex} .pantalla-video{display: none;}</style>`;
  

  recorder.getDataURL(url => {
    videoPreview.src = url;
  })

  blob = recorder.getBlob();
  console.log(blob)

  recorder.getDataURL((url) => {
    try {
      console.log(url)
      console.log(document.getElementById("preview"))
      document.getElementById("preview").src = url;
    }
    catch{
      console.log("error");

    }
  })
  CAJA_SUBIR_GIF.style.setProperty("display", "flex");
  BOTON_GRABAR.style.setProperty("display", "none")
  CONTADOR.style.setProperty("display", "none")
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
    frameRate: 3,
  });
  
  BOTON_CAPTURAR.onclick = startRecording;
  video.srcObject = mediaStream
  video.play();

}).catch(function (err) {

  console.log(err)
  alert("error")
});

var buttonSubir = document.getElementById("subir")


buttonSubir.onclick = subirVideo;


async function subirVideo() {
  CAJA_SUBIR_GIF.style.setProperty("display", "none")
  CONTENEDOR_SUBIENDO.style.setProperty("display", "grid")
  videoPreview.style.setProperty("display", "none")
  var form = new FormData();
  form.append("file", blob, "file.gif")
  let post = await fetch("https://upload.giphy.com/v1/gifs?&api_key=igY9hZqLYu5goaPfGeVuhM8DmxXLxu3v", {
    method: "POST",
    body: form
   
  })
  
  let id_post = await post.json()
  let id = id_post.data.id;
  localStorage.setItem('datos',id)
  let ids = []
  let idsLS = localStorage.getItem("my_gifs")
  if (idsLS != null) {
    ids = JSON.parse(idsLS)
  }
  ids.push(id);

  localStorage.setItem("my_gifs", JSON.stringify(ids))
  let status = await (id_post.meta.status)
  console.log(status)
  try {
    if (status === 200) {
      videoPreview.style.setProperty("display", "flex")
      videoPreview.style.setProperty("width", "50%")
      CONTENEDOR_SUBIENDO.style.setProperty("display", "none")
      CAJAFINAL.style.setProperty("display", "flex")
      BOTON_FINAL.style.setProperty("display", "flex")
      BOTON_FINAL.style.setProperty("flex-direction", "column")
      BOTON_FINAL.style.setProperty("margin-left", "13.5%")
      BOTON_FINAL.style.setProperty("margin-right", "13.5%")
      BOTON_LISTO.style.setProperty("display", "grid")
    }
  } catch{
    alert("Ocurrio un error al subir el gif.")
  }
}

async function mis_gifos() {
  if (localStorage.getItem("my_gifs")) {
    let idsLS = localStorage.getItem("my_gifs")
    var id = JSON.parse(idsLS)
    let idsstring = ""
    id.forEach(item => idsstring += item + ",")
    var mis_gifs = await fetch(`https://api.giphy.com/v1/gifs?api_key=KSRFihSLXt224ZjBa5gK4SUm9msngCqt&ids=$${id}`)


    try {
      
      var gif_por_id = await mis_gifs.json()
      const element = gif_por_id.data;
      for (let i = 0; i < element.length; i++) {
        const element = gif_por_id.data[i];
        CONTENEDOR_MIS_GIFOS.innerHTML += `<img src="${element.images.original.url}" class="mis-gif-subidos"> `
        console.log(gif_por_id.data[i])
      }

    } catch (error) {
      console.log("hay un error")
    }

  } else {
    alert("Bienvenido a gifos!")
  }
} mis_gifos()



DOWNLOAD.addEventListener('click', () =>{
  let blob = recorder.getBlob()

    invokeSaveAsDialog(blob, 'gif');
})})

COPY.addEventListener('click', ()=>{copiar(localStorage.getItem(`datos`))})


function copiar(id) {
  const COPIARELEMENTO = document.createElement('textarea')
  COPIARELEMENTO.value  = `https://giphy.com/gifs/${id}`
  COPIARELEMENTO.setAttribute('readonly', '')
  COPIARELEMENTO.style = 'background', 'transparent'
  document.body.appendChild(COPIARELEMENTO)
  COPIARELEMENTO.select()
  document.execCommand('copy')
  document.body.removeChild(COPIARELEMENTO)
}

