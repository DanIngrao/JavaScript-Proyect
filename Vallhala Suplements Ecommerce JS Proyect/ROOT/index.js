//Variables Globales...

let carrito = []
let total = 0

//Capturas DOM...

let divProductos = document.getElementById("productox");
let divCarrito = document.getElementById("carritox");
let abrirElCarrito = document.getElementById("abrircarrito");
let mostrarTotal = document.getElementById("totalmodal");
let divFormulario = document.getElementById("formulario");
let btnFinalizar = document.getElementById("finalizarCompra");
let selectOrden = document.getElementById("selectOrden");
let btnGuardarProducto = document.getElementById("guardarProductoBtn")
let buscador = document.getElementById("buscador")
let totalcarritomodal = document.getElementById("totalmodal")

//Clase constructora

class productos {
    constructor(sku, nombre, precio, categoria, imagen) {
        this.sku = sku;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;
    }
}

//Armando el array del catalogo...

let catalogoProductos = []

console.log(catalogoProductos)

const cargarCatalogo = async () => {
    const response = await fetch("productos.json")
    const data = await response.json()
    for (let producto of data) {
        let nuevoProducto = new productos(producto.sku, producto.nombre, producto.precio, producto.categoria, producto.imagen)
        catalogoProductos.push(nuevoProducto)
    };
    mostrarCatalogo(catalogoProductos)
};

cargarCatalogo();

//Filtro de busqueda de catalogo...

selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)

    if(selectOrden.value == 1){
        ordenarMayorMenor();
    }else if (selectOrden.value == 2){
        ordenarMenorMayor();
    }else if (selectOrden.value == 3){
        ordenarAlfabeticamente();
    }else{
        mostrarCatalogo(catalogoProductos);
    }
});

//Boton de finalizar compra del Modal

btnFinalizar.addEventListener("click",()=>{
    finalizarCompra()
});

function finalizarCompra(){
    total==0 ? carritoVacio() : compraCorrecta();
}


function carritoVacio(){
    Swal.fire({
        title: 'El carrito esta vacio',
        icon: 'info',
    })
};

function compraCorrecta(){
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
            title: 'Compra realizada',
            icon: 'success',
            confirmButtonColor: 'green',
            text: `El pedido ha sido generado con exito.`,
            })
            total=0;
            totalcarritomodal.innerText = `$${total}`
            divCarrito.innerHTML = ""
        }else{
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no ha sido realizada, sus productos siguen en el carrito.`,
                confirmButtonColor: 'green',
                timer:3500
            });
        };
    });
};

//Funciones para acomodar el Array...


function ordenarMayorMenor(array){
    let mayorMenor = [].concat(catalogoProductos)
    mayorMenor.sort((a,b) => (b.precio - a.precio))
    console.log(array)
    console.log(mayorMenor)
    mostrarCatalogo(mayorMenor)
 }
 function ordenarMenorMayor(array){
 let menorMayor = [].concat(catalogoProductos)
    menorMayor.sort((a,b) => (a.precio - b.precio))
    console.log(array)
    console.log(menorMayor)
    mostrarCatalogo(menorMayor)
 }
 function ordenarAlfabeticamente(array){
     let alfabeticamente = catalogoProductos.slice()
     alfabeticamente.sort((a,b) => {
     if(a.nombre < b.nombre)return -1
     if(a.nombre > b.nombre)return 1
     return 0
    })
    console.log(array)
    console.log(alfabeticamente)
    mostrarCatalogo(alfabeticamente)
 }

 //Funcion para mostrar el catalogo

function mostrarCatalogo(array){
    divProductos.innerHTML = ""
    array.forEach((producto)=>{
        let nuevoProducto = document.createElement("div");
        nuevoProducto.innerHTML = `<div id="${producto.sku}" class="card" style="width: 18rem;">
                                        <img class="card-img-top" style="height: 250px;"src="assets/${producto.imagen}" alt="${producto.nombre} de ${producto.categoria}">
                                        <div class="card-body">
                                            <h4 class="card-title">${producto.nombre}</h4>
                                            <p>Categoria: ${producto.categoria}</p>
                                            <p class="">Precio: $${producto.precio}</p>
                                            <button id="agregarBtn${producto.sku}" class="btn btn-dark btn-outline-warning">Agregar al carrito</button>
                                        </div>
                                    </div>`;
        divProductos.appendChild(nuevoProducto);
    
        //Boton de agregar al carrito...
    
        let btnAgregar = document.getElementById(`agregarBtn${producto.sku}`);
        btnAgregar.addEventListener("click", ()=>{
            carrito.push(producto);
            total += producto.precio;
            totalcarritomodal.innerText = `$${total}`
            console.log(total);
            Swal.fire({
                title: "Se agrego el producto al carrito",
                icon: "success",
                confirmButtonColor: "black",
                timer: 1500,
            });
            let agregarCarrito = document.createElement("div");
            agregarCarrito.innerHTML = `<div id="${producto.sku}" class="card" style="width: 18rem;">
                                            <img class="card-img-top" style="height: 250px;"src="assets/${producto.imagen}" alt="${producto.nombre} de ${producto.categoria}">
                                            <div class="card-body">
                                                <h4 class="card-title">${producto.nombre}</h4>
                                                <p>Categoria: ${producto.categoria}</p>
                                                <p class="">Precio: $${producto.precio}</p>
                                                <button id="quitarBtn${producto.sku}" class="btn btn-dark btn-outline-warning">Quitar del carrito</button>
                                            </div>
                                        </div>`;
            divCarrito.appendChild(agregarCarrito);
        
            //Boton de quitar del carrito... Quita el div creado y resta el total
        
            let btnQuitar = document.getElementById(`quitarBtn${producto.sku}`)
            btnQuitar.addEventListener("click", ()=>{
                total-= producto.precio;
                console.log(total);
                divCarrito.removeChild(agregarCarrito);
                totalcarritomodal.innerText = `$${total}`
            });
        });
    });
};

//Función para agregar productos: 

function cargarProducto(array){
    //captura y utilización de input para crear nuevo objeto
    let inputCategoria = document.getElementById("categoriaInput")  
    let inputNombre = document.getElementById("nombreInput")
    let inputPrecio = document.getElementById("precioInput")
    
    let productoCreado = new productos(array.length+1, inputNombre.value, parseInt(inputPrecio.value), inputCategoria.value, "productoNuevo.jpg")
    //Objeto creado lo pusheo al array
    array.push(productoCreado)
    //TAMBIÉN MODIFICAMOS ARRAY DEL STORAGE:
    localStorage.setItem("catalogoProductos", JSON.stringify(array))
    mostrarCatalogo(array)

    inputCategoria.value = ""
    inputNombre.value = ""
    inputPrecio.value =""
}

btnGuardarProducto.addEventListener("click", ()=>{cargarProducto(catalogoProductos)})

//funcion buscador que se activa con evento change del input para buscar

buscador.addEventListener("input", ()=>{buscarInfo(buscador.value, catalogoProductos)})

function buscarInfo(buscado, array){
    let busqueda = catalogoProductos.filter(
        (producto) => producto.categoria.toLowerCase().includes(buscado.toLowerCase()) || producto.nombre.toLowerCase().includes(buscado.toLowerCase())
    )
    busqueda.length == 0 ? 
    (coincidencia.innerHTML = `<h3 class="text-success m-2">No hay coincidencias con su búsqueda.. a continuación tiene todo nuestro catálogo disponible</h3>`, mostrarCatalogo(array)) 
    : (coincidencia.innerHTML = "", mostrarCatalogo(busqueda))
};