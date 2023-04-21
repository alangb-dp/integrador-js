//PRODUCTOS

const productos = [
    //Accion
    {
        id: "csgo",
        titulo: "Counter Strike Global Offensive",
        imagen: "/img/Accion/csgo2.jpg",
        categoria: {
            nombre: "accion",
            id: "accion",
        },
        precio: 3440,

    },
    {
        id: "mafiade",
        titulo: "Mafia Definitive Edition",
        imagen: "/img/Accion/mafiaDE2.jpg",
        categoria: {
            nombre: "accion",
            id: "accion",
        },
        precio: 6099,

    },
    {
        id: "metroexodus",
        titulo: "Metro Exodus",
        imagen: "/img/Accion/metroExodus2.jpg",
        categoria: {
            nombre: "accion",
            id: "accion",
        },
        precio: 1399,

    },
    {
        id: "re3remake",
        titulo: "Resident Evil 3 Remake",
        imagen: "/img/Accion/re3remake2.jpg",
        categoria: {
            nombre: "accion",
            id: "accion",
        },
        precio: 4250,

    },
    {
        id: "re4",
        titulo: "Resident Evil 4 Remake",
        imagen: "/img/Accion/re42.jpg",
        categoria: {
            nombre: "accion",
            id: "accion",
        },
        precio: 15250,

    },

    //Aventura

    {
        id: "darkSouls3",
        titulo: "Dark Souls 3",
        imagen: "/img/Aventura/ds32.jpg",
        categoria: {
            nombre: "aventura",
            id: "aventura",
        },
        precio: 8540,

    },
    {
        id: "daysGone",
        titulo: "Days Gone",
        imagen: "/img/Aventura/dsg2.jpg",
        categoria: {
            nombre: "aventura",
            id: "aventura",
        },
        precio: 10000,

    },
    {
        id: "eldenRing",
        titulo: "Elden Ring",
        imagen: "/img/Aventura/ering.jpg",
        categoria: {
            nombre: "aventura",
            id: "aventura",
        },
        precio: 12250,

    },
    {
        id: "gtav",
        titulo: "Gta V",
        imagen: "/img/Aventura/Grand_Theft_Auto_V.png",
        categoria: {
            nombre: "aventura",
            id: "aventura",
        },
        precio: 2500,

    },
    {
        id: "mhRise",
        titulo: "Monster Hunter Rise",
        imagen: "/img/Aventura/mhrise2.jpg",
        categoria: {
            nombre: "aventura",
            id: "aventura",
        },
        precio: 9099,

    },
    {
        id: "tlou",
        titulo: "The Last Of Us Part I",
        imagen: "/img/Aventura/thloupart1.webp",
        categoria: {
            nombre: "aventura",
            id: "aventura",
        },
        precio: 10499,

    },
    {
        id: "tombRaider",
        titulo: "Shadow Of The Tomb Raider",
        imagen: "/img/Aventura/softr2.jpg",
        categoria: {
            nombre: "aventura",
            id: "aventura",
        },
        precio: 799,

    },
    //Terror
    {
        id: "outlast2",
        titulo: "Outlast 2",
        imagen: "/img/Terror/Outlast2.webp",
        categoria: {
            nombre: "terror",
            id: "terror",
        },
        precio: 1299,

    },
    {
        id: "re2",
        titulo: "Resident Evil 2 Remake",
        imagen: "/img/Terror/re2remake.jpg",
        categoria: {
            nombre: "terror",
            id: "terror",
        },
        precio: 3339,

    },
    {
        id: "rehd",
        titulo: "Resident Evil HD",
        imagen: "/img/Terror/rehd2.webp",
        categoria: {
            nombre: "terror",
            id: "terror",
        },
        precio: 5250,

    },
    {
        id: "tew",
        titulo: "The Evil Within",
        imagen: "/img/Terror/TEW.jpg",
        categoria: {
            nombre: "terror",
            id: "terror",
        },
        precio: 1799,

    },
    {
        id: "tew2",
        titulo: "The Evil Within 2",
        imagen: "/img/Terror/TEW2.png",
        categoria: {
            nombre: "terror",
            id: "terror",
        },
        precio: 2099,

    },

];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal")
const numerito = document.querySelector ("#numerito");
let botonesAgregar = document.querySelectorAll(".producto-agregar");

function cargarProductos (productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
        `

        contenedorProductos.append(div);

    })

    actualizarBotonesAgregar();
    console.log(botonesAgregar);
};

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre ;    
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton);

        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }


    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });

};


let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();

} else {
    productosEnCarrito = [];
};

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {

        productoAgregado.cantidad = 1
        productosEnCarrito.push(productoAgregado);

    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}






