const { use } = require('../Routes/room');
const serviceAccount = require('../key.json');
const admin = require('firebase-admin');

admin.initializeApp( { 
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

const extractKeys = (obj, keys) => {
    return keys.reduce((acc, key) => {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  };


  exports.checkin_public = async (req, res ) =>{

  }

  exports.checkin_private = async (req, res ) => {

  }

  exports.login = async (req, res ) => {

  }

  exports.allevent = async (req, res ) => {
    
  }

  exports.create_event = async (req, res ) => {
    
  }

  exports.edit_event = async (req, res ) => {
    
  }