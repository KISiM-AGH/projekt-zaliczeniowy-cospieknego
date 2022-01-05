import { Request, Response } from 'express';
import Track from '../models/tracks.model';

// get All Products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Track.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get single Product
export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Track.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create a Product
export const saveProduct = async (req: Request, res: Response) => {
    const product = new Track(req.body);
    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a Product
export const updateProduct = async (req: Request, res: Response) => {
    const product = await Track.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'No Data Found' });
    try {
        const updatedProduct = await Track.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Product
export const deleteProduct = async (req: Request, res: Response) => {
    const product = await Track.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'No Data Found' });
    try {
        const deletedProduct = await Track.deleteOne({ _id: req.params.id });
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
