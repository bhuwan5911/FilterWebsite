import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  type: { type: String, required: true, enum: ["home", "office", "school", "hospital"] },
  avatar: { type: String }
}, { timestamps: true });

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
