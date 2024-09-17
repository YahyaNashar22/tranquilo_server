import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorySchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    order: {
        type: Number,
        default: 0,
    },
})

const Category = model('Category', categorySchema);
export default Category;