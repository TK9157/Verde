// Demo product data — Men's Fashion focused
export const demoProducts = [
  {
    id: '1', name: 'Washed Semi Fit Jean', slug: 'washed-semi-fit-jean',
    description: 'Premium washed denim with a relaxed semi-fit cut. Comfortable stretch fabric designed for everyday street style.',
    price: 1499, compare_price: 2499, category_id: 'oversized-jeans', category_name: 'Oversized Jeans',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop'],
    sizes: ['28', '30', '32', '34', '36'], colors: ['Light Wash', 'Dark Wash', 'Black'],
    tags: ['new', 'bestseller'], is_featured: true, is_active: true, stock_quantity: 50, rating: 4.5
  },
  {
    id: '2', name: 'High Rise Washed Jean', slug: 'high-rise-washed-jean',
    description: 'High-rise oversized jeans with vintage washed finish. Relaxed through the thigh with a straight leg.',
    price: 1499, compare_price: 2199, category_id: 'oversized-jeans', category_name: 'Oversized Jeans',
    images: ['https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&h=800&fit=crop'],
    sizes: ['28', '30', '32', '34'], colors: ['Blue Wash', 'Grey'],
    tags: ['bestseller'], is_featured: true, is_active: true, stock_quantity: 80, rating: 4.8
  },
  {
    id: '3', name: 'Metal Rivet OV Jean', slug: 'metal-rivet-ov-jean',
    description: 'Statement oversized jeans with metal rivet detailing. Heavy-duty denim with a bold, edgy aesthetic.',
    price: 2599, compare_price: 3999, category_id: 'oversized-jeans', category_name: 'Oversized Jeans',
    images: ['https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&h=800&fit=crop'],
    sizes: ['28', '30', '32', '34', '36'], colors: ['Indigo', 'Black'],
    tags: ['new', 'trending'], is_featured: true, is_active: true, stock_quantity: 35, rating: 4.7
  },
  {
    id: '4', name: 'Oversized Drop Shoulder Shirt', slug: 'oversized-drop-shoulder-shirt',
    description: 'Relaxed oversized shirt with dropped shoulders. Premium cotton with a boxy, contemporary silhouette.',
    price: 1299, compare_price: 1999, category_id: 'oversized-shirts', category_name: 'Oversized Shirts',
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'], colors: ['White', 'Black', 'Cream'],
    tags: ['bestseller'], is_featured: true, is_active: true, stock_quantity: 120, rating: 4.6
  },
  {
    id: '5', name: 'Graphic Oversized Tee', slug: 'graphic-oversized-tee',
    description: 'Bold graphic print on heavyweight oversized cotton tee. Street-ready design with premium quality fabric.',
    price: 999, compare_price: 1599, category_id: 'oversized-tshirts', category_name: 'Oversized T-Shirts',
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'White', 'Navy'],
    tags: ['new', 'trending'], is_featured: true, is_active: true, stock_quantity: 200, rating: 4.9
  },
  {
    id: '6', name: 'Scratched Slim Fit Jean', slug: 'scratched-slim-fit-jean',
    description: 'Slim-fit jeans with artisan scratched detailing. Stretch denim for comfort with a modern tapered cut.',
    price: 1799, compare_price: 2799, category_id: 'regular-jeans', category_name: 'Regular Jeans',
    images: ['https://images.unsplash.com/photo-1475178626620-a4d074967571?w=600&h=800&fit=crop'],
    sizes: ['28', '30', '32', '34', '36'], colors: ['Medium Blue', 'Black', 'Dark Wash'],
    tags: ['bestseller'], is_featured: true, is_active: true, stock_quantity: 65, rating: 4.5
  },
  {
    id: '7', name: 'Classic Fit Cotton Shirt', slug: 'classic-fit-cotton-shirt',
    description: 'Timeless regular-fit cotton shirt. Perfect for both casual outings and semi-formal occasions.',
    price: 1099, compare_price: 1799, category_id: 'regular-shirts', category_name: 'Regular Shirts',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'], colors: ['White', 'Light Blue', 'Black'],
    tags: ['new'], is_featured: false, is_active: true, stock_quantity: 90, rating: 4.4
  },
  {
    id: '8', name: 'Heavyweight Crew Tee', slug: 'heavyweight-crew-tee',
    description: '280 GSM heavyweight cotton crew neck t-shirt. Premium quality fabric with a structured, boxy fit.',
    price: 799, compare_price: 1299, category_id: 'regular-tshirts', category_name: 'Regular T-Shirts',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'White', 'Grey', 'Olive'],
    tags: ['bestseller'], is_featured: false, is_active: true, stock_quantity: 150, rating: 4.7
  },
  {
    id: '9', name: 'Carpenter Oversized Jean', slug: 'carpenter-oversized-jean',
    description: 'Utility-inspired carpenter jeans with oversized fit. Multiple tool pockets and reinforced stitching.',
    price: 1999, compare_price: 3199, category_id: 'regular-jeans', category_name: 'Regular Jeans',
    images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop'],
    sizes: ['28', '30', '32', '34', '36'], colors: ['Khaki', 'Black', 'Blue'],
    tags: ['trending'], is_featured: false, is_active: true, stock_quantity: 40, rating: 4.6
  },
  {
    id: '10', name: 'Derby Leather Shoe', slug: 'derby-leather-shoe',
    description: 'Classic derby shoes in genuine leather. Handcrafted with a cushioned insole for all-day comfort.',
    price: 3499, compare_price: 4999, category_id: 'shoes', category_name: 'Shoes',
    images: ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=800&fit=crop'],
    sizes: ['7', '8', '9', '10', '11'], colors: ['Black', 'Brown', 'Tan'],
    tags: ['new', 'premium'], is_featured: false, is_active: true, stock_quantity: 25, rating: 4.8
  },
  {
    id: '11', name: 'Pleated Wide Denim', slug: 'pleated-wide-denim',
    description: 'Wide-leg denim with pleated front detailing. A fashion-forward take on classic workwear.',
    price: 2599, compare_price: 3999, category_id: 'oversized-jeans', category_name: 'Oversized Jeans',
    images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop'],
    sizes: ['28', '30', '32', '34'], colors: ['Light Blue', 'Black'],
    tags: ['trending'], is_featured: false, is_active: true, stock_quantity: 30, rating: 4.5
  },
  {
    id: '12', name: 'Long Sleeve Oversized Tee', slug: 'long-sleeve-oversized-tee',
    description: 'Oversized long-sleeve t-shirt in premium jersey cotton. Relaxed fit with ribbed cuffs.',
    price: 1199, compare_price: 1799, category_id: 'oversized-tshirts', category_name: 'Oversized T-Shirts',
    images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Charcoal'],
    tags: ['new', 'bestseller'], is_featured: false, is_active: true, stock_quantity: 70, rating: 4.6
  }
];

export const demoCategories = [
  { id: 'oversized-jeans', name: 'Oversized Jeans', slug: 'oversized-jeans', description: 'Bold oversized denim', image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop', is_active: true },
  { id: 'oversized-shirts', name: 'Oversized Shirts', slug: 'oversized-shirts', description: 'Drop shoulder shirts', image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=400&fit=crop', is_active: true },
  { id: 'oversized-tshirts', name: 'Oversized T-Shirts', slug: 'oversized-tshirts', description: 'Streetwear essentials', image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=400&fit=crop', is_active: true },
  { id: 'regular-jeans', name: 'Regular Jeans', slug: 'regular-jeans', description: 'Classic fit denim', image_url: 'https://images.unsplash.com/photo-1475178626620-a4d074967571?w=600&h=400&fit=crop', is_active: true },
  { id: 'regular-shirts', name: 'Regular Shirts', slug: 'regular-shirts', description: 'Everyday shirts', image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=400&fit=crop', is_active: true },
  { id: 'regular-tshirts', name: 'Regular T-Shirts', slug: 'regular-tshirts', description: 'Premium basics', image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop', is_active: true },
  { id: 'shoes', name: 'Shoes', slug: 'shoes', description: 'Footwear collection', image_url: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=400&fit=crop', is_active: true },
];

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function getDiscount(price, comparePrice) {
  if (!comparePrice || comparePrice <= price) return 0;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}
