import express from "express";
import upload from "../middlewares/multer.js"
import { createCategory, deleteCategory, editCategory, getAllCategories, getOneCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post('/create', upload.single('image'), createCategory);
categoryRouter.put('/edit/:id', upload.single('image'), editCategory);
categoryRouter.delete('/delete/:id', deleteCategory);
categoryRouter.get('/get', getAllCategories);
categoryRouter.get('/get/:id', getOneCategory);

export default categoryRouter;