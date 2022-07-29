calcularCarrito(carrito);


/* Fetch */
window.addEventListener('DOMContentLoaded', () => {
    fetch("db.json")
    .then(response => response.json())
    .then(data => {
        products = data.products
        console.log("Promesa completa");
        cargaDeProducto(products)
        mostrarProductos(products);
    })
})


/* Botón de compra */
buyCart.addEventListener("click", () => {
        if(carrito == "")
    {
        Swal.fire(
            'No hay productos agregados al carrito',
            'Por favor agregue ítem/s y vuelva a intentarlo',
            'error'
        )
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Compra exitosa!',
            html: 'En instantes recibirá un mail con el detalle de su compra',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        })
        carrito="";
        localStorage.setItem("cart", JSON.stringify(carrito))
        setTimeout(function(){
            location.reload();
        }, 3000);
    }
})


/* Botón restaurar carrito */
if(JSON.parse(localStorage.getItem("cart")) == "")
{
    restoreCart.remove();
}

restoreCart.addEventListener("click", () => {
    restaurarCarrito();
})


/* Funciones */
function cargaDeProducto() {
    products.forEach(el => {
        productos.push (new producto (el.id, el.name, el.price, el.stock))
    })
}

function addProductOk() {
    localStorage.setItem("cart", JSON.stringify(carrito))
    Toastify({
        text: "✅Producto agregado al carrito!",
        duration: 2000,
        }).showToast();
    restaurarCarrito();
}

function addProductError() {
    Toastify({
        text: "❌No contamos con stock del producto",
        duration: 2000,
        style: {
            background: "brown"
        }
        }).showToast();
}

function mostrarProductos (products) {
    productContainer.innerHTML = ""
    products.forEach(el => {
    let article = document.createElement(`article`)
    article.className = `product`
    article.classList.add(`product${el.id}`)
    article.innerHTML = plantillaHTML(el);
    productContainer.appendChild(article);
    let btnAdd = document.getElementById(`button${el.id}`)
    btnAdd.addEventListener('click', () => {
        productos[el.id-1].stock > 0 ? (
            agregarAlCarrito(el.id),
            mostrarCarrito(el),
            addProductOk()
        ) :
        addProductError()
    })
})
}

function agregarAlCarrito(id) {
    carrito.push(productos[id-1]);
    console.table(carrito);
    reducirstock(id);
    calcularCarrito(carrito);
}

function reducirstock(id) {
    let resultado = productos.find( p => p.id === id);
    resultado.stock = resultado.stock-1;
    productos[id-1].stock = resultado.stock
}

function agregarstock(id) {
    let resultado = productos.find( p => p.id === id);
    resultado.stock = resultado.stock+2;
}

function mostrarCarrito (el) {
    let cartItem = document.createElement('tr')
    cartItem.innerHTML = `<td>${el.id}</td>
                        <td>${el.nombre}</td>
                        <td>${el.importe}</td>
                        <button id="delete${el.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
    carritoLista.appendChild(cartItem);
    let btnDelete = document.getElementById(`delete${el.id}`)
    btnDelete.addEventListener('click', () => {
        btnDelete.parentElement.remove();
        let removeItem = carrito.find( p => p.id === el.id)
        let remove = carrito.splice(carrito.indexOf(removeItem), 1);
        console.table(carrito);
        localStorage.setItem("cart", JSON.stringify(carrito))
        agregarstock(el.id);
        calcularCarrito(carrito);
    })
}

function calcularCarrito() {
    console.log("TOTAL DEL CARRITO")
    let total = carrito.reduce( (acc, c) => acc + c.importe, 0)
        console.log(total);
    totalCarrito.innerHTML = ""
    let h4Total = document.createElement('h4');
    h4Total.innerText = `Total del carrito: U$D${total}`
    totalCarrito.appendChild(h4Total);
        return total;
}

function restaurarCarrito() {
    let  localCart = JSON.parse(localStorage.getItem("cart"))
    carrito.forEach(el => {
        let btnDelete = document.getElementById(`delete${el.id}`)
        btnDelete.parentElement.remove();
    })
    localCart.forEach(el => {
        mostrarCarrito(el);
        reducirstock(el.id);
    })
    carrito = localCart
    calcularCarrito(carrito);
    restoreCart.remove();
}