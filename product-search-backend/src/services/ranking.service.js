function rankProducts(products, query) {
    const isCheapIntent =
      query.includes('sasta') || query.includes('cheap');
  
    return products
      .map(product => {
        let score = 0;
  
        // Text relevance
        if (product.title.toLowerCase().includes('iphone')) {
          score += 0.4;
        }
  
        // Rating
        if (product.rating) {
          score += (product.rating / 5) * 0.2;
        }
  
        // Cheap intent boost
        if (isCheapIntent) {
          score += (1 - product.price / 100000) * 0.2;
        }
  
        // Stock boost
        if (product.stock > 0) {
          score += 0.2;
        }
  
        return { ...product, score };
      })
      .sort((a, b) => b.score - a.score);
  }
  
  module.exports = { rankProducts };
  