const Category = require("../models/Category");

// Create Category
const createCategory = async (req, res) => {

    try {

        const category = await Category.create({
            name: req.body.name
        });

        res.status(201).json(category);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get All Categories
const getCategories = async (req, res) => {

    try {

        const categories = await Category.find();

        res.status(200).json(categories);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Category
const deleteCategory = async (req, res) => {

    try {

        const category =
        await Category.findByIdAndDelete(
            req.params.id
        );

        if (!category) {

            return res.status(404).json({
                message: "Category not found"
            });

        }

        res.status(200).json({
            message: "Category deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    createCategory,
    getCategories,
    deleteCategory

};