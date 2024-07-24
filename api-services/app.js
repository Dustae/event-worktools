const express = require('express')
const { readdirSync } = require('fs')
const { swaggerUi , swaggerSpec } = require('./swaggerDoc')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// read routes from /Routes
readdirSync('./Routes').map((r) => app.use('/v1/api', require('./Routes/' + r)))


// (async () => {
//     try {
//         const response = db.collection('event').doc();
//         const doc = await response.get();
//         console.log(doc.data());
//     } catch (error) {
//         console.error(error);
//     }
// })();


const PORT = process.env.PORT || 3000;
app.listen( PORT, () => { 
    console.log(`Server is running on PORT ${PORT}.`);
})