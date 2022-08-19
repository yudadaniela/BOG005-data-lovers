//import  from "./data.js";
import { calcularPorcentaje, filtrado, ordenar } from "./data.js";
import olymGam from "./data/athletes/athletes.js";
import data from "./data/athletes/athletes.js";

// Carga el dom
window.addEventListener("DOMContentLoaded", () => {
  // llamar la funcion de pintado con  todos los atletas
  // pintarAtletas(olymGam.athletes)
  visual(olymGam.athletes);
  const inputOrder = document.getElementById("ordenar");
  inputOrder.addEventListener("change", () => {
    let dataActual = data.athletes;
    const inputValor = inputOrder.value;
    dataActual = ordenar(dataActual, inputValor);
    //console.log(ordenar(dataActual, inputValor));
    //console.log(inputValor);
    visual(dataActual);
  });

  //console.log("loaded");
});

const botonbuscar = document.getElementById("buscarDatos");
botonbuscar.addEventListener("click", () => {
  let dataActualCalcular = data.athletes;
  const botonMedalla = document.getElementById("calculo-medal");
  const botonGenero = document.getElementById("calculo-gender");
  const inputPais = document.getElementById("country-statistics").value;

  botonMedalla.addEventListener("click", () => {
    dataActualCalcular = filtrado(dataActualCalcular, inputPais, "team");
    //console.log("hola");

    let totalBuscado = dataActualCalcular.length;
    console.log(dataActualCalcular);
    if (totalBuscado === 0) {
      let contenedorCalculo = document.getElementById("contenedorCalculos");
      contenedorCalculo.innerHTML = `<div id="contenedorCalculos">
      <p>Oops! We do not have that country in the database, try another.</p>
      </div>`;
    } else {
      let dataMedallaOro = filtrado(dataActualCalcular, "Gold", "medal");
      let totalOro = dataMedallaOro.length;
      //console.log(totalOro);
      let porcentajeOro = calcularPorcentaje(totalBuscado, totalOro);

      let dataMedallaPlata = filtrado(dataActualCalcular, "Silver", "medal");
      let totalPlata = dataMedallaPlata.length;
      //console.log(totalPlata);
      let porcentajePlata = calcularPorcentaje(totalBuscado, totalPlata);

      let dataMedallaBronce = filtrado(dataActualCalcular, "Bronze", "medal");
      let totalBronce = dataMedallaBronce.length;
      //console.log(totalBronce);
      let porcentajeBronce = calcularPorcentaje(totalBuscado, totalBronce);
      let contenedorCalculo = document.getElementById("contenedorCalculos");
      contenedorCalculo.innerHTML = `<div id="contenedorCalculos">
    <p>The percentage of gold medals is: ${porcentajeOro}%, the percentage of silver medals is: ${porcentajePlata}%, the percentage of bronze medals is: ${porcentajeBronce}% </p>
    </div>`;
      document.getElementById("chart-container").style.display = "flex";
      document.getElementById("chart-containerOne").style.display = "none";

      let medallas = [porcentajeBronce, porcentajePlata, porcentajeOro];
      const data = {
        labels: ["Bronze", "Silver", "Gold"],
        datasets: [
          {
            label: "My First Dataset",
            data: medallas,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      };
      const config = {
        type: "pie",
        data: data,
      };

      // eslint-disable-next-line no-unused-vars, no-undef
      const myChart = new Chart(document.getElementById("myChart"), config);
    }
  });

  botonGenero.addEventListener("click", () => {
    dataActualCalcular = filtrado(dataActualCalcular, inputPais, "team");
    console.log("hola");

    let totalBuscado = dataActualCalcular.length;
    console.log(totalBuscado);
    if (totalBuscado === 0) {
      let contenedorCalculo = document.getElementById("contenedorCalculos");
      contenedorCalculo.innerHTML = `<div id="contenedorCalculos">
      <p>Oops! We do not have that country in the database, try another.</p>
      </div>`;
    } else {
      let dataHombre = filtrado(dataActualCalcular, "M", "gender");
      let totalHombre = dataHombre.length;

      let porcentajeHombre = calcularPorcentaje(totalBuscado, totalHombre);

      let dataMujer = filtrado(dataActualCalcular, "F", "gender");
      let totalMujer = dataMujer.length;

      let porcentajeMujer = calcularPorcentaje(totalBuscado, totalMujer);

      let contenedorCalculo = document.getElementById("contenedorCalculos");
      contenedorCalculo.innerHTML = `<div id="contenedorCalculos">
    <p>The percentage of women is: ${porcentajeMujer}%, the percentage of men  is: ${porcentajeHombre}% </p>
    </div>`;
      document.getElementById("chart-containerOne").style.display = "flex";
      document.getElementById("chart-container").style.display = "none";

      let genero = [porcentajeMujer, porcentajeHombre];
      const data = {
        labels: ["Women", "Men"],
        datasets: [
          {
            label: "My First Dataset",
            data: genero,
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
            hoverOffset: 4,
          },
        ],
      };
      const config = {
        type: "pie",
        data: data,
      };

      // eslint-disable-next-line no-unused-vars, no-undef
      const myChart = new Chart(document.getElementById("myChartOne"), config);
    }
  });
});

const boton = document.getElementById("filtrarBoton");

boton.addEventListener("click", () => {
  const inputCountry = document.getElementById("country").value;
  const inputSport = document.getElementById("sport").value;
  const inputGender = document.getElementById("gender").value;
  const inputMedal = document.getElementById("medal").value;
  let dataActual = data.athletes;
  //console.log(dataActual);

  if (inputCountry !== "") {
    dataActual = filtrado(dataActual, inputCountry, "team");
    //console.log(dataActual);
  }

  if (inputSport !== "") {
    dataActual = filtrado(dataActual, inputSport, "sport");
    //console.log(dataActual);
  }
  if (inputGender !== "") {
    dataActual = filtrado(dataActual, inputGender, "gender");
    //console.log(dataActual);
  }
  if (inputMedal !== "") {
    dataActual = filtrado(dataActual, inputMedal, "medal");
    //console.log(dataActual);
  }

  const inputOrder = document.getElementById("ordenar");
  inputOrder.addEventListener("change", () => {
    const inputValor = inputOrder.value;
    //console.log(ordenar(dataActual, inputValor));
    dataActual = ordenar(dataActual, inputValor);

    let contenedor = document.getElementById("atletas");
    let posicionInicial = 0;
    let posicionFinal = 2;
    let datosFiltrados = "";
    for (let i = posicionInicial; i < posicionFinal; i++) {
      datosFiltrados += `<article id="contenido">
      <p class="nombre">${dataActual[i].name}</p>
      <p>  ${dataActual[i].team}</p>
      <p>  ${dataActual[i].gender}</p>
      <p>  ${dataActual[i].sport}</p>
      <p>  ${dataActual[i].medal}</p>
    </article> <hr>`;
      contenedor.innerHTML = datosFiltrados;
    }

    //     for (let cont of dataActual) {
    //       datosFiltrados += `<article id="contenido">
    //   <p class="nombre">${cont.name}</p>
    //   <p>  ${cont.team}</p>
    //   <p>  ${cont.gender}</p>
    //   <p>  ${cont.sport}</p>
    //   <p>  ${cont.medal}</p>
    // </article> <hr>`;
    //       contenedor.innerHTML = datosFiltrados;
    //     }
  });
  let contenedor = document.getElementById("atletas");
  let datosFiltrados = "";
  for (let cont of dataActual) {
    datosFiltrados += `<article id="contenido">
  <p class="nombre">${cont.name}</p>
  <p>  ${cont.team}</p>
  <p>  ${cont.gender}</p>
  <p>  ${cont.sport}</p>
  <p>  ${cont.medal}</p>
</article><hr>`;
    contenedor.innerHTML = datosFiltrados;
  }
});

//FUNCION ORDENAR

// const inputOrder = document.getElementById("ordenar");
// inputOrder.addEventListener("change",()=>{
//   let dataActual=data.athletes;
//   const inputValor= inputOrder.value;
//   dataActual= ordenar(dataActual, inputValor);
//   console.log(ordenar(dataActual, inputValor));
//   console.log(inputValor);

// let contenedor=document.getElementById("atletas");
// let datosFiltrados="";
// for(let cont of dataActual){
//   datosFiltrados += `<article id="contenido">
//   <p>${cont.name}</p>
//   <p>  ${cont.team}</p>
//   <p>  ${cont.gender}</p>
//   <p>  ${cont.sport}</p>
//   <p>  ${cont.medal}</p>
//   <hr id="linea">

// </article>`;
// contenedor.innerHTML= datosFiltrados;
// }

//});

function visual() {
  let atletasContenedor = document.getElementById("atletas");
  // const todosAtletas = olymGam.athletes;
  const todosAtletas = olymGam.athletes;
  let atletas = "";
  for (let atleta of todosAtletas) {
    // console.log(atleta);
    //   ************ MANIPULACION DINAMICA DEL DOM
    // const p = document.createElement("p");
    // const article = document.createElement("article");
    // p.innerText = atleta.name;
    // article.appendChild(p);
    // atletasContenedor.append(article);

    //   ************ template string && interpolacion de variables
    atletas += `<article id="contenido">
        <p class="nombre">${atleta.name}</p>
        <p>  ${atleta.team}</p>
        <p>  ${atleta.gender}</p>
        <p>  ${atleta.sport}</p>
        <p>  ${atleta.medal}</p>
        
        <img src="" alt="" srcset="">
      </article>
      <hr>`;
  }
  atletasContenedor.innerHTML = atletas;
}

//console.log(filtrado, ordenar, data);
