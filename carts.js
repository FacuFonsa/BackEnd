const express = require('express');
const router = express.Router();


let carts = [];


let nextCartId = 1;


router.post('/', (req, res) => {
    const { products } = req.body;

    
    if (!products) {
        return res.status(400).json({ error: 'Debes proporcionar al menos un producto para crear un carrito' });
    }

    
    const newCart = {
        id: nextCartId++, 
    };

    
    carts.push(newCart);

    
    res.status(201).json(newCart);
});


router.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = carts.find(c => c.id === cartId);
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart.products);
});


router.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity) || 1;

    
    const cartIndex = carts.findIndex(c => c.id === cartId);
    if (cartIndex === -1) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    
    const existingProductIndex = carts[cartIndex].products.findIndex(p => p.product === productId);
    if (existingProductIndex !== -1) {
        
        carts[cartIndex].products[existingProductIndex].quantity += quantity;
    } else {
        
        carts[cartIndex].products.push({ product: productId, quantity });
    }

    
    res.json(carts[cartIndex]);
});

module.exports = router;
