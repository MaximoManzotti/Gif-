
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
   const GIF_TENDENCIA_2 = document.querySelector("creacion-previa")

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
      document.documentElement.style.setProperty("--logo-azul", "url(../imagenes/gifOF_logo_dark.png)");
    }



    if (localStorage.getItem("tema")=== "Tema-Oscuro"){
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
  if (element.images.original.width > element.images.original.height){
    nuevoContenedor.innerHTML= `<div class="elemento-2">
    <div> 
       <img src="${element.images.original.url}" class="gifos-2">
       <div>
       
       <p class="titulo-de-gif-2">#${element.title}</p>
       </div>
    </div>
</div>`
  }else   nuevoContenedor.innerHTML= `<div class="elemento">
  <div class="grilla"> 
  <img src="${element.images.original.url}" class="gifos">
     <div>
        <p class="titulo-de-gif">#${element.title}</p>
     </div>
  </div>
</div>`
  return nuevoContenedor.firstChild;
 
  case 'random':
    let contendorRANDOM = document.createElement('div');
    let sin_espacios = element.title.replace(/ /g, "")

    contendorRANDOM.innerHTML = `<div class="elemento">
            <div>
            <div class="titulo-x"><p class="titulo-de-gif-con-x">#${sin_espacios}</p><button class="boton_con_x"><img src="./imagenes/close.svg" alt="x"</button></div>
            <img src="${element.images.original.url}" class="gifos">
           </div>
           <div>
           <button class="Ver-mas">Ver más…...</button>
           </div>
    </div>`
     
  return contendorRANDOM.firstChild
  
  }}
  async function Random() {
     
    let response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=KSRFihSLXt224ZjBa5gK4SUm9msngCqt&limit=4&rating=G`)
    try {
      let random_gif = await response.json();
       const element = random_gif.data;
       for (let i = 0; i < random_gif.data.length; i++) {
        const element = random_gif.data[i];
       contendorRANDOM.appendChild(crearGif(element ,'random'))}
    } catch (error) {
      
      console.log("error")
    }}Random()
 
 async function Tendencias() {

   let response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=KSRFihSLXt224ZjBa5gK4SUm9msngCqt&limit=12&rating=G`)
  try {
    let trending_gif = await response.json();
    for (let i = 0; i < trending_gif.data.length; i++) {
      const element = trending_gif.data[i+4];
      
       contendorGifs.appendChild(crearGif(element, 'tendencias'))}
  } catch (error) {
    console.log('Hubo un error')
  } } Tendencias()

  
   


  async function cargarDatos(busqueda) {
   
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=KSRFihSLXt224ZjBa5gK4SUm9msngCqt&q=${busqueda}&limit=50&offset=0&rating=G&lang=es`)

    let gifs = await response.json();
    var html = ""
    for (let i = 0; i < gifs.data.length; i++) {
        const element = gifs.data[i];
        html += `
        <div class="elemento">
             <div> 
                <p class="titulo-de-gif">#${element.title}</p>
                <div>
                <img src="${element.images.original.url}" class="gifos">
                </div>
             </div>
        </div>`
        TEXTO_BUSQUEDA.innerHTML=`<p class=busqueda">${sessionStorage.getItem("busqueda")}</p>`
  contendorRANDOM.innerHTML = html;
}
  }
botonDeBusqueda.onclick = () => {
  var valorDeBusqueda = inputBusqueda.value;

  sessionStorage.setItem("busqueda", valorDeBusqueda)

  cargarDatos(valorDeBusqueda)
}



  