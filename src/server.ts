import express from 'express'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import router from './router'
import db from './config/db'

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.bgGreen.bold('Conexion existosa a la db'))
    } catch (error) {
        // console.log(error)
        console.log(colors.bgRed.bold('Hubo un error a la conexion a la BD'))
    }
}
connectDB()

// Instancia de express
const server = express()

// PERMITIR CONEXIONES
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        }else {
            callback(new Error('Error de CORS'))
        }
    }
}

server.use(cors(corsOptions))

//  Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions) )

export default server