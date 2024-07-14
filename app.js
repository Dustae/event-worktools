const express = require('express')
const app = express()
const { readdirSync } = require('fs')

const serviceAccount = require('./key.json');
const admin = require('firebase-admin');

admin.initializeApp( { 
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

// const extractKeys = (obj, keys) => {
//     return keys.reduce((acc, key) => {
//       if (obj.hasOwnProperty(key)) {
//         acc[key] = obj[key];
//       }
//       return acc;
//     }, {});
//   };



// read routes from /Routes
readdirSync('./Routes').map((r) => app.use('/api', require('./Routes/' + r)))


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