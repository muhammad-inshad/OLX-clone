import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
      data: Buffer,
      contentType: String
    },
    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User", 
  required: true,
}

  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
