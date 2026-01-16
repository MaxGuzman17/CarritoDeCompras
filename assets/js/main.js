const productos = [
    { id: 1, nombre: 'Nvidia Geforce Rtx 5060 8gb Oc Gddr7', precio: 544, imagen: '5060.webp' },
    { id: 2, nombre: 'Nvidia Geforce Rtx 5070 Ti 16gb Oc Gddr7', precio: 2100, imagen: '5070.webp' },
    { id: 3, nombre: 'Nvidia Geforce Rtx 5080 Inspire X3 16gb Oc Gddr7', precio: 2700, imagen: '5080.webp' },
    { id: 4, nombre: 'Intel Core Ultra 5 245kf 4.2ghz Lga 1851', precio: 500, imagen: 'i5.webp' },
    { id: 5, nombre: 'Intel Core Ultra 7 265 3.9ghz Lga1851', precio: 670, imagen: 'i7.webp' },
    { id: 6, nombre: 'Amd Ryzen 7 7700x 5.4 Ghz Am5', precio: 570, imagen: 'r7.webp' },
    { id: 7, nombre: 'Amd Ryzen 9 9950x 4.3 Ghz Am5', precio: 1000, imagen: 'r9.webp' },
    { id: 8, nombre: 'Ssd 2tb Corsair Mp600 Pro Lpx m.2 Nvme Pcie X4 4.0', precio: 480, imagen: 'ssd.webp' },
    { id: 9, nombre: 'Msi B650m Project Zero Ddr5 Am5', precio: 420, imagen: 'msi.webp' },
    { id: 10, nombre: 'Asrock B860 Steel Legend Wifi Ddr5 S1851', precio: 415, imagen: 'asrock.webp' },
];

//lee carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function contarProductos() {
    return carrito.length;
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarBadgeCarrito() {
    const badge = document.getElementById("badgeCarrito");
    const cantidad = contarProductos();

    if (cantidad > 0) {
        badge.textContent=cantidad;
        badge.classList.remove("d-none");
    }else {
        badge.classList.add("d-none");
    }
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    guardarCarrito();
    actualizarBadgeCarrito();
}

const formBuscador = document.getElementById("formBuscador");
const inputBuscador = document.getElementById("buscador");

formBuscador.addEventListener("submit", (e) => {
    e.preventDefault(); // evita recargar la página

    const texto = inputBuscador.value.trim().toLowerCase();

    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
    );

    mostrarProductos(productosFiltrados);
});

//carga cards con productos al DOM
const crearCardProducto = (producto) => {
    const card = document.createElement('div');
    card.classList.add("col");

    card.innerHTML = `
        <div class="card cardHover h-100 text-bg-secondary">
            <img src="./assets/img/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title text-dark">$ ${producto.precio}</h5>
                <p class="card-text">${producto.nombre}</p>
                <button class="btn btn-danger mt-auto">Agregar al carrito</button>
            </div>
        </div>
    `;

    card.querySelector("button").addEventListener("click", function () {
        agregarAlCarrito(producto);
    });

    return card;
};

const mostrarProductos = (listaProductos) => {
    const contenedor = document.getElementById('contenedorProductos');
    contenedor.innerHTML = '';

    if (listaProductos.length === 0) {
        contenedor.innerHTML = `<p class="text-center text-light">No se encontraron productos</p>`;
        return;
    }

    listaProductos.forEach((producto) => {
        contenedor.appendChild(crearCardProducto(producto));
    });
};


function mostrarModalProducto(producto) {
    const nombreProducto = document.getElementById("nombreProductoModal");
    nombreProducto.textContent = producto.nombre;

    const modal = new bootstrap.Modal(
        document.getElementById("modalCarrito")
    );

    modal.show();
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    guardarCarrito();
    actualizarBadgeCarrito();
    mostrarModalProducto(producto);
}


mostrarProductos(productos);
actualizarBadgeCarrito();
