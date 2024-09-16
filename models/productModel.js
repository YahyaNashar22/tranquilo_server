import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
})

const Product = model("Product", productSchema);
export default Product;