const productService = require("../services/product.service");
const fs = require("fs");
const path = require("path");
const getProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) { next(err); }
};

const getProduct = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    } catch (err) { next(err); }
};

const createProduct = async (req, res, next) => {
    try {
        const image = req.file ? `/uploads/products/${req.file.filename}` : null;

        const product = await productService.createProduct({
            ...req.body,
            price: Number(req.body.price),
            image,
        });

        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const data = {
            ...req.body,
            price: Number(req.body.price),
        };

        const product = await productService.getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Produit introuvable" });
        }

        // Si une nouvelle image est uploadée, supprimer l’ancienne
        if (req.file) {
            if (product.image) {
                const oldImagePath = path.join(__dirname, "..", "..", product.image);
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.warn("Impossible de supprimer l'ancienne image :", err.message);
                });
            }
            data.image = `/uploads/products/${req.file.filename}`;
        }

        const updatedProduct = await productService.updateProduct(req.params.id, data);
        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
};



const deleteProduct = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Produit introuvable" });
        }

        // Supprimer l'image si elle existe
        if (product.image) {
            const imagePath = path.join(__dirname, "..", "..", product.image);
            fs.unlink(imagePath, (err) => {
                if (err) console.warn("Impossible de supprimer l'image :", err.message);
            });
        }

        await productService.deleteProduct(req.params.id);
        res.json({ message: "Produit supprimé" });
    } catch (err) {
        next(err);
    }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
