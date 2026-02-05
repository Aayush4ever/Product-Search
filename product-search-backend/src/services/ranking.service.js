function rankProducts(products, query) {
    const cheapIntent = query.includes('sasta') || query.includes('cheap');
  
    return products
      .map(p => {
        let score = 0;
  
        if (p.title.toLowerCase().includes('iphone')) score += 0.4;
        if (p.rating) score += (p.rating / 5) * 0.2;
        if (cheapIntent) score += (1 - p.price / 100000) * 0.2;
        if (p.stock > 0) score += 0.2;
  
        return { ...p._doc, score };
      })
      .sort((a, b) => b.score - a.score);
  }
  
  module.exports = { rankProducts };
  