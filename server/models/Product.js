import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  categorySlug: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  features: [{ type: String }],
  specifications: [specificationSchema],
  idealFor: [{ type: String }],
  technology: [{ type: String }],
  benefits: [{ type: String }]
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
