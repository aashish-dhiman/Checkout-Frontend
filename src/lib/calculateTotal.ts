export function calculateTotal(products: any[]) {
    return products
        .reduce((total, product) => total + product.price * product.quantity, 0)
        .toFixed(2);
}
