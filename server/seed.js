const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

// Sample products data
const sampleProducts = [
  {
    name: "Apple AirPods Pro (2nd Generation)",
    description: "Active Noise Cancellation, Transparency mode, Personalized Spatial Audio, Adaptive EQ, Sweat and water resistant, MagSafe charging case",
    price: 249.99,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400"],
    stock: 50,
    rating: 4.8,
    numReviews: 2500
  },
  {
    name: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise cancellation, exceptional sound quality, up to 30 hours battery life, quick charging, superior call quality",
    price: 399.99,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400"],
    stock: 30,
    rating: 4.9,
    numReviews: 1800
  },
  {
    name: "Nike Air Max 270 Running Shoes",
    description: "Lightweight running shoes with Max Air cushioning, breathable mesh upper, padded collar, durable rubber sole",
    price: 149.99,
    category: "Clothing",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"],
    stock: 100,
    rating: 4.6,
    numReviews: 3200
  },
  {
    name: "The Midnight Library by Matt Haig",
    description: "A captivating novel about regrets, choices, and the infinite possibilities of life. International bestseller with over 1 million copies sold.",
    price: 18.99,
    category: "Books",
    images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"],
    stock: 200,
    rating: 4.7,
    numReviews: 890
  },
  {
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    description: "7-in-1 functionality: Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer",
    price: 89.99,
    category: "Home",
    images: ["https://images.unsplash.com/photo-1585515320310-2591499d5d5e?w=400"],
    stock: 75,
    rating: 4.8,
    numReviews: 4500
  },
  {
    name: "Dyson V15 Detect Cordless Vacuum",
    description: "Intelligent laser illumination, Piezo sensor measures dust, advanced filtration, up to 60 minutes runtime",
    price: 699.99,
    category: "Home",
    images: ["https://images.unsplash.com/photo-1605972593530-6374c7a4e66a?w=400"],
    stock: 25,
    rating: 4.7,
    numReviews: 1200
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/amazon_clone');
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert new products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);
    
    // Check if admin exists, if not create one
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created (email: admin@example.com, password: admin123)');
    }
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();