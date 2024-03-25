const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct(product) {
        const products = this.getProducts();
        product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        this.saveData(products);
    }

    getProducts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path);
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    getProductById(productId) {
        const products = this.getProducts();
        return products.find(product => product.id === productId);
    }

    updateProduct(productId, newData) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
            products[index] = { ...products[index], ...newData };
            this.saveData(products);
            return true;
        }
        return false;
    }

    deleteProduct(productId) {
        let products = this.getProducts();
        products = products.filter(product => product.id !== productId);
        this.saveData(products);
    }

    saveData(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 4));
    }
}

module.exports = ProductManager;
