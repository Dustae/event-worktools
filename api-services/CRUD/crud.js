const { use } = require('../Routes/Routes');
// const serviceAccount = require('../key.json');
const admin = require('firebase-admin');
const crypto = require('crypto');
require('dotenv').config();

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

const multer = require('multer');

admin.initializeApp( { 
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'organizer-web-tstone.appspot.com'
})

const db = admin.firestore();

const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: serviceAccount.project_id,
  credentials: {
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key
  }
});
const bucket = storage.bucket(admin.storage().bucket().name);


const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});


function hashData(data) {
  return crypto.createHash('sha512').update(data).digest('hex');
}


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

      const EventDoc =  (await db.collection('event').where('name','==',event_name).get()).docs[0].ref;
      const response = await EventDoc.collection('participant').add(userInput);

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
      const EventDoc =  (await db.collection('event').where('name','==',req.query.event_name).get()).docs[0].ref;
  
      if (req.query.name) {
        searchParticipant = await EventDoc
          .collection('participant').where('name', '==', req.query.name).get();
      } else if (req.query.surname) {
        searchParticipant = await EventDoc
          .collection('participant').where('surname', '==', req.query.surname).get();
      } else if (req.query.phone) {
        searchParticipant = await EventDoc
          .collection('participant').where('phone', '==', req.query.phone).get();
      } else if (req.query.email) {
        searchParticipant = await EventDoc
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
        message: 'Get infomation success',
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

      const EventDoc =  (await db.collection('event').where('name','==',req.body.event_name).get()).docs[0].ref;

      const updateStatus = EventDoc
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
        let Docid;
        checkLogin.forEach(doc => {
            userData = doc.data();
            Docid = doc.id;
        });
        
        const userInfo = {
            "org_name": userData.org_name,
            "org_phone": userData.org_phone,
            "org_address": userData.org_address,
            "contact_person": userData.contact_person,
            "org_id": Docid
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

        // const orgRef = db.doc(`organizor/${req.query.org_id}`);

        const response = await db.collection('event').where('org_id', '==', req.query.org_id).get();

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
            nmae: event.name,
            bg: event.bg ? event.bg : null,
            banner: event.banner ? event.banner : null,
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
        'option10',
        'org_id'
      ];
  
      for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({
                message: `Missing required field: ${field}`
            });
        }
      }

      const checkEventName = await db.collection('event').where('name', '==', req.body.name).get();
          
      if( checkEventName.exists ) { 
          return res.status(409).json( { 
              message: 'Has a duplicated event name'});
      }

      let bgUrl = null;
      let bannerUrl = null;
  
      if (req.files && req.files.bg) {
        const bgFile = req.files.bg[0];
        const bgBlob = bucket.file(bgFile.originalname);
        const bgBlobStream = bgBlob.createWriteStream({
          metadata: {
            contentType: bgFile.mimetype
          }
        });
  
        bgUrl = await new Promise((resolve, reject) => {
          bgBlobStream.on('error', reject);
          bgBlobStream.on('finish', () => {
            const publicUrl = `${bgBlob.name}`;
            resolve(publicUrl);
          });
          bgBlobStream.end(bgFile.buffer);
        });
      }
  
      if (req.files && req.files.banner) {
        const bannerFile = req.files.banner[0];
        const bannerBlob = bucket.file(bannerFile.originalname);
        const bannerBlobStream = bannerBlob.createWriteStream({
          metadata: {
            contentType: bannerFile.mimetype
          }
        });
  
        bannerUrl = await new Promise((resolve, reject) => {
          bannerBlobStream.on('error', reject);
          bannerBlobStream.on('finish', () => {
            const publicUrl = `${bannerBlob.name}`;
            resolve(publicUrl);
          });
          bannerBlobStream.end(bannerFile.buffer);
        });
      }

      // no booking at that time 
        eventData = {
          name : req.body.name,
          detail : req.body.detail,
          event_type : req.body.event_type,
          location : req.body.location,
          bg : bgUrl,
          banner: bannerUrl,
          option1 : req.body.option1,
          option2 : req.body.option2,
          option3 : req.body.option3,
          option4 : req.body.option4,
          option5 : req.body.option5,
          option6 : req.body.option6,
          option7 : req.body.option7,
          option8 : req.body.option8,
          option9 : req.body.option9,
          option10 : req.body.option10,
          org_id : req.body.org_id
        }

        const response = await db.collection('event').doc().set(eventData);

        res.status(200).json( { message: 'create event success'});

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

  exports.addpicture = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
  
      const blob = bucket.file(req.file.originalname);

      const [exists] = await blob.exists();
      if (exists) {
        return res.status(400).send('File already exists. Choose a different name.');
      }

      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype
        }
      });
  
      blobStream.on('error', (err) => {
        res.status(500).send({ error: err.message });
      });
  
      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        res.status(200).send({ fileName: req.file.originalname, fileLocation: publicUrl });
      });
  
      blobStream.end(req.file.buffer);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  
  exports.readfile = async (req, res) => {
    try {
      const fileName = req.query.filename;
      console.log(fileName);
      if (!fileName) {
        return res.status(400).send('Filename query parameter is required.');
      }
  
      const file = bucket.file(fileName);
      const [exists] = await file.exists();
  
      if (!exists) {
        console.log('File does not exist.');
        return res.status(404).send('File not found');
      }
  
    await file.makePublic();
    const url = file.publicUrl();
      
      res.status(200).send( url );
    } catch (error) {
      console.error('Error reading file', error);
      res.status(500).send({ error: error.message });
    }
  };

  exports.event_info = async (req, res) => {
    try {
      const requiredFields = ['event_name'];
  
      for (const field of requiredFields) {
        if (!req.query[field]) {
          return res.status(400).json({
            message: `Missing required field: ${field}`
          });
        }
      }
  
      event_info = await db.collection('event').where('name', '==', req.query.event_name).get();
  
      if (event_info.empty) {
        return res.status(404).json({
          message: "event information not found"
        });
      }
  
      let eventData = [];
      event_info.forEach(doc => {
        eventData.push({
          id: doc.id,
          ...doc.data()
        });
      });
  
      res.status(200).json({
        message: 'get event success',
        eventData
      });
    } catch (error) {
      res.status(500).json({
        message: 'Cannot access event detail',
        err_note: error.message
      });
    }
  };
