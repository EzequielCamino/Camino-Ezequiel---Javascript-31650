class producto {
    constructor(id, nombre, importe, stock) {
        this.id = id;
        this.nombre = nombre;
        this.importe = importe;
        this.stock = stock;
    }
}

const productos = [];
let carrito = [];
const productContainer = document.getElementById(`products`);
const carritoLista = document.getElementById(`carrito`);
const totalCarrito = document.getElementById('totalCarrito');
const restoreCart = document.querySelector("#restoreCart");
const buyCart = document.querySelector("#buyCart");

const plantillaHTML = (el) => {
    return `<h4>${el.name}</h4>
    <img src="media/img${el.id}.jpg" alt="Dunk SB Low Red Plum">
    <h4>Precio: U$D${el.price}</h4>
    <button id="button${el.id}" type="submit" class="btn btn-light">Agregar al carrito</button>`
}