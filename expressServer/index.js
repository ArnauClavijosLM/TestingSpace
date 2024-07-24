const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { ConnectDB, CloseDB, connectDB } = require('./database/database')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const publicRouter = require('./routes/public')
const privateRouter = require('./routes/private')
const graphqlRouter = require('./routes/graphql')

app.use('/api', publicRouter)
app.use('/api', privateRouter)
app.use('/graphql', graphqlRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    console.log(`GraphQL server ready at http://localhost:${port}/api`)
})
