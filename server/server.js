import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

import { Product } from "./models/Product.js";
import { Testimonial } from "./models/Testimonial.js";
import { Enquiry } from "./models/Enquiry.js";
import { Admin } from "./models/Admin.js";
import { defaultProducts, defaultTestimonials } from "./seedData.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "bhuwank301",
  api_key: process.env.CLOUDINARY_API_KEY || "311523599517938",
  api_secret: process.env.CLOUDINARY_API_SECRET || "kXDBvxP3Pjp6RJRPXQXblgDZ_xU"
});

// Multer Storage Configuration (In-Memory for direct Cloudinary streaming)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Disable buffering so queries fail fast if DB is disconnected
mongoose.set("bufferCommands", false);

// MongoDB Connection and Seeding with timeout
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000 // 5 seconds timeout
})
  .then(async () => {
    console.log("Connected to MongoDB Atlas successfully");
    
    // Auto-seed Products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log("No products found in DB. Seeding default products...");
      await Product.insertMany(defaultProducts);
      console.log("Default products seeded successfully.");
    }
    
    // Auto-seed Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      console.log("No testimonials found in DB. Seeding default testimonials...");
      await Testimonial.insertMany(defaultTestimonials);
      console.log("Default testimonials seeded successfully.");
    }

    // Auto-seed Admin User
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log("No admin users found in DB. Seeding default admin...");
      const hashedPassword = await bcrypt.hash("puredrop123", 10);
      const defaultAdmin = new Admin({
        username: "admin",
        password: hashedPassword
      });
      await defaultAdmin.save();
      console.log("Default admin seeded successfully.");
    }
  })
  .catch(err => {
    console.error("MongoDB Connection Error:", err);
  });

// JWT authentication middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET || "puredrop-super-secret-jwt-key-2026", (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized: Missing token" });
  }
};

// Database connectivity middleware for API routes
app.use("/api", (req, res, next) => {
  if (req.path !== "/upload" && req.path !== "/auth/login" && mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: "Database connection not ready. Check if your current IP is whitelisted on MongoDB Atlas."
    });
  }
  next();
});

// API Routes

// Admin Authentication Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || "puredrop-super-secret-jwt-key-2026",
      { expiresIn: "7d" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Image Upload Endpoint (Buffered Upload to Cloudinary)
app.post("/api/upload", authenticateJWT, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    // Stream memory buffer to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "puredrop" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res.status(500).json({ message: "Cloudinary upload failed", error: error.message });
        }
        res.status(200).json({ imageUrl: result.secure_url });
      }
    );
    uploadStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error: error.message });
  }
});

// Products Routes
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

app.get("/api/products/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
});

app.post("/api/products", authenticateJWT, async (req, res) => {
  try {
    const { name, category, shortDescription, description, image, features, specifications, idealFor, technology, benefits } = req.body;
    
    // Auto-generate slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    // Get category slug
    const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    const newProduct = new Product({
      name,
      slug,
      category,
      categorySlug,
      shortDescription,
      description,
      image: image || "/placeholder.svg",
      features: features || [],
      specifications: specifications || [],
      idealFor: idealFor || [],
      technology: technology || [],
      benefits: benefits || []
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
});

app.put("/api/products/:id", authenticateJWT, async (req, res) => {
  try {
    const { name, category, shortDescription, description, image, features, specifications, idealFor, technology, benefits } = req.body;
    
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug,
        category,
        categorySlug,
        shortDescription,
        description,
        image,
        features,
        specifications,
        idealFor,
        technology,
        benefits
      },
      { new: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
});

app.delete("/api/products/:id", authenticateJWT, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
});

// Testimonials Routes
app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching testimonials", error: error.message });
  }
});

// Enquiry Routes
app.get("/api/enquiries", authenticateJWT, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiries", error: error.message });
  }
});

app.post("/api/enquiries", async (req, res) => {
  try {
    const { name, phone, city, email, message, productSlug } = req.body;
    const newEnquiry = new Enquiry({ name, phone, city, email, message, productSlug });
    await newEnquiry.save();
    res.status(201).json(newEnquiry);
  } catch (error) {
    res.status(500).json({ message: "Error submitting enquiry", error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
