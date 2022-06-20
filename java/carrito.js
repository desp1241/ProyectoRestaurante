const addCarritoCompraBotones = document.querySelectorAll('.agregarCarrito');
addCarritoCompraBotones.forEach(addCarritoBoton => {
    addCarritoBoton.addEventListener('click', addCarritoClick);
});

const botonComprar = document.querySelector('.botonComprar')
botonComprar.addEventListener('click', botonComprarClick);



const carritoComprasPlatos = document.querySelector('.carritoComprasPlatos');

function addCarritoClick(event) {
    const boton = event.target;
    const plato = boton.closest('.plato');

    const platoNombre = plato.querySelector('.plato-nombre').textContent;
    const platoPrecio = plato.querySelector('.plato-precio').textContent;
    const platoImagen = plato.querySelector('.plato-imagen').src;

    addPlatoCarritoCompra(platoNombre, platoPrecio, platoImagen);
}

function addPlatoCarritoCompra(platoNombre, platoPrecio, platoImagen) {

    const platoNombres = carritoComprasPlatos.getElementsByClassName('carritoCompraPlatoNombre');
    for (let i = 0; i < platoNombres.length; i++) {
        if (platoNombres[i].innerText === platoNombre) {
            let nombreCantidad = platoNombres[i].parentElement.parentElement.parentElement.querySelector('.carritoCompraPlatoCantidad');
            nombreCantidad.value++;
            actualizarCarritoTotal();
            return;
        }
    }

    const carritoCompraFila = document.createElement('div');
    const carritoCompraContenido = `
    <div class="row carritoCompraPlato">
        <div class="col-6">
            <div class="carrito-compra-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${platoImagen} class="carrito-compras-image">
                <h6 class="carrito-compra-item-nombre carritoCompraPlatoNombre text-truncate ml-3 mb-0">${platoNombre}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="carrito-compra-precio d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 carritoCompraPlatoPrecio">${platoPrecio}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="carrito-compra-cantidad d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="carrito-compra-cantidad-input carritoCompraPlatoCantidad" type="number"
                    value="1">
                <button class="btn btn-rojo3 btn-danger botonBorrar" type="button">X</button>
            </div>
        </div>
    </div>`;

    carritoCompraFila.innerHTML = carritoCompraContenido;
    carritoComprasPlatos.append(carritoCompraFila);

    carritoCompraFila.querySelector('.botonBorrar').addEventListener('click', borrarCarritoCompraPlato);

    carritoCompraFila.querySelector('.carritoCompraPlatoCantidad').addEventListener('change', cantidadCambiada);

    actualizarCarritoTotal()
}

function actualizarCarritoTotal() {
    let total = 0;
    const carritoComprasTotal = document.querySelector('.carritoComprasTotal');
    const carritoCompraPlatos = document.querySelectorAll('.carritoCompraPlato');

    carritoCompraPlatos.forEach((carritoCompraPlato) => {
        const carritoCompraPlatoPrecio = carritoCompraPlato.querySelector('.carritoCompraPlatoPrecio');
        const carritoCompraPlatoPrecios = Number(carritoCompraPlatoPrecio.textContent.replace('S/. ', ''));
        const carritoCompraPlatoCantidad = carritoCompraPlato.querySelector('.carritoCompraPlatoCantidad');
        const carritoCompraPlatoCantidades = Number(carritoCompraPlatoCantidad.value);

        total = total + carritoCompraPlatoPrecios * carritoCompraPlatoCantidades;
    });

    carritoComprasTotal.innerHTML = `S/. ${total.toFixed(2)}`;
}

function borrarCarritoCompraPlato(event) {
    const botonClick = event.target;
    botonClick.closest('.carritoCompraPlato').remove();
    actualizarCarritoTotal();
}

function cantidadCambiada(event) {
    const cambiarCantidad = event.target;
    if (cambiarCantidad.value <= 0) {
        cambiarCantidad.value = 1;
    }
    actualizarCarritoTotal();
}

function botonComprarClick() {
    carritoComprasPlatos.innerHTML = '';
    actualizarCarritoTotal();
}