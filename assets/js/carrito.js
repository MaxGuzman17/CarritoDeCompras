let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
console.log(carrito);
//calcula el total
function calcularTotal() {
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio;
    }

    return total;
}

function contarProductos() {
    return carrito.length;
}

//agrega los productos del carrito al DOM 
function crearProductoEnCarrito(producto, index) {
    const card = document.createElement('div');
    card.classList.add("col-12", "mb-2");

    card.innerHTML = `
    <div class="card text-bg-secondary">
        <div class="row g-0 align-items-center">
            <div class="col-md-2 p-2 text-center">
                <img src="../assets/img/${producto.imagen}" class="img-fluid rounded">
            </div>
            <div class="col-md-6">
                <h5>${producto.nombre}</h5>
            </div>
            <div class="col-md-4 text-center">
                <span class="fw-bold me-3">$ ${producto.precio}</span>
                <button class="btn btn-sm btn-danger">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    </div>
    `;

    card.querySelector("button").addEventListener("click", function () {
        eliminarProducto(index);
    });

    return card;
}

function mostrarProductos() {
    const contenedor = document.getElementById('productoEnCarrito');
    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="alert alert-dark text-center border-secondary">
                <i class="bi bi-cart-x fs-2 text-danger"></i>
                <p class="mt-2 mb-1 fw-bold">Tu carrito está vacío</p>
                <small class="text-secondary">
                    Cuando agregues un producto, podrás verlo aquí.
                </small>
            </div>
        `;
        return;
    }
    carrito.forEach((producto, index) => {
        contenedor.appendChild(crearProductoEnCarrito(producto, index));
    });
}

//muestra totales
function actualizarResumen() {
    const cantidad = contarProductos();
    const total = calcularTotal();

    document.getElementById("cantidadProductos").innerText = cantidad;
    document.getElementById("subtotal").innerText = `$ ${total}`;
    document.getElementById("total").innerText = `$ ${total}`;
}

//funcion para eliminar
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarProductos();
    actualizarResumen();
}

actualizarResumen();
mostrarProductos();


