// VARIABLES

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const agregarAlCarritoBtn = document.querySelectorAll('.agregar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];



cargarEventListeners();


// FUNCTIONS

//funcion q carga los event listeners
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso);


    vaciarCarritoBtn.addEventListener('click', () => {
        limpiarHTML();
        articulosCarrito = [];
    });
};





// Agrega un curso al carrito
function agregarCurso(e) {
    e.preventDefault(); // para que no vaya al href
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
};  


// Eliminar un curso del carrito

function eliminarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')
        console.log(cursoId);
        // ELIMINA DEL ARRAY DE ARTICULOSCARRITO 
        articulosCarrito = articulosCarrito.filter( (curso) => curso.id !== cursoId);
        // ITERAR SOBRE EL CARRITO E IMPRIMIR EL HTML
        carritoHTML();
    } 
}


// LEE EL CONTENIDO DEL HTML AL QUE LE DIMOS CLICK Y VA SUMANDOLO AL ARRAY DE CARRITO
function leerDatosCurso(cursoSeleccionado) {
    // creo un objeto con la info del curso actual
    const infoCurso = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    // revisa si algun elemento ya existe en el carrito usando .some
    const yaExiste = articulosCarrito.some( curso => curso.id === infoCurso.id); // retorna true si el id del curso es === al id de ALGUN elemento del array 
    
    if (yaExiste) {
        const cursos = articulosCarrito.map( (curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad ++;
                return curso; 
            } else {
                return curso;
            };
        })
        //articulosCarrito = [...cursos]
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    // Agrega el objeto de infoCurso al array de articulos del carrito
    carritoHTML()
    console.log(articulosCarrito);
};


//mostrar el carrito de compra en el html

function carritoHTML() {

    // limpia el html para que no se repita cada vez q itera
    limpiarHTML()


    //recorre el array y va generando un row para cada curso
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src= ${imagen} class= "carrito-img">
            </td>

            <td>
                ${titulo}
            </td>

            <td>
                ${precio}
            </td>

            <td>
                ${cantidad}
            </td>

            <td>
                <a href= "#" class= "borrar-curso" data-id= ${id}>X
            </td>
        
        `;
        //agrega el html en el tboddy
        contenedorCarrito.appendChild(row);
    })
}



function limpiarHTML() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

};




