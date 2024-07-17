const express = require('express')
const app = express()
const PORT = 3001

const { typeError }= require('./middlewares/errors')
const { dbConnection } = require('./config/config')

app.use(express.json())


app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))

app.use(typeError)


dbConnection()

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))