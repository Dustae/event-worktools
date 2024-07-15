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
    try{

    }catch(error){

    }
  }

  exports.register = async (req, res ) => {
    const requiredFields = [
      'org_name',
      'org_phone',
      'password',
      'username',
      'org_address',
      'contact_person'
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
          return res.status(400).json({
              message: `Missing required field: ${field}`,
              status: 'error',
          });
      }
    }

    const checkUsername = await db.collection('organizor').where('username', "==", req.body.username).get();
          
    if( checkUsername.exists ) { 
        return res.status(409).json( { 
            message: 'Has a duplicated username', 
            status: 'error'});
    }

    const userData = {
      'org_name': req.body.org_name,
      'org_phone':  req.body.org_phone,
      'password':  req.body.password,
      'username':  req.body.username,
      'org_address':  req.body.org_address,
      'contact_person':  req.body.contact_person 
    }

    const response = await db.collection('organizor').add(userData);
  
    res.status(200).json( { message: 'register account success', status: 'success'});
  }

  exports.login = async (req, res ) => {
    try{
      const requiredFields = [
        'username',
        'password'
      ];
  
      for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({
                message: `Missing required field: ${field}`,
                status: 'error',
            });
        }
      }

      if (authenticateUser(username, password)) {
        res.status(200).json({ message: 'Login successful', token: generateToken(username) });
      } else {
          res.status(401).json({ message: 'Invalid username or password' });
      }

    }catch(error){

    }
  }

  exports.allevent = async (req, res ) => {

    try{
      const requiredFields = [
        'org_id'
      ];
  
      for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({
                message: `Missing required field: ${field}`,
                status: 'error',
            });
        }
      }

      const orgRef = db.doc(`organizor/${req.body.org_id}`);

      const response = await db.collection('event').where('org_id', '==', orgRef).get();

      if( response.empty){
        return res.status(404).send('No documents found.');
      }
      let events = [];
      response.forEach(doc => {
        events.push({
          id: doc.id,
          ...doc.data()
        });
      });

      // Create JSON data from the retrieved documents
      const jsonData = events.map(event => ({
        event_id: event.id,
        detail: event.detail,
        event_type: event.event_type,
        location: event.location,
        bg: event.bg ? null : null, 
        banner: event.banner ? null : null, 
        option1: event.option1,
        option2: event.option2,
        option3: event.option3,
        option4: event.option4,
        option5: event.option5,
        option6: event.option6,
        option7: event.option7,
        option8: event.option8,
        option9: event.option9,
        option10: event.option10
      }));

      res.status(200).send(jsonData);

    }catch(error){
      res.status(500).json( { message: 'Can not get event infomation', status: 'error', err_note: error.message});
    }

    
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
  
            res.status(200).json( { message: 'create event success', status: 'success'});
          }

    } catch(error) {
      res.status(500).json( { message: 'Can not create event', status: 'error', err_note: error.message});
    }
    

    
  }

  exports.edit_event = async (req, res ) => {
    
  }