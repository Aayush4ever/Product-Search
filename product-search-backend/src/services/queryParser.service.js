function normalizeQuery(query) {
    return query
      .toLowerCase()
      .replace('ifone', 'iphone')
      .replace('iphne', 'iphone');
  }
  
  function extractPrice(query) {
    const match = query.match(/(\d+)\s?k?/);
    if (!match) return null;
  
    let price = Number(match[1]);
    if (query.includes('k')) price *= 1000;
  
    return price;
  }
  
  function extractColor(query) {
    const colors = ['red', 'black', 'blue', 'white'];
    return colors.find(c => query.includes(c)) || null;
  }
  
  module.exports = {
    normalizeQuery,
    extractPrice,
    extractColor
  };
  