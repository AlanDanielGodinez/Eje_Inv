let nextProductId = 1;

const products = [
    { id: nextProductId++, name: 'Galletas', description: 'Descripción del producto 1', price: 20, cantidad: 50 },
    { id: nextProductId++, name: 'Tornillos', description: 'Descripción del producto 2', price: 5, cantidad: 100 }
];

function getAllProducts() {
    return products;
}
function generarID() {
    const timestamp = Date.now().toString(36); // Convertir la marca de tiempo a base 36
    const aleatorio = Math.random().toString(36).substr(2, 5); // Generar un valor aleatorio y tomar solo los primeros 5 caracteres
    return timestamp + aleatorio; // Combinar la marca de tiempo y el valor aleatorio
}


function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

function createProduct(name, description, price, cantidad) {
    const newProduct = {
        id: nextProductId++,
        name,
        description,
        price: parseFloat(price),
        cantidad: parseInt(cantidad)
    };
    products.push(newProduct);
    return newProduct;
}

function updateProduct(id, name, description, price, cantidad) {
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index === -1) return null;
    const updatedProduct = { id: parseInt(id), name, description, price: parseFloat(price), cantidad: parseInt(cantidad) };
    products[index] = updatedProduct;
    return updatedProduct;
}

function deleteProduct(id) {
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
}

function calculateTotalInventoryValue() {
    return products.reduce((total, product) => total + (product.price * product.cantidad), 0);
}

function sortProductsByPrice(order = 'asc') {
    return products.slice().sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
}

function filterProductsByStock(minQuantity) {
    return products.filter(product => product.cantidad >= parseInt(minQuantity));
}
function getProductByName(name) {
    return products.find(product => product.name.toLowerCase() === name.toLowerCase());
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    calculateTotalInventoryValue,
    sortProductsByPrice,
    filterProductsByStock,
    getProductByName
    
};