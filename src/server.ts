import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.bgGreen.bold('Conexion existosa a la db'))
    } catch (error) {
        // console.log(error)
        console.log(colors.bgRed.bold('Hubo un error a la conexion a la BD'))
    }
}
connectDB()

// Instancia de express
const server = express()

//  Leer datos de formularios
server.use(express.json())

server.use('/api/products', router)

export default server