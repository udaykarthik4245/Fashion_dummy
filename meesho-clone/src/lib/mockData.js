// Mock product database. In production this would be replaced by a real DB layer.
// Image URLs use Unsplash for realistic product photos.

export const categories = [
  { id: 'women-ethnic', name: 'Women Ethnic', icon: '👗' },
  { id: 'women-western', name: 'Women Western', icon: '👚' },
  { id: 'men', name: 'Men', icon: '👕' },
  { id: 'kids', name: 'Kids', icon: '🧒' },
  { id: 'home-kitchen', name: 'Home & Kitchen', icon: '🏠' },
  { id: 'beauty-health', name: 'Beauty & Health', icon: '💄' },
  { id: 'jewellery', name: 'Jewellery', icon: '💍' },
  { id: 'bags-footwear', name: 'Bags & Footwear', icon: '👜' },
  { id: 'electronics', name: 'Electronics', icon: '📱' },
];

const img = (q, seed) =>
  `https://images.unsplash.com/photo-${seed}?w=600&auto=format&fit=crop&q=70`;

// A pool of real Unsplash photo IDs we'll cycle for demo product images.
const photoSeeds = [
  '1542291026-7eec264c27ff', // shoes
  '1515886657613-9f3515b0c78f', // bag
  '1591047139829-d91aecb6caea', // dress
  '1576566588028-4147f3842f27', // saree
  '1552374196-c4e7ffc6e126', // mens shirt
  '1542272604-787c3835535d', // jeans
  '1503602642458-232111445657', // headphones
  '1546435770-a3e426bf472b', // watch
  '1517433367423-c7e5b0f35086', // jewelry
  '1556228720-195a672e8a03', // home
  '1522335789203-aaa2f6580c64', // beauty
  '1620799140408-edc6dcb6d633', // electronics
  '1525562723836-dca67a71d5f1', // kids
  '1503342217505-b0a15ec3261c', // shoes
  '1542838132-92c53300491e', // groceries
  '1490481651871-ab68de25d43d', // saree
  '1583744946564-b52ac1c389c8', // sneakers
  '1593030761757-71fae45fa0e7', // tshirt
];

const samplePhoto = (i) => `https://images.unsplash.com/photo-${photoSeeds[i % photoSeeds.length]}?w=600&auto=format&fit=crop&q=70`;

const sellerNames = [
  'Trendy Threads', 'Urban Cart', 'Fashion Hub', 'StyleNest',
  'Desi Bazaar', 'EveryDay Mart', 'Prime Picks', 'Glow Store',
];

const productTemplates = {
  'women-ethnic': [
    { name: 'Floral Print Anarkali Kurta', mrp: 1499, price: 549 },
    { name: 'Banarasi Silk Saree with Blouse', mrp: 3999, price: 1199 },
    { name: 'Embroidered Cotton Salwar Suit', mrp: 2299, price: 799 },
    { name: 'Designer Lehenga Choli Set', mrp: 5999, price: 2199 },
    { name: 'Printed Rayon Kurti', mrp: 999, price: 349 },
  ],
  'women-western': [
    { name: 'Floral Maxi Dress', mrp: 1799, price: 699 },
    { name: 'Ribbed Crop Top & Skirt Set', mrp: 1499, price: 599 },
    { name: 'High-Waist Skinny Jeans', mrp: 1899, price: 749 },
    { name: 'Oversized Hoodie Sweatshirt', mrp: 1399, price: 549 },
  ],
  'men': [
    { name: 'Slim Fit Cotton Casual Shirt', mrp: 1299, price: 449 },
    { name: 'Solid Polo T-Shirt Pack of 3', mrp: 1799, price: 699 },
    { name: 'Slim Fit Stretchable Jeans', mrp: 2199, price: 899 },
    { name: 'Formal Blazer for Men', mrp: 4999, price: 1799 },
  ],
  'kids': [
    { name: 'Cartoon Print T-Shirt & Shorts', mrp: 999, price: 299 },
    { name: 'Frock Dress for Girls', mrp: 1299, price: 449 },
    { name: 'Boys Casual Jeans', mrp: 1199, price: 399 },
  ],
  'home-kitchen': [
    { name: 'Non-Stick Tawa with Handle', mrp: 1499, price: 549 },
    { name: '8-Piece Dinner Set Melamine', mrp: 2499, price: 899 },
    { name: 'Cotton Bedsheet King Size', mrp: 1999, price: 699 },
    { name: 'Steel Pressure Cooker 5L', mrp: 2799, price: 1199 },
  ],
  'beauty-health': [
    { name: 'Vitamin C Face Serum 30ml', mrp: 999, price: 349 },
    { name: 'Matte Liquid Lipstick Set', mrp: 1499, price: 499 },
    { name: 'Hair Growth Oil 200ml', mrp: 699, price: 249 },
  ],
  'jewellery': [
    { name: 'Kundan Choker Necklace Set', mrp: 2499, price: 799 },
    { name: 'Gold Plated Jhumka Earrings', mrp: 999, price: 249 },
    { name: 'Oxidized Silver Bangles Set', mrp: 1299, price: 399 },
  ],
  'bags-footwear': [
    { name: 'PU Leather Sling Bag', mrp: 1499, price: 549 },
    { name: 'Casual Canvas Sneakers', mrp: 1999, price: 699 },
    { name: 'Block Heel Sandals', mrp: 1299, price: 499 },
  ],
  'electronics': [
    { name: 'Wireless Bluetooth Earbuds', mrp: 2999, price: 999 },
    { name: 'Smart Fitness Band', mrp: 1999, price: 799 },
    { name: 'Type-C Fast Charging Cable', mrp: 499, price: 149 },
    { name: 'Portable Bluetooth Speaker', mrp: 2499, price: 899 },
  ],
};

function buildProducts() {
  let id = 1;
  const all = [];
  Object.entries(productTemplates).forEach(([catId, items]) => {
    items.forEach((tpl, i) => {
      // Generate a few color/size variants per template
      for (let v = 0; v < 3; v++) {
        const photoIdx = id;
        const variantSuffix = ['', ' (Pack of 2)', ' Premium'][v];
        all.push({
          id: String(id),
          name: tpl.name + variantSuffix,
          category: catId,
          price: tpl.price + v * 50,
          mrp: tpl.mrp + v * 80,
          rating: +(3.6 + Math.random() * 1.3).toFixed(1),
          reviewCount: Math.floor(Math.random() * 5000) + 50,
          stock: Math.floor(Math.random() * 100) + (v === 2 ? 0 : 10),
          seller: sellerNames[id % sellerNames.length],
          freeDelivery: id % 3 !== 0,
          images: [
            samplePhoto(photoIdx),
            samplePhoto(photoIdx + 5),
            samplePhoto(photoIdx + 11),
            samplePhoto(photoIdx + 17),
          ],
          colors: ['Red', 'Blue', 'Black', 'Green'].slice(0, 2 + (v % 3)),
          sizes: ['S', 'M', 'L', 'XL', 'XXL'].slice(0, 3 + (v % 3)),
          description:
            'Crafted with premium materials for everyday comfort. This product offers a perfect blend of style, durability, and value. Carefully curated for our customers and backed by 7-day easy returns.',
          specifications: {
            Material: ['Cotton', 'Polyester', 'Silk Blend', 'Rayon'][id % 4],
            Pattern: ['Solid', 'Printed', 'Embroidered', 'Floral'][id % 4],
            Occasion: ['Casual', 'Festive', 'Daily Wear', 'Party'][id % 4],
            Country: 'India',
          },
          reviews: [
            { user: 'Priya S.', rating: 5, text: 'Amazing quality at this price. Loved it!', date: '2026-04-14' },
            { user: 'Ravi K.', rating: 4, text: 'Good product, delivery was fast.', date: '2026-03-22' },
            { user: 'Anita M.', rating: 4, text: 'As described. Value for money.', date: '2026-02-10' },
          ],
          createdAt: '2026-0' + ((id % 5) + 1) + '-15',
        });
        id++;
      }
    });
  });
  return all;
}

export const products = buildProducts();

export const banners = [
  {
    id: 1,
    title: 'Mega Fashion Sale',
    subtitle: 'Up to 80% off across all categories',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&auto=format&fit=crop&q=70',
    cta: 'Shop Now',
    href: '/products?cat=women-ethnic',
  },
  {
    id: 2,
    title: 'New Electronics Drop',
    subtitle: 'Smart picks starting at ₹149',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1400&auto=format&fit=crop&q=70',
    cta: 'Explore',
    href: '/products?cat=electronics',
  },
  {
    id: 3,
    title: 'Home Makeover',
    subtitle: 'Refresh your space — minimum 50% off',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&auto=format&fit=crop&q=70',
    cta: 'Shop Home',
    href: '/products?cat=home-kitchen',
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === String(id));
}

export function getRelatedProducts(id, limit = 6) {
  const p = getProductById(id);
  if (!p) return [];
  return products
    .filter((x) => x.category === p.category && x.id !== p.id)
    .slice(0, limit);
}

export function searchSuggestions(q, limit = 6) {
  if (!q) return [];
  const ql = q.toLowerCase();
  const seen = new Set();
  const suggestions = [];
  for (const p of products) {
    const m = p.name.toLowerCase();
    if (m.includes(ql) && !seen.has(p.name)) {
      seen.add(p.name);
      suggestions.push({ id: p.id, name: p.name, category: p.category, image: p.images[0] });
      if (suggestions.length >= limit) break;
    }
  }
  return suggestions;
}
