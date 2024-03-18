class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = "Pearl";
        this.description = "bateria profesional";
        this.price = 3500;
        this.thumbnail = "imagen1";
        this.code = "000";
        this.stock = 100;
    }
}

class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(code) {
        this.products = this.products.filter(product => product.code !== code);
    }

    listProducts() {
        return this.products;
    }
}


const manager = new ProductManager();


manager.addProduct(new Product("platillo", "Paiste 2002", 10.99, "imagen1.jpg", "001", 50));
manager.addProduct(new Product("bateria", "DW Profesional", 20.50, "imagen2.jpg", "002", 30));
manager.addProduct(new Product("Palillos", "Vic Firth 5b punta de madera", 5.75, "imagen3.jpg", "003", 100));


console.log("Productos:");
manager.listProducts().forEach(product => {
    console.log('${product.title} - ${product.description} - $${product.price} - ${product.code} - Stock: ${product.stock}');
});


manager.removeProduct("002");


console.log("\nProductos actualizados:");
manager.listProducts().forEach(product => {
    console.log('${product.title} - ${product.description} - $${product.price} - ${product.code} - Stock: ${product.stock}');
});