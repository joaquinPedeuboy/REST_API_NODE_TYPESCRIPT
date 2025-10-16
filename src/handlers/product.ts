import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req : Request, res : Response) => {

    const products = await Product.findAll({
        order: [
            ['price', 'DESC']
        ],
        limit: 2,
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
    res.json({data: products})
}

export const getProductsById = async (req : Request, res : Response) => {

    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    res.json({data: product})
}

export const createProduct = async (req : Request, res : Response)=> {
    
    // 1er FORMA
    const product = await Product.create(req.body)
    res.status(201).json({data: product})

    // 2da FORMA
    //try {
        // const product = new Product(req.body)
        // const savedProduct = await product.save()

        // res.json({data: savedProduct})
    //} catch (error) {
    //    console.log(error)
    //}

}

export const updateProduct = async (req : Request, res : Response)=> {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    // ACTUALIZAR
    await product.update(req.body)
    await product.save()
    res.json({data: product})
}


export const updateAvailability = async (req : Request, res : Response)=> {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }
        // MODIFICAR
        product.availability = !product.dataValues.availability
        await product.save()
        
        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (req : Request, res : Response)=> {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    
    await product.destroy()
    res.json({data: 'Producto Eliminado'})
}