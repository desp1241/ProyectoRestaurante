const menu = document.querySelector('.divisor');
const navegacion = document.querySelector('.navegacion');
const btnTodos = document.querySelector('.todos');
const btnCostas = document.querySelector('.costas');
const btnSierras = document.querySelector('.sierras');
const btnSelvas = document.querySelector('.selvas');
const btnPostres = document.querySelector('.postres');
const contenedorPlatos = document.querySelector('.platos');

document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    platos();
})

const eventos = () =>{
    menu.addEventListener('click', abrirMenu);
}

const abrirMenu = () =>{
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar, overlay);
}

const cerrarMenu = (boton, overlay) => {
    boton.addEventListener('click', () =>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }
}

const platos = () =>{
    let platosArreglo = [];
    const platos = document.querySelectorAll('.plato');
    
    platos.forEach(plato => platosArreglo = [...platosArreglo, plato]);

    const costas = platosArreglo.filter(costa => costa.getAttribute('data-plato') === 'costa');

    const sierras = platosArreglo.filter(sierra => sierra.getAttribute('data-plato') === 'sierra');

    const selvas = platosArreglo.filter(selva => selva.getAttribute('data-plato') === 'selva');

    const postres = platosArreglo.filter(postre => postre.getAttribute('data-plato') === 'postre');

    mostrarPlatos(costas, sierras, selvas, postres, platosArreglo);
    
}

const mostrarPlatos = (costas, sierras, selvas, postres, todos) =>{
    btnCostas.addEventListener('click', () => {
        limpiarHtml(contenedorPlatos);
        costas.forEach(costa => contenedorPlatos.appendChild(costa));
    });
    btnSierras.addEventListener('click', () => {
        limpiarHtml(contenedorPlatos);
        sierras.forEach(sierra => contenedorPlatos.appendChild(sierra));
    });
    btnSelvas.addEventListener('click', () => {
        limpiarHtml(contenedorPlatos);
        selvas.forEach(selva => contenedorPlatos.appendChild(selva));
    });
    btnPostres.addEventListener('click', () => {
        limpiarHtml(contenedorPlatos);
        postres.forEach(postre => contenedorPlatos.appendChild(postre));
    });
    btnTodos.addEventListener('click', () => {
        limpiarHtml(contenedorPlatos);
        todos.forEach(todo => contenedorPlatos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}