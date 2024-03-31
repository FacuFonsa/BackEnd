const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        const products = await this.getProducts();
        product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        await this.saveData(products);
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path);
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getProductById(productId) {
        const products = await this.getProducts();
        return products.find(product => product.id === productId);
    }

    async updateProduct(productId, newData) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
            products[index] = { ...products[index], ...newData };
            await this.saveData(products);
            return true;
        }
        return false;
    }

    async deleteProduct(productId) {
        let products = await this.getProducts();
        products = products.filter(product => product.id !== productId);
        await this.saveData(products);
    }

    async saveData(products) {
        await fs.writeFile(this.path, JSON.stringify(products, null, 4));
    }
}

module.exports = ProductManager;
