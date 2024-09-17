import express from "express";
import { createProduct, deleteProduct, editProduct, getAllProducts, productsThanos, } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post('/create', createProduct);

productRouter.post('/get', getAllProducts);

productRouter.put('/edit/:id', editProduct);

productRouter.delete('/delete/:id', deleteProduct);

productRouter.delete('/thanos', productsThanos);


export default productRouter;