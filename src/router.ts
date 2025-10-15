import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

// ROUTING

//GET
router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductsById
)

// POST CREACION
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

// PUT ACTUALIZAR, REEMPLAZA COMPLETAMENTE UN RECUERSO EXISTENTE 
router.put('/:id', 
    // VALIDACION
    param('id').isInt().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El nombre de producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio de producto no puede ir vacio')
        .custom( value => value > 0).withMessage('El precio de producto no puede ser menor que 0'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)

// PATCH MODIFICAR, REALIZAR MODIFICACIONES PARCIALES EN UN RECURSO EXISTENTE, PERMITE REALIZAR CAMBIOS ESPECIFICOS SIN AFECTAR EL RESTO DE LA INFORMACION
router.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
)

router.delete('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router