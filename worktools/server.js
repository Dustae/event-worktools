const admin = require('firebase-admin');
const serviceAccount = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Now you can use Firebase Admin SDK
// Example: Access Firestore
const db = admin.firestore();

// Example: Create an Express server
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/register', async (req, res) => {
  const { firstName, lastName, phoneNumber, email } = req.body;

  try {
    // Save data to Firestore
    await db.collection('users').add({
      firstName,
      lastName,
      phoneNumber,
      email
    });
    
    res.status(200).send('User registered successfully!');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
