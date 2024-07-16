const { use } = require('../Routes/Routes');
const serviceAccount = require('../key.json');
const admin = require('firebase-admin');
const crypto = require('crypto');

function hashData(data) {
  return crypto.createHash('sha512').update(data).digest('hex');
}

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
    try{
      const requiredFields = [
        'event_name',
        'name',
        'surname',
        'email',
        'phone',
      ];

      for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({
                message: `Missing required field: ${field}`
            });
        }
      }

      let userInput = req.body;
      const event_name = req.body.event_name;
      delete userInput.event_name;

      const response = db.collection('event').doc(event_name).collection('participant').add(userInput);

      res.status(200).json( { message: 'checkin success'});
    }catch(error){

      res.status(500).json( { message: 'Can not checkin', err_note: error.message});

    }
  }

  exports.get_private_list = async (req, res) => {
    try {
      const requiredFields = ['event_name'];
  
      for (const field of requiredFields) {
        if (!req.query[field]) {
          return res.status(400).json({
            message: `Missing required field: ${field}`
          });
        }
      }
  
      let searchParticipant;
  
      if (req.query.name) {
        searchParticipant = await db.collection('event').doc(req.query.event_name)
          .collection('participant').where('name', '==', req.query.name).get();
      } else if (req.query.surname) {
        searchParticipant = await db.collection('event').doc(req.query.event_name)
          .collection('participant').where('surname', '==', req.query.surname).get();
      } else if (req.query.phone) {
        searchParticipant = await db.collection('event').doc(req.query.event_name)
          .collection('participant').where('phone', '==', req.query.phone).get();
      } else if (req.query.email) {
        searchParticipant = await db.collection('event').doc(req.query.event_name)
          .collection('participant').where('email', '==', req.query.email).get();
      }
  
      if (searchParticipant.empty) {
        return res.status(404).json({
          message: "Participant information not found"
        });
      }
  
      let participantData = [];
      searchParticipant.forEach(doc => {
        participantData.push({
          id: doc.id,
          ...doc.data()
        });
      });
  
      res.status(200).json({
        message: 'Create event success',
        participantData
      });
    } catch (error) {
      res.status(500).json({
        message: 'Cannot access event detail',
        err_note: error.message
      });
    }
  };

  exports.update_private = async (req, res ) => {
    try{
      const requiredFields = [
        'id',
        'event_name'
      ];

      for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({
                message: `Missing required field: ${field}`
            });
        }
      }

      const updateStatus = db.collection('event').doc(req.body.event_name)
                              .collection('participant').doc(req.body.id).update({status: 'checked-in'})

      res.status(200).json( { message: 'checkin success'});

    }catch(error){
      res.status(500).json( { message: 'Can not checkin', err_note: error.message});
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
              message: `Missing required field: ${field}`
          });
      }
    }

    const checkUsername = await db.collection('organizor').where('username', "==", req.body.username).get();
          
    if( !checkUsername.empty ) { 
        return res.status(409).json( { 
            message: 'Has a duplicated username'
          });
    }

    const userData = {
      'org_name': req.body.org_name,
      'org_phone':  req.body.org_phone,
      'password':  hashData(req.body.password),
      'username':  req.body.username,
      'org_address':  req.body.org_address,
      'contact_person':  req.body.contact_person 
    }

    const response = await db.collection('organizor').add(userData);
  
    res.status(200).json( { message: 'register account success'});
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
                message: `Missing required field: ${field}`
            });
        }
      }

      const checkLogin = await db.collection('organizor').where("username","==",req.body.username)
                                                         .where("password","==",hashData(req.body.password)).get();
                                              
      
      if( checkLogin.empty ) { 
        return res.status(401).json( { 
            message: "Wrong username or password"});
        }

        let userData;
        checkLogin.forEach(doc => {
            userData = doc.data();
        });
        
        const userInfo = {
            "org_name": userData.org_name,
            "org_phone": userData.org_phone,
            "org_address": userData.org_address,
            "contact_person": userData.contact_person
        };
        

      res.status(200).json( { message: 'Log in success', userInfo});
    }catch(error){

    }
  }

  exports.allevent = async (req, res) => {
    try {
        const requiredFields = [
            'org_id'
        ];

        for (const field of requiredFields) {
            if (!req.query[field]) {
                return res.status(400).json({
                    message: `Missing required field: ${field}`
                });
            }
        }

        const orgRef = db.doc(`organizor/${req.query.org_id}`);

        const response = await db.collection('event').where('org_id', '==', orgRef).get();

        if (response.empty) {
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

    } catch (error) {
        res.status(500).json({ message: 'Can not get event information', err_note: error.message });
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
                message: `Missing required field: ${field}`
            });
        }
      }

      const checkEventName = await db.collection('event').doc(req.body.name).get();
          
          if( checkEventName.exists ) { 
              res.status(409).json( { 
                  message: 'Has a duplicated event name'});
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
  
            res.status(200).json( { message: 'create event success'});
          }

    } catch(error) {
      res.status(500).json( { message: 'Can not create event', err_note: error.message});
    }
    

    
  }

  exports.edit_event = async (req, res ) => {
    try{
      const updates = {};
      const fields = [
        'detail',
        'event_type',
        'location',
        'bg',
        'banner',
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

      
      fields.forEach(field => {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field];
        }
      });

      await db.collection('event').doc(req.body.event_id).update(updates);

      res.status(200).json( { message: 'update event success'});
    }catch(error){
      res.status(500).json( { message: 'Can not update event', err_note: error.message});
    }
  }