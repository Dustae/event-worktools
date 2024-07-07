const express = require('express')
const app = express()
const { readdirSync } = require('fs')


// read routes from /Routes
readdirSync('./Routes').map((r) => app.use('/api', require('./Routes/' + r)))




const PORT = process.env.PORT || 8080;
app.listen( PORT, () => { 
    console.log(`Server is running on PORT ${PORT}.`);
})