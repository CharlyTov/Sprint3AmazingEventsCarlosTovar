let container = document.getElementById("contenedorCards")
let events = data.events
let contenedorInputs = document.getElementById("contenedorInputs")
let inputSearch = document.getElementById("search")

function crearCards(objeto){
    return `<div class="col d-flex justify-content-center">
                <div class="card h-100 w-75 card border-danger">
                    <img src="${objeto.image}" class="card-img-top h-50 p-3" alt="${objeto.name}">
                    <div class="card-body">
                    <h5 class="card-title">${objeto.name}</h5>
                    <p class="card-text">${objeto.description}</p>
                </div>
                <div class="d-flex justify-content-evenly">
                    <p>Price: ${objeto.price}</p>
                    <a class="text-decoration-none text-dark details" href="./asses/pages/details.html?parametro=${objeto._id}">Details</a>
                </div>
                </div>
            </div>`
}

function imprimirCards(array,elemetoHTML){
    let template = ""
    for (let evento of array) {
        template += crearCards(evento)
    }
    elemetoHTML.innerHTML = template
}
imprimirCards(events, container)

// crear array de categorias

let categorias = events.map(evento => evento.category)
let categoriasSinRepetir = new Set(categorias)
let categoriasUnicas = Array.from(categoriasSinRepetir)

// crear checkbox con cada categoria del array


function crearBox(categoria){
    return `<div class="col-12 col-md-4 col-lg-4 pt-2 d-flex align-items-center">
            <label class="col-6 col-md-8 col-lg-5" for="${categoria}">${categoria}</label>
            <input class="col-10 col-md-2 col-lg-1" type="checkbox" name="accept" id="${categoria}" value="${categoria}"></div>`
}

function mostrarCategoria(array, donde){
    for(let elemento of array){
        donde.innerHTML += crearBox(elemento)
    }
}
mostrarCategoria(categoriasUnicas,contenedorInputs)

// Crear variable en donde pueda obtener sus propiedades del type checkbox->query

let checkBox = document.querySelectorAll("input[type='checkbox']:checked")

// escuchador de eventos

contenedorInputs.addEventListener("change",()=>{
    //Objeto Nodelist  
    //console.log((document.querySelectorAll("input[type='checkbox']:checked")));

    //convierto el objeto nodelist en un array en la variable arraychecked y lo reccorro con el metodo .map para obtener su valor (:chacked = para ver cual esta activo) (check primer elemento al recorrer el array .value para ver su valir que seria un dato string)
    let arrayChecked = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(check => check.value)

    let eventosFiltrados = filtrarPorCategoria(events, arrayChecked)
    imprimirCards(eventosFiltrados,container)
})
function filtrarPorCategoria(events,arrayChecked){
        const aux = events.filter(events => arrayChecked.includes(events.category) || arrayChecked == 0 )
        return aux
}


// //Filtrar por search

inputSearch.addEventListener("input", () => {
    
    let inputSearch = e.target.value
    //console.log([inputSearch]); // veo en consola el valor que ingreso al buscador

    //creo variable con el resultado de la funcion 
    let arrayFilterSerch = filterSearch(events,inputSearch)

    //condicion que me imprime en pantalla las cards segun el dato del filtro o si no se filtro nada
    if (inputSearch.length == 0) {
        return imprimirCards(events, container)
    } else {
        return imprimirCards(arrayFilterSerch,container)
    }
})

function filterSearch(array,valorIngresadoSerch){
    let arrayFilterSerch = array.filter(events => events.name.toLowerCase().startsWith(valorIngresadoSerch.toLowerCase()))
    return arrayFilterSerch
}

//Filtros Cruzados

// function filtrosCruzados(arrayEventosFinal,categoriaFinal,nombreFinal){
//     let finalArray = filtrarPorCategoria(arrayEventosFinal,categoriaFinal)
//     let finalSerch = filterSearch(finalArray,nombreFinal)
//     return finalSerch
// }



