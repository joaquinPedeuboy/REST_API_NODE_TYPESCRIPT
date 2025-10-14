import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, getProducts, getProductsById } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

// Routing
router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductsById
)

router.post('/', 

    // VALIDACION
    body('name')
        .notEmpty().withMessage('El nombre de producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio de producto no puede ir vacio')
        .custom( value => value > 0).withMessage('El precio de producto no puede ser menor que 0'),
    handleInputErrors,
    createProduct
)

router.put('/', (req, res)=> {
    res.json('Desde Put')
})

router.patch('/', (req, res)=> {
    res.json('Desde Patch')
})

router.delete('/', (req, res)=> {
    res.json('Desde Delete')
})

export default router