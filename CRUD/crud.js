const { use } = require('../Routes/Routes');
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
    // const { param1, param2 } = req.query;

    // // Do something with the parameters
    // console.log('Param1:', param1);
    // console.log('Param2:', param2);

    // // Send a response
    // res.send('Parameters received');
  }

  exports.checkin_private = async (req, res ) => {

  }

  exports.login = async (req, res ) => {

  }

  exports.allevent = async (req, res ) => {
    
  }

  exports.create_event = async (req, res ) => {
    try{

      const requiredFields = [
        'detail', 
        'event_type', 
        'location',
        'name',
        'option1',
        'option2',
        'option3',
        'option4',
        'option5',
        'option6',
        'option7',
        'option8',
        'option9',
        'option10'
      ];
  
      for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({
                message: `Missing required field: ${field}`,
                status: 'error',
            });
        }
      }

      const checkEventName = await db.collection('event').doc(req.body.name).get();
          
          if( checkEventName.exists ) { 
              res.status(409).json( { 
                  message: 'Has a duplicated event name', 
                  status: 'error'});
          }
  
          // no booking at that time 
          else {
            eventData = {
              detail : req.body.detail,
              event_type : req.body.event_type,
              location : req.body.location,
              bg : null,
              banner: null,
              option1 : req.body.option1,
              option2 : req.body.option2,
              option3 : req.body.option3,
              option4 : req.body.option4,
              option5 : req.body.option5,
              option6 : req.body.option6,
              option7 : req.body.option7,
              option8 : req.body.option8,
              option9 : req.body.option9,
              option10 : req.body.option10
            }
  
            const response = await db.collection('event').doc(req.body.name).set(eventData);
  
            res.status(200).json( { message: 'Resrevation success', status: 'success'});
          }

    } catch(error) {
      res.status(500).json( { message: 'Can not create event', status: 'error', err_note: error.message});
    }
    

    
  }

  exports.edit_event = async (req, res ) => {
    
  }