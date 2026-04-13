// Demo product data — will be replaced with Supabase data when connected
export const demoProducts = [
  {
    id: '1', name: 'Classic Linen Shirt', slug: 'classic-linen-shirt',
    description: 'A timeless linen shirt crafted from premium European linen. Perfect for warm days and effortless style.',
    price: 2499, compare_price: 3999, category_id: 'men', category_name: 'Men',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'], colors: ['White', 'Sage', 'Charcoal'],
    tags: ['new', 'bestseller'], is_featured: true, is_active: true, stock_quantity: 50, rating: 4.5
  },
  {
    id: '2', name: 'Organic Cotton Tee', slug: 'organic-cotton-tee',
    description: 'Soft organic cotton t-shirt with a relaxed fit. Sustainably produced and incredibly comfortable.',
    price: 1299, compare_price: 1799, category_id: 'men', category_name: 'Men',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'White', 'Forest Green'],
    tags: ['bestseller'], is_featured: true, is_active: true, stock_quantity: 120, rating: 4.8
  },
  {
    id: '3', name: 'Floral Summer Dress', slug: 'floral-summer-dress',
    description: 'A beautiful floral midi dress in a flowing silhouette. Made from lightweight recycled polyester.',
    price: 3299, compare_price: 4999, category_id: 'women', category_name: 'Women',
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L'], colors: ['Green Floral', 'Blue Floral'],
    tags: ['new', 'trending'], is_featured: true, is_active: true, stock_quantity: 35, rating: 4.7
  },
  {
    id: '4', name: 'Tailored Wool Blazer', slug: 'tailored-wool-blazer',
    description: 'Expertly tailored blazer in premium Italian wool blend. A modern power piece for any occasion.',
    price: 7999, compare_price: 11999, category_id: 'men', category_name: 'Men',
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Navy', 'Forest'],
    tags: ['premium'], is_featured: true, is_active: true, stock_quantity: 20, rating: 4.9
  },
  {
    id: '5', name: 'High-Waist Palazzo Pants', slug: 'high-waist-palazzo-pants',
    description: 'Elegant palazzo pants with a flattering high-waist cut. Flowy, comfortable, and endlessly chic.',
    price: 2799, compare_price: 3999, category_id: 'women', category_name: 'Women',
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black', 'Cream', 'Olive'],
    tags: ['bestseller'], is_featured: true, is_active: true, stock_quantity: 65, rating: 4.6
  },
  {
    id: '6', name: 'Minimalist Leather Watch', slug: 'minimalist-leather-watch',
    description: 'A sleek leather strap watch with a clean dial design. Hand-stitched Italian leather band.',
    price: 4999, compare_price: 6999, category_id: 'accessories', category_name: 'Accessories',
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop'],
    sizes: ['One Size'], colors: ['Black', 'Brown', 'Green'],
    tags: ['new', 'premium'], is_featured: true, is_active: true, stock_quantity: 15, rating: 4.9
  },
  {
    id: '7', name: 'Cashmere Crew Sweater', slug: 'cashmere-crew-sweater',
    description: 'Luxuriously soft cashmere sweater with a classic crew neck. Perfect for layering.',
    price: 5499, compare_price: 7999, category_id: 'women', category_name: 'Women',
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L'], colors: ['Cream', 'Black', 'Sage'],
    tags: ['premium', 'trending'], is_featured: false, is_active: true, stock_quantity: 28, rating: 4.8
  },
  {
    id: '8', name: 'Canvas Tote Bag', slug: 'canvas-tote-bag',
    description: 'Durable canvas tote with leather details. Spacious interior with secure zip pocket.',
    price: 1999, compare_price: 2999, category_id: 'accessories', category_name: 'Accessories',
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=800&fit=crop'],
    sizes: ['One Size'], colors: ['Natural', 'Black', 'Green'],
    tags: ['bestseller'], is_featured: false, is_active: true, stock_quantity: 80, rating: 4.4
  },
  {
    id: '9', name: 'Slim Fit Chinos', slug: 'slim-fit-chinos',
    description: 'Modern slim-fit chinos in premium stretch cotton. Versatile style from office to weekend.',
    price: 2199, compare_price: 3499, category_id: 'men', category_name: 'Men',
    images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop'],
    sizes: ['28', '30', '32', '34', '36'], colors: ['Khaki', 'Black', 'Olive'],
    tags: ['bestseller'], is_featured: false, is_active: true, stock_quantity: 90, rating: 4.5
  },
  {
    id: '10', name: 'Silk Wrap Blouse', slug: 'silk-wrap-blouse',
    description: 'Elegant silk wrap blouse with a flattering draped neckline. Pure mulberry silk.',
    price: 3999, compare_price: 5999, category_id: 'women', category_name: 'Women',
    images: ['https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&h=800&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L'], colors: ['Emerald', 'Black', 'Ivory'],
    tags: ['new', 'premium'], is_featured: false, is_active: true, stock_quantity: 22, rating: 4.7
  },
  {
    id: '11', name: 'Denim Jacket', slug: 'denim-jacket',
    description: 'Classic denim jacket with a modern relaxed fit. Garment-washed for a vintage look.',
    price: 3499, compare_price: 4999, category_id: 'men', category_name: 'Men',
    images: ['https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Medium Wash', 'Dark Wash', 'Black'],
    tags: ['trending'], is_featured: false, is_active: true, stock_quantity: 40, rating: 4.6
  },
  {
    id: '12', name: 'Leather Belt', slug: 'leather-belt',
    description: 'Handcrafted full-grain leather belt with brushed metal buckle. Built to last a lifetime.',
    price: 1499, compare_price: 1999, category_id: 'accessories', category_name: 'Accessories',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Brown', 'Green'],
    tags: ['bestseller'], is_featured: false, is_active: true, stock_quantity: 100, rating: 4.3
  }
];

export const demoCategories = [
  { id: 'men', name: "Men's", slug: 'men', description: 'Tailored for the modern man', image_url: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&h=400&fit=crop', is_active: true },
  { id: 'women', name: "Women's", slug: 'women', description: 'Effortless elegance', image_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=400&fit=crop', is_active: true },
  { id: 'accessories', name: 'Accessories', slug: 'accessories', description: 'The finishing touch', image_url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop', is_active: true },
];

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function getDiscount(price, comparePrice) {
  if (!comparePrice || comparePrice <= price) return 0;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}
