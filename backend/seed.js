/**
 * Seed Script — Like N Like
 * Creates admin user + sample products for all categories
 * Run: node seed.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Create Admin User
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@likenlike.com',
      password: 'Admin@123',
      role: 'admin',
      phone: '9999999999'
    });
    console.log('👤 Admin created: admin@likenlike.com / Admin@123');

    // Create Test User
    await User.create({
      name: 'Rakesh Kumar',
      email: 'user@likenlike.com',
      password: 'User@123',
      role: 'user',
      phone: '8888888888'
    });
    console.log('👤 Test user created: user@likenlike.com / User@123');

    // Sample Products
    const products = [
      // MEN
      {
        name: 'Classic White Oxford Shirt',
        description: 'Premium cotton Oxford shirt, perfect for formal and casual occasions. Breathable and comfortable all day long.',
        price: 799,
        mrp: 1299,
        category: 'men',
        subcategory: 'Shirts',
        images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Blue', 'Grey'],
        sku: 'MEN-SHIRT-001',
        inStock: true,
        stock: 50,
        isFeatured: true,
        addedBy: admin._id
      },
      {
        name: 'Slim Fit Chino Pants',
        description: 'Versatile slim fit chinos in premium stretch fabric. Great for office and weekend wear.',
        price: 1199,
        mrp: 1999,
        category: 'men',
        subcategory: 'Pants',
        images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80'],
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Beige', 'Navy', 'Olive'],
        sku: 'MEN-PANTS-001',
        inStock: true,
        stock: 35,
        isFeatured: false,
        addedBy: admin._id
      },
      {
        name: 'Graphic Print Oversized Tee',
        description: 'Trendy oversized graphic tee made from 100% soft cotton. Street-style ready.',
        price: 499,
        mrp: 799,
        category: 'men',
        subcategory: 'T-Shirts',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Grey'],
        sku: 'MEN-TEE-001',
        inStock: true,
        stock: 80,
        isFeatured: true,
        addedBy: admin._id
      },
      {
        name: 'Denim Jacket',
        description: 'Classic denim jacket with a modern slim fit. A timeless wardrobe essential.',
        price: 1799,
        mrp: 2999,
        category: 'men',
        subcategory: 'Jackets',
        images: ['https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Blue', 'Black'],
        sku: 'MEN-JACKET-001',
        inStock: true,
        stock: 25,
        isFeatured: true,
        addedBy: admin._id
      },

      // WOMEN
      {
        name: 'Floral Wrap Dress',
        description: 'Elegant floral wrap dress in lightweight chiffon. Perfect for brunches, parties, and casual outings.',
        price: 999,
        mrp: 1799,
        category: 'women',
        subcategory: 'Dresses',
        images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Pink Floral', 'Blue Floral', 'White Floral'],
        sku: 'WOM-DRESS-001',
        inStock: true,
        stock: 40,
        isFeatured: true,
        addedBy: admin._id
      },
      {
        name: 'High-Waist Palazzo Pants',
        description: 'Comfortable high-waist palazzo pants in flowy fabric. Chic and versatile for any occasion.',
        price: 749,
        mrp: 1299,
        category: 'women',
        subcategory: 'Pants',
        images: ['https://images.unsplash.com/photo-1594938298603-c8148c4b5d2b?w=600&q=80'],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Black', 'Beige', 'Navy'],
        sku: 'WOM-PANTS-001',
        inStock: true,
        stock: 30,
        isFeatured: false,
        addedBy: admin._id
      },
      {
        name: 'Embroidered Ethnic Kurti',
        description: 'Beautiful hand-embroidered kurti in soft cotton fabric. Perfect for festive and daily wear.',
        price: 899,
        mrp: 1499,
        category: 'women',
        subcategory: 'Ethnic',
        images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Red', 'Blue', 'Green', 'Yellow'],
        sku: 'WOM-KURTI-001',
        inStock: true,
        stock: 60,
        isFeatured: true,
        addedBy: admin._id
      },
      {
        name: 'Striped Crop Top',
        description: 'Trendy striped crop top in soft jersey fabric. Pair with high-waist jeans or skirts.',
        price: 399,
        mrp: 699,
        category: 'women',
        subcategory: 'Tops',
        images: ['https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80'],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['White/Black', 'Navy/White', 'Pink/White'],
        sku: 'WOM-TOP-001',
        inStock: true,
        stock: 55,
        isFeatured: false,
        addedBy: admin._id
      },

      // KIDS
      {
        name: 'Cartoon Print T-Shirt Set',
        description: 'Fun cartoon print t-shirt set for kids. Soft, comfortable and easy to wash. Kids will love it!',
        price: 349,
        mrp: 599,
        category: 'kids',
        subcategory: 'T-Shirts',
        images: ['https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80'],
        sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y', '7-8Y'],
        colors: ['Blue', 'Red', 'Yellow'],
        sku: 'KID-TSET-001',
        inStock: true,
        stock: 100,
        isFeatured: true,
        addedBy: admin._id
      },
      {
        name: 'Denim Dungaree',
        description: 'Adorable denim dungaree for kids. Durable, comfortable and super cute. Perfect for everyday play.',
        price: 599,
        mrp: 999,
        category: 'kids',
        subcategory: 'Bottoms',
        images: ['https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80'],
        sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y'],
        colors: ['Blue', 'Light Blue'],
        sku: 'KID-DUNG-001',
        inStock: true,
        stock: 45,
        isFeatured: false,
        addedBy: admin._id
      },
      {
        name: 'Ethnic Festive Dress',
        description: 'Beautiful ethnic dress for little girls. Perfect for weddings, festivals and special occasions.',
        price: 799,
        mrp: 1299,
        category: 'kids',
        subcategory: 'Dresses',
        images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80'],
        sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y', '7-8Y', '8-9Y'],
        colors: ['Pink', 'Red', 'Yellow'],
        sku: 'KID-DRESS-001',
        inStock: true,
        stock: 30,
        isFeatured: true,
        addedBy: admin._id
      },
      {
        name: 'Boys Casual Shorts Set',
        description: 'Comfortable casual shorts and t-shirt set for boys. Great for summer and outdoor activities.',
        price: 449,
        mrp: 749,
        category: 'kids',
        subcategory: 'Sets',
        images: ['https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&q=80'],
        sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y', '7-8Y'],
        colors: ['Blue', 'Grey', 'Navy'],
        sku: 'KID-SET-001',
        inStock: true,
        stock: 70,
        isFeatured: false,
        addedBy: admin._id
      }
    ];

    await Product.insertMany(products);
    console.log(`✅ ${products.length} products seeded successfully`);
    console.log('\n🎉 Seed complete! You can now run the backend.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedData();
