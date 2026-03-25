import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    description:
      "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
  },
  {
    name: "Classic Leather Backpack",
    slug: "classic-leather-backpack",
    description:
      "Handcrafted genuine leather backpack with multiple compartments, padded laptop sleeve, and adjustable straps. Stylish and durable for everyday use.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "Fashion",
  },
  {
    name: "Stainless Steel Water Bottle",
    slug: "stainless-steel-water-bottle",
    description:
      "Double-walled vacuum insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    category: "Home",
  },
  {
    name: "Mechanical Gaming Keyboard",
    slug: "mechanical-keyboard",
    description: "RGB backlit mechanical keyboard with Cherry MX switches, programmable macro keys, and solid aluminum frame for durability.",
    price: 8299.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Organic Cotton T-Shirt",
    slug: "organic-cotton-tshirt",
    description: "Super soft 100% organic cotton crew-neck t-shirt. Ethically made, pre-shrunk, and available in a range of earth-tone colors.",
    price: 1599.00,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Smart Fitness Watch",
    slug: "smart-fitness-watch",
    description: "Track your heart rate, steps, sleep, and workouts with this sleek fitness watch. Features a vibrant AMOLED display and 10-day battery life.",
    price: 10999.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Ceramic Pour-Over Coffee Set",
    slug: "ceramic-coffee-set",
    description: "Artisan ceramic pour-over dripper with matching mug and reusable stainless steel filter. Perfect for the ultimate home brewing experience.",
    price: 2499.00,
    category: "Home",
    image: "https://images.unsplash.com/photo-1544787210-2211d7c3bc3b?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Minimalist Desk Lamp",
    slug: "minimalist-desk-lamp",
    description: "Adjustable LED desk lamp with touch dimming, USB charging port, and a modern matte finish. Provides flicker-free lighting for work or study.",
    price: 3299.00,
    category: "Home",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    await Product.deleteMany({});
    console.log("Cleared existing products.");

    await Product.insertMany(products);
    console.log("Database seeded with PHP pricing!");

    await mongoose.disconnect();
    console.log("Done. Disconnected from MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedDB();
