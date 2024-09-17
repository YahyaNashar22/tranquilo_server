import Category from "../models/categoryModel.js";
import removeImage from "../utils/removeImage.js";

// create category
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file?.filename;

        const category = new Category({
            name,
            image
        });
        await category.save();

        return res.status(201).json({
            message: "category created successfully",
            payload: category
        })
    } catch (error) {
        res.status(500).json({ message: "problem creating category!", error: error.message })
        console.log(error)
    }
}

// edit category
export const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const image = req.file?.filename;

        const foundCategory = await Category.findById(id);

        if (!foundCategory) return res.status(404).send('category does not exist!');

        if (image && foundCategory.image) removeImage(foundCategory.image);

        const category = await Category.findByIdAndUpdate(id, { name, image }, { new: true })

        return res.status(200).json({
            message: "category edited successfully",
            payload: category
        })
    } catch (error) {
        res.status(500).json({ message: "problem editing category!", error: error.message })
        console.log(error)
    }
}

// delete category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const foundCategory = await Category.findById(id);
        if (!foundCategory) return res.status(404).send('category does not exist!');
        if (foundCategory.image) removeImage(foundCategory.image);

        const category = await Category.findByIdAndDelete(id)

        return res.status(200).json({
            message: "category deleted successfully",
            payload: category
        })
    } catch (error) {
        res.status(500).json({ message: "problem deleting category!", error: error.message })
        console.log(error)
    }
}

// get one category
export const getOneCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id)

        return res.status(200).json({
            message: "category fetched successfully",
            payload: category
        })
    } catch (error) {
        res.status(500).json({ message: "problem fetching category!", error: error.message })
        console.log(error)
    }
}

// get all categories
export const getAllCategories = async (req, res) => {
    try {

        const categories = await Category.find()

        return res.status(200).json({
            message: "categories fetched successfully",
            payload: categories
        })
    } catch (error) {
        res.status(500).json({ message: "problem fetching categories!", error: error.message })
        console.log(error)
    }
}

export const updateOrder = async (req, res) => {
    try {
      const { categories } = req.body; // Expecting an array of { id, order }
      const updatePromises = categories.map(category => 
        Category.findByIdAndUpdate(category.id, { order: category.order })
      );
      await Promise.all(updatePromises);
      res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Problem updating order!", error: error.message });
      console.log(error);
    }
  };