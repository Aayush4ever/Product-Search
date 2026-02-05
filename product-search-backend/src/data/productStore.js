const productStore = new Map();
let currentProductId = 1;

function addProduct(product) {
  const newProduct = {
    productId: currentProductId++,
    ...product,
    metadata: {},
    createdAt: new Date()
  };

  productStore.set(newProduct.productId, newProduct);
  return newProduct;
}

function getAllProducts() {
  return Array.from(productStore.values());
}

function updateProductMetadata(productId, metadata) {
  const product = productStore.get(productId);
  if (!product) return null;

  product.metadata = { ...product.metadata, ...metadata };
  return product;
}

module.exports = {
  addProduct,
  getAllProducts,
  updateProductMetadata
};
