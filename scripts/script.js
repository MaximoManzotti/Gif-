
const contendorGifs = document.getElementById("tendencias")
const contendorRANDOM = document.getElementById("contendor_gifs")
const notFoundContainer = document.querySelector(".not_found_message");
const botonDeBusqueda = document.getElementById("boton_busqueda")
const inputBusqueda = document.getElementById("contenido_de_busqueda")
const menu_desplegable = document.getElementById("id_menu_desplegable")
const boton = document.getElementById("button-menu")
const $LOGO_AZUL = document.getElementById("logo_azul")
const TEXTO_BUSQUEDA = document.querySelector(".txt-random")
const GIF_TENDENCIA = document.querySelector(".elemento")
const GIF_TENDENCIA_2 = document.getElementById("creacion-previa")
const BUSQUEDASUGERIDA = document.getElementById("cajadesplegable")
const CONTENEDOR_MIS_GIFOS = document.getElementById('contenedor-mis-gifos')
const MIS_GIFS = document.getElementById('mis-gifos')
const DISPLAY_PAGINA = document.getElementById('cambiardisplay')
const CAJAGIFS = document.getElementById('mis-gifs')
const IMAGEN = document.getElementById('boton-imagen')
const PALABRASBUSCADAS = document.getElementById('palabras_buscadas')
const CAJA_SUMMIT = document.getElementById('caja-summit')
const LETRAS_BUSCAR = document.getElementById("txt_buscar")
const LUPA_GRIS = document.getElementById("lupadefondo")

boton.addEventListener('click', function () {
  if (menu_desplegable.classList.contains('menu_desplegable_none')) {
    menu_desplegable.classList.remove('menu_desplegable_none');
    menu_desplegable.classList.add('menu_desplegable');
  } else {
    menu_desplegable.classList.add('menu_desplegable_none');
    menu_desplegable.classList.remove('menu_desplegable')
  }
});
function callback_tema() {
  document.documentElement.style.setProperty("--rosa-claro", "#EE3EFE");
  document.documentElement.style.setProperty("--azul-claro", "#2E32FB");
  document.documentElement.style.setProperty("--rosa-active", "#997D97");
  document.documentElement.style.setProperty("--texto-claro", "#FFFFFF");
  document.documentElement.style.setProperty("--fondo-claro", "#110038");
  document.documentElement.style.setProperty("--gris-claro", "#8F8F8F");
  document.documentElement.style.setProperty("--fuente-clara", "white")
  document.documentElement.style.setProperty("background", "var(--fondo-claro)");
  document.documentElement.style.setProperty("--boton-night", "blue")
  document.documentElement.style.setProperty("--boton-day", "#CCCCCC")
  document.documentElement.style.setProperty("--logo-azul", "url(../imagenes/gifOF_logo_dark.png)");
  document.documentElement.style.setProperty("--lupa-negra", "url(../imagenes/lupa_light.svg)");
}


if (localStorage.getItem("tema") === "Tema-Oscuro") {
  callback_tema()
}

let tema_claro = document.getElementById("id_tema_dia")
let estilo_claro = document.getElementById("estilo_claro")
tema_claro.addEventListener('click', function () {
  document.documentElement.style.setProperty("--fuente-clara", "#110038")
  document.documentElement.style.setProperty("--azul-claro", "#4180f6")
  document.documentElement.style.setProperty("--rosa-claro", "#F7C9F3")
  document.documentElement.style.setProperty("--rosa-active", "#997D97")
  document.documentElement.style.setProperty("--texto-claro", "#FFFFFF")
  document.documentElement.style.setProperty("--fondo-claro", "#fff3fe")
  document.documentElement.style.setProperty("--gris-claro", "#E6E6E68F")
  document.documentElement.style.setProperty("background", "var(--fondo-claro)")
  document.documentElement.style.setProperty("--logo-azul", "url(../imagenes/gifOF_logo.png)")
  document.documentElement.style.setProperty("--boton-day", "var(--rosa-claro)")
  document.documentElement.style.setProperty("--boton-night", "#F0F0F0")
  document.documentElement.style.setProperty("--lupa-negra", "url(../imagenes/lupa.svg)")

  localStorage.setItem("tema", "Tema-Claro")

})
let tema_oscuro = document.getElementById("id_tema_noche")

tema_oscuro.addEventListener('click', function () {
  callback_tema()
  localStorage.setItem("tema", "Tema-Oscuro")

})



function crearGif(element, tipo) {

  switch (tipo) {
    case 'tendencias':

      let nuevoContenedor = document.createElement('div');
      let titulo = JSON.stringify(element.title)
      // let remplazo = titulo.substring(1, 20)
      let sin_espacio = titulo.replace(/ /g, '#')
      let textoAreaDividido = sin_espacio.split("#");


      if (textoAreaDividido[2] == undefined) {
        var texto_final = `${textoAreaDividido[1]}`
      } else if (textoAreaDividido[3] == undefined) {
        var texto_final = `${textoAreaDividido[1]}#${textoAreaDividido[2]}`
      } else if (textoAreaDividido[4] == undefined) {
        var texto_final = `${textoAreaDividido[1]}#${textoAreaDividido[2]}#${textoAreaDividido[3]}`
      } else {
        var texto_final = `${textoAreaDividido[1]}#${textoAreaDividido[2]}#${textoAreaDividido[3]}#${textoAreaDividido[4]}`
      }

      if (element.images.original.width > element.images.original.height) {
        nuevoContenedor.innerHTML = `<div class="elemento-2">
    <div> 
       <img src="${element.images.original.url}" class="gifos-2">
       <div>
       
       <p class="titulo-de-gif-2">#${texto_final.replace('"', '')}</p>
       </div>
    </div>
</div>`
      } else nuevoContenedor.innerHTML = `<div class="elemento">
  <div class="grilla"> 
  <img src="${element.images.original.url}" class="gifos">
     <div>
        <p class="titulo-de-gif">#${texto_final.replace('"', '')}</p>
     </div>
  </div>
</div>`
      return nuevoContenedor.firstChild;

    case 'random':
      let contendorRANDOM = document.createElement('div');
      let sin_espacios = element.title.replace(/ /g, "#")
      let textoAreaDivididos = sin_espacios.split("#");



      contendorRANDOM.innerHTML = `<div class="elemento">
            <div>
            <div class="titulo-x"><p class="titulo-de-gif-con-x">#${textoAreaDivididos[1]}${textoAreaDivididos[2]}${textoAreaDivididos[3]}</p><button class="boton_con_x"><img src="./imagenes/close.svg" alt="x"</button></div>
            <img src="${element.images.original.url}" class="gifos">
           </div>
           <input class="Ver-mas" type="button" onclick="location.href='https://giphy.com/';" value="Ver más…..." />
          
           </div>
    </div>`

      return contendorRANDOM.firstChild

  }
}
async function Random() {

  let response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=KSRFihSLXt224ZjBa5gK4SUm9msngCqt&limit=4&rating=G`)
  try {
    let random_gif = await response.json();
    for (let i = 0; i < random_gif.data.length; i++) {
      const element = random_gif.data[i];
      contendorRANDOM.appendChild(crearGif(element, 'random'))
    }
  } catch (error) {

    console.log("error")
  }
} Random()

async function Tendencias() {

  let response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=KSRFihSLXt224ZjBa5gK4SUm9msngCqt&limit=103&rating=G`)
  let trending_gif = await response.json();
  try {
    for (let i = 0; i < trending_gif.data.length; i++) {
      const element = trending_gif.data[i + 4];

      contendorGifs.appendChild(crearGif(element, 'tendencias'))
    }
  } catch (error) {
    ;
  }
} Tendencias()





async function cargarDatos(busqueda) {

  let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=KSRFihSLXt224ZjBa5gK4SUm9msngCqt&q=${busqueda}&limit=50&offset=0&rating=G&lang=es`)

  let gifs = await response.json();
  var html = ""
  for (let i = 0; i < gifs.data.length; i++) {
    const element = gifs.data[i];
    let titulo = JSON.stringify(element.title)
    // let remplazo = titulo.substring(1, 20)
    let sin_espacio = titulo.replace(/ /g, '#')
    let textoAreaDividido = sin_espacio.split("#");


    if (textoAreaDividido[2] == undefined) {
      var texto_final = `${textoAreaDividido[1]}`
    } else if (textoAreaDividido[3] == undefined) {
      var texto_final = `${textoAreaDividido[1]}#${textoAreaDividido[2]}`
    } else if (textoAreaDividido[4] == undefined) {
      var texto_final = `${textoAreaDividido[1]}#${textoAreaDividido[2]}#${textoAreaDividido[3]}`
    } else {
      var texto_final = `${textoAreaDividido[1]}#${textoAreaDividido[2]}#${textoAreaDividido[3]}#${textoAreaDividido[4]}`
    }

    html += `<div class="elemento">
                      <div> 
                           <img src="${element.images.original.url}" class="gifos">
                       </div> 
                        <div>
                          <p class="titulo-de-gif">#${texto_final.replace('"', '')}</p>
                     </div>
                   </div>`
    TEXTO_BUSQUEDA.innerHTML = `<p class="busqueda">${sessionStorage.getItem("busqueda")}</p>`
    contendorRANDOM.innerHTML = html;
  }
}
CAJA_SUMMIT.onclick = () => {
  CAJA_SUMMIT.style.setProperty("background", "var(--boton-sugerido)")
  LETRAS_BUSCAR.style.setProperty("color", "var(--gris-lupa)")
  document.documentElement.style.setProperty("--lupa-gris", "url(../imagenes/lupa_inactive.svg)");
  var valorDeBusqueda = inputBusqueda.value;
  link_azul(valorDeBusqueda)
  cargarDatos(valorDeBusqueda)
  sessionStorage.setItem("busqueda", inputBusqueda.value)
  BUSQUEDASUGERIDA.style.setProperty("display", "none")
 
}
  async function Sugerencias(busqueda) {
    let response = await fetch(`https://api.giphy.com/v1/tags/related/${busqueda}?api_key=KSRFihSLXt224ZjBa5gK4SUm9msngCqt&q=&lang=es`)
    let busquedasugerida = await response.json();
    try {
       BUSQUEDASUGERIDA.innerHTML = `<button class="texto-cajagrisdesplegable" id="botoncajagris">${busquedasugerida.data[1].name}</button>
       <button class="texto-cajagrisdesplegable" id="botoncajagris">${busquedasugerida.data[2].name}</button>
       <button class="texto-cajagrisdesplegable" id="botoncajagris">${busquedasugerida.data[3].name}</button>`
    } catch (error) {
      console.log('error')
    }
  }


async function mis_gifos() {
  if (localStorage.getItem("my_gifs")) {
    let idsLS = localStorage.getItem("my_gifs")
    var id = JSON.parse(idsLS)
    let idsstring = ""
    id.forEach(item => idsstring += item + ",")
    console.log(id)
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


MIS_GIFS.onclick = () => {
  if (DISPLAY_PAGINA.style.display === "none") {
    DISPLAY_PAGINA.style.display = "block"
    CAJAGIFS.style.display = 'none'
  } else {
    DISPLAY_PAGINA.style.display = "none"
    CAJAGIFS.style.display = 'block'
  }
}
IMAGEN.onclick = () => {
  if (DISPLAY_PAGINA.style.display === "none") {
    DISPLAY_PAGINA.style.display = "block"
    CAJAGIFS.style.display = 'none'
  }
}
inputBusqueda.addEventListener('input', () => {
  document.documentElement.style.setProperty("--boton-busqueda", "var(--rosa-claro)");
  CAJA_SUMMIT.style.setProperty("background", "var(--rosa-claro)")
  var valorDeBusqueda = inputBusqueda.value;
  Sugerencias(valorDeBusqueda)
  BUSQUEDASUGERIDA.style.setProperty("padding-top", "1em")
  CAJA_SUMMIT.style.setProperty("background", "var(--rosa-claro)")
  CAJA_SUMMIT.style.setProperty("border-width", "1px")
  LETRAS_BUSCAR.style.setProperty("color", "var(--fuente-clara)")
  document.documentElement.style.setProperty("--lupa-gris", "var(--lupa-negra)");
  // CAJA_SUMMIT.addEventListener('click',()=>{
  //    setTimeout( ()=>{  CAJA_SUMMIT.style.setProperty("border-width", "1px"), 100})
  //   CAJA_SUMMIT.style.setProperty("border-width", "0px")})
})

async function link_azul(busqueda) {
  let botones_azules = await fetch(`https://api.giphy.com/v1/tags/related/${busqueda}?api_key=DQJpDh63TYm4J3o2SoYclH8EqphK1EK9`)
  let boton_azul = await botones_azules.json();
    PALABRASBUSCADAS.innerHTML = `<p class="botones_azules_recomendados">${boton_azul.data[0].name}</p> 
    <p class="botones_azules_recomendados">${boton_azul.data[1].name}</p> 
    <p class="botones_azules_recomendados">${boton_azul.data[2].name}</p>`
}
