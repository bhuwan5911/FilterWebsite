import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String },
  message: { type: String },
  productSlug: { type: String }
}, { timestamps: true });

export const Enquiry = mongoose.model("Enquiry", enquirySchema);
