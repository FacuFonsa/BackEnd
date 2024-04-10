const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;


app.use(express.json());


const productsRouter = require('./products');
app.use('/api/products', productsRouter);


const cartsRouter = require('./carts');
app.use('/api/carts', cartsRouter);


let products = [];
try {
    const productsData = fs.readFileSync('productos.json', 'utf8');
    products = JSON.parse(productsData);
} catch (err) {
    console.error('Error al cargar los datos de productos:', err);
}


let carts = [];
try {
    const cartsData = fs.readFileSync('carrito.json', 'utf8');
    carts = JSON.parse(cartsData);
} catch (err) {
    console.error('Error al cargar los datos de carritos:', err);
}


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});