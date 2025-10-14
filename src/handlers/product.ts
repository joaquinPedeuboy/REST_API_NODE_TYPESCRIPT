import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req : Request, res : Response) => {

    try {
        const products = await Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            limit: 2,
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}

export const getProductsById = async (req : Request, res : Response) => {

    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (req : Request, res : Response)=> {
    
    try {
        // 1er FORMA
        const product = await Product.create(req.body)
        res.json({data: product})
    } catch (error) {
        console.log(error)
    }

    // 2da FORMA
    //try {
        // const product = new Product(req.body)
        // const savedProduct = await product.save()

        // res.json({data: savedProduct})
    //} catch (error) {
    //    console.log(error)
    //}


}