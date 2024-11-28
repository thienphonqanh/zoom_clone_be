import express, { Request, Response, NextFunction } from 'express'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import { dataSource } from '~/dataSource'
import cors from 'cors'
import authRouters from './routes/auth.routes'
import userRouters from './routes/user.routes'
import roomRouters from './routes/room.routes'
const app = express()
const port = 3111

app.use(cors())
app.use(express.json())

dataSource
  .initialize()
  .then(() => {
    console.log('Kết nối DB thành công')
  })
  .catch((error) => {
    console.log(error)
  })

app.use('/auth', authRouters)
app.use('/users', userRouters)
app.use('/rooms', roomRouters)

app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Port: ${port}`)
})
