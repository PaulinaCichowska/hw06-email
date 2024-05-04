import express from 'express'
import cors from "cors"
import router from '#routes/api/users.js'
import logger from 'morgan'
import path from "path"
import { JWTStrategy } from './config/config-passport.js'
import { fileURLToPath } from 'url';
import avatarRouter from '#routes/api/avatars.js'

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs")
app.use(express.static(path.resolve(__dirname, "./public")))

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

JWTStrategy()

app.use('/users', router)
app.use('/public', avatarRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

export default app
