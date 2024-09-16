import Product from "../models/productModel.js";

// create product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body;

        const product = new Product({
            name,
            description,
            price,
            categoryId,
        });
        await product.save();

        return res.status(201).json({
            message: "product created successfully!",
            payload: product
        })


    } catch (error) {
        res.status(500).json({ message: "problem creating product!", error: error.message })
        console.log(error)
    }
}

// edit product
export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, categoryId } = req.body;

        const product = await Product.findById(id);

        if (!product) return res.status(404).send("Product does not exist");


        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            categoryId,
        }, { new: true });

        return res.status(200).json({
            message: "product updated successfully!",
            payload: updatedProduct
        })


    } catch (error) {
        res.status(500).json({ message: "problem updating product!", error: error.message })
        console.log(error)
    }
}

// delete product 
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).send("Product does not exist");

        await Product.findByIdAndDelete(id);
        return res.status(200).json({
            message: "product deleted successfully",
            payload: product
        })
    } catch (error) {
        res.status(500).json({ message: "problem deleting product!", error: error.message })
        console.log(error)
    }
}

// get all
export const getAllProducts = async (req, res) => {
    try {
        const { categoryId } = req.body;
        let products;

        if (!categoryId || categoryId === "") products = await Product.find({}).populate("categoryId");
        else products = await Product.find({ categoryId }).populate("categoryId");

        return res.status(200).json({
            message: "products found successfully",
            payload: products
        });

    } catch (error) {
        res.status(500).json({ message: "problem fetching products!", error: error.message })
        console.log(error)
    }
}
