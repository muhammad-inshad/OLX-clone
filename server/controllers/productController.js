import Product from '../models/product.js'

export const addProduct=async (req, res) => {
  try {
    const { title, category, price,UserId} = req.body;
  console.log("hiiiiiiiii:",UserId)

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = new Product({
      title,
      category,
      price,
      image: {
        data: req.file.buffer,         
        contentType: req.file.mimetype
      },
      userId: UserId
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const products=async (req,res)=>{
      try {
    const allProducts = await Product.find();

    const productsWithImage = allProducts.map((p) => {
      let imageUrl = null;
      if (p.image && p.image.data) {
        imageUrl = `data:${p.image.contentType};base64,${p.image.data.toString("base64")}`;
      }
      return {
  _id: p._id,
  title: p.title,
  category: p.category,
  price: p.price,
  imageUrl,
  userId: p.userId
};

    });

    res.json(productsWithImage);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
}
export const getproducts = async (req, res) => {
  try {
    const { id } = req.params;

  
    const product = await Product.findById(id).populate("userId", "name email");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imageUrl = null;
    if (product.image && product.image.data) {
      imageUrl = `data:${product.image.contentType};base64,${product.image.data.toString("base64")}`;
    }

    res.json({
      _id: product._id,
      title: product.title,
      category: product.category,
      price: product.price,
      description: product.description,
      imageUrl,
      user: product.userId ? {
        _id: product.userId._id,
        name: product.userId.name,
        email: product.userId.email,
      } : null,
    });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: err.message });
  }
};


export const Delete=async (req,res)=>{
    try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
}

export const Edit = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; 

    console.log("Editing Product:", id, updateData);

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

   
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};
