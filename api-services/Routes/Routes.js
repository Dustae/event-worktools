const express = require('express')
const router = express.Router()

const { create_event , allevent , 
        login , register , get_private_list ,
         checkin_public , update_private , edit_event ,
         addpicture , readfile , event_info } = require('../CRUD/crud')

const multer = require('multer');

const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
          fileSize: 5 * 1024 * 1024 // no larger than 5MB
        },
        fileFilter: (req, file, cb) => {
          const fileTypes = /jpeg|jpg|png/;
          const mimeType = fileTypes.test(file.mimetype);
          const extName = fileTypes.test(file.originalname.split('.').pop().toLowerCase());
          if (mimeType && extName) {
            return cb(null, true);
          }
          cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      });

/**
 * Add participant to a public event.
 * @swagger
 * /v1/api/participant/public:
 *   post:
 *     summary: Add participant to a public event.
 *     tags: [Participant]
 *     description: Endpoint to add a participant to a public event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_name:
 *                 type: string
 *                 description: Name of the event.
 *                 example: "Event testetstetste"
 *               name:
 *                 type: string
 *                 description: Participant's first name.
 *                 example: "John"
 *               surname:
 *                 type: string
 *                 description: Participant's last name.
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Participant's email address.
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 description: Participant's phone number.
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: Successful check-in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "checkin success"
 *       400:
 *         description: Missing required fields in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating missing field.
 *                   example: "Missing required field: {field}"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Can not checkin"
 *                 err_note:
 *                   type: string
 *                   description: Error details.
 */
router.post('/participant/public', checkin_public)

/**
 * Retrieve participant details from a private event.
 * @swagger
 * /v1/api/participant/private:
 *   get:
 *     summary: Retrieve participant details from a private event.
 *     tags: [Participant]
 *     description: Endpoint to retrieve participant details from a private event based on specified query parameters.
 *     parameters:
 *       - in: query
 *         name: event_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the private event.
 *         example: "Private Event 2024"
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Participant's first name (optional).
 *         example: "John"
 *       - in: query
 *         name: surname
 *         schema:
 *           type: string
 *         description: Participant's last name (optional).
 *         example: "Doe"
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Participant's email address (optional).
 *         example: "john.doe@example.com"
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: Participant's phone number (optional).
 *         example: "+1234567890"
 *     responses:
 *       200:
 *         description: Successfully retrieved participant details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Create event success"
 *                 participantData:
 *                   type: array
 *                   description: Array of participant objects.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Document ID of the participant.
 *                         example: "abc123"
 *                       event_name:
 *                         type: string
 *                         description: Name of the event.
 *                         example: "Private Event 2024"
 *                       name:
 *                         type: string
 *                         description: Participant's first name.
 *                         example: "John"
 *                       surname:
 *                         type: string
 *                         description: Participant's last name.
 *                         example: "Doe"
 *                       email:
 *                         type: string
 *                         description: Participant's email address.
 *                         example: "john.doe@example.com"
 *                       phone:
 *                         type: string
 *                         description: Participant's phone number.
 *                         example: "+1234567890"
 *       400:
 *         description: Missing required fields in the query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating missing field.
 *                   example: "Missing required field: {field}"
 *       404:
 *         description: Participant information not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Participant information not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Cannot access event detail"
 *                 err_note:
 *                   type: string
 *                   description: Error details.
 */
router.get('/participant/private', get_private_list)

/**
 * Update participant status in a private event.
 * @swagger
 * /v1/api/participant/private:
 *   put:
 *     summary: Update participant status in a private event.
 *     tags: [Participant]
 *     description: Endpoint to update the status of a participant in a private event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Document ID of the participant to update.
 *                 example: "abc123"
 *               event_name:
 *                 type: string
 *                 description: Name of the private event.
 *                 example: "Private Event 2024"
 *     responses:
 *       200:
 *         description: Participant status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "checkin success"
 *       400:
 *         description: Missing required fields in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating missing field.
 *                   example: "Missing required field: {field}"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Can not checkin"
 *                 err_note:
 *                   type: string
 *                   description: Error details.
 */
router.put('/participant/private', update_private)

/**
 * Register a new organization account.
 * @swagger
 * /v1/api/org/register:
 *   post:
 *     summary: Register a new organization account.
 *     tags: [Organizors]
 *     description: Endpoint to register a new organization account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               org_name:
 *                 type: string
 *                 description: Name of the organization.
 *                 example: "Acme Corporation"
 *               org_phone:
 *                 type: string
 *                 description: Phone number of the organization.
 *                 example: "+1234567890"
 *               password:
 *                 type: string
 *                 description: Password for the organization account.
 *                 example: "password123"
 *               username:
 *                 type: string
 *                 description: Unique username for the organization.
 *                 example: "acme123"
 *               org_address:
 *                 type: string
 *                 description: Address of the organization.
 *                 example: "123 Main St, City, Country"
 *               contact_person:
 *                 type: string
 *                 description: Name of the contact person for the organization.
 *                 example: "John Doe"
 *     responses:
 *       200:
 *         description: Organization account registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "register account success"
 *       400:
 *         description: Missing required fields in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating missing field.
 *                   example: "Missing required field: {field}"
 *       409:
 *         description: Conflict due to duplicate username.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating duplicate username.
 *                   example: "Has a duplicated username"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */
router.post('/org/register', register)

/**
 * Log in to an organization account.
 * @swagger
 * /v1/api/org/login:
 *   post:
 *     summary: Log in to an organization account.
 *     tags: [Organizors]
 *     description: Endpoint to log in to an organization account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the organization account.
 *                 example: "acme123"
 *               password:
 *                 type: string
 *                 description: Password of the organization account.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Log in success"
 *                 userInfo:
 *                   type: object
 *                   properties:
 *                     org_name:
 *                       type: string
 *                       description: Name of the organization.
 *                       example: "Acme Corporation"
 *                     org_phone:
 *                       type: string
 *                       description: Phone number of the organization.
 *                       example: "+1234567890"
 *                     org_address:
 *                       type: string
 *                       description: Address of the organization.
 *                       example: "123 Main St, City, Country"
 *                     contact_person:
 *                       type: string
 *                       description: Name of the contact person for the organization.
 *                       example: "John Doe"
 *       400:
 *         description: Missing required fields in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating missing field.
 *                   example: "Missing required field: {field}"
 *       401:
 *         description: Unauthorized due to wrong username or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating incorrect credentials.
 *                   example: "Wrong username or password"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */
router.post('/org/login', login)

/**
 * Retrieve all events associated with an organization.
 * @swagger
 * /v1/api/org/event:
 *   get:
 *     summary: Retrieve all events associated with an organization.
 *     tags: [Events]
 *     description: Endpoint to retrieve all events associated with an organization based on organization ID.
 *     parameters:
 *       - in: query
 *         name: org_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the organization whose events are to be retrieved.
 *         example: "abc123"
 *     responses:
 *       200:
 *         description: Successfully retrieved events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   event_id:
 *                     type: string
 *                     description: ID of the event.
 *                     example: "def456"
 *                   detail:
 *                     type: string
 *                     description: Details of the event.
 *                     example: "Annual Conference"
 *                   event_type:
 *                     type: string
 *                     description: Type of the event.
 *                     example: "Conference"
 *                   location:
 *                     type: string
 *                     description: Location of the event.
 *                     example: "New York, USA"
 *                   bg:
 *                     type: null
 *                     description: Background option for the event (currently null).
 *                   banner:
 *                     type: null
 *                     description: Banner option for the event (currently null).
 *                   option1:
 *                     type: string
 *                     description: Optional data field 1 for the event.
 *                     example: "Option 1"
 *                   option2:
 *                     type: string
 *                     description: Optional data field 2 for the event.
 *                     example: "Option 2"
 *                   option3:
 *                     type: string
 *                     description: Optional data field 3 for the event.
 *                     example: "Option 3"
 *                   option4:
 *                     type: string
 *                     description: Optional data field 4 for the event.
 *                     example: "Option 4"
 *                   option5:
 *                     type: string
 *                     description: Optional data field 5 for the event.
 *                     example: "Option 5"
 *                   option6:
 *                     type: string
 *                     description: Optional data field 6 for the event.
 *                     example: "Option 6"
 *                   option7:
 *                     type: string
 *                     description: Optional data field 7 for the event.
 *                     example: "Option 7"
 *                   option8:
 *                     type: string
 *                     description: Optional data field 8 for the event.
 *                     example: "Option 8"
 *                   option9:
 *                     type: string
 *                     description: Optional data field 9 for the event.
 *                     example: "Option 9"
 *                   option10:
 *                     type: string
 *                     description:
 *                     example: "Option 10"
 *       400:
 *         description: Missing required fields in the query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating missing field.
 *                   example: "Missing required field: {field}"
 *       404:
 *         description: No events found for the provided organization ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "No documents found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Can not get event information"
 *                 err_note:
 *                   type: string
 *                   description: Error details.
 */
router.get('/org/event', allevent)

/**
 * Create a new event for an organization.
 * @swagger
 * /v1/api/org/event:
 *   post:
 *     summary: Create a new event for an organization.
 *     tags: [Events]
 *     description: Endpoint to create a new event for an organization. Supports optional background and banner image uploads.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               detail:
 *                 type: string
 *                 description: Details of the event.
 *                 example: "Annual Conference 2024"
 *               event_type:
 *                 type: string
 *                 description: Type of the event.
 *                 example: "Conference"
 *               location:
 *                 type: string
 *                 description: Location of the event.
 *                 example: "New York, USA"
 *               name:
 *                 type: string
 *                 description: Name of the event (must be unique).
 *                 example: "Annual Conference 2024"
 *               option1:
 *                 type: string
 *                 description: Optional data field 1 for the event.
 *                 example: "Option 1"
 *               option2:
 *                 type: string
 *                 description: Optional data field 2 for the event.
 *                 example: "Option 2"
 *               option3:
 *                 type: string
 *                 description: Optional data field 3 for the event.
 *                 example: "Option 3"
 *               option4:
 *                 type: string
 *                 description: Optional data field 4 for the event.
 *                 example: "Option 4"
 *               option5:
 *                 type: string
 *                 description: Optional data field 5 for the event.
 *                 example: "Option 5"
 *               option6:
 *                 type: string
 *                 description: Optional data field 6 for the event.
 *                 example: "Option 6"
 *               option7:
 *                 type: string
 *                 description: Optional data field 7 for the event.
 *                 example: "Option 7"
 *               option8:
 *                 type: string
 *                 description: Optional data field 8 for the event.
 *                 example: "Option 8"
 *               option9:
 *                 type: string
 *                 description: Optional data field 9 for the event.
 *                 example: "Option 9"
 *               option10:
 *                 type: string
 *                 description: Optional data field 10 for the event.
 *                 example: "Option 10"
 *               org_id:
 *                 type: string
 *                 description: Organizer ID.
 *                 example: "9vg04R6Ays5tLQQYc7Fu"
 *               bg:
 *                 type: string
 *                 format: binary
 *                 description: Optional background image file for the event.
 *               banner:
 *                 type: string
 *                 format: binary
 *                 description: Optional banner image file for the event.
 *     responses:
 *       200:
 *         description: Event created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "create event success"
 *       400:
 *         description: Missing required fields in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating missing field.
 *                   example: "Missing required field: {field}"
 *       409:
 *         description: Conflict due to duplicate event name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating duplicate event name.
 *                   example: "Has a duplicated event name"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Can not create event"
 *                 err_note:
 *                   type: string
 *                   description: Error details.
 */
router.post('/org/event', upload.fields([{ name: 'bg', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), create_event)

/**
 * Edit an existing event details.
 * @swagger
 * /v1/api/org/event:
 *   put:
 *     summary: Edit an existing event details.
 *     tags: [Events]
 *     description: Endpoint to edit details of an existing event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: string
 *                 description: ID of the event to be edited.
 *                 example: "abc123"
 *               detail:
 *                 type: string
 *                 description: Updated details of the event.
 *                 example: "Updated Conference details"
 *               event_type:
 *                 type: string
 *                 description: Updated type of the event.
 *                 example: "Conference"
 *               location:
 *                 type: string
 *                 description: Updated location of the event.
 *                 example: "New York, USA"
 *               bg:
 *                 type: string
 *                 description: Updated background option for the event.
 *                 example: "Updated background"
 *               banner:
 *                 type: string
 *                 description: Updated banner option for the event.
 *                 example: "Updated banner"
 *               option1:
 *                 type: string
 *                 description: Updated optional data field 1 for the event.
 *                 example: "Updated Option 1"
 *               option2:
 *                 type: string
 *                 description: Updated optional data field 2 for the event.
 *                 example: "Updated Option 2"
 *               option3:
 *                 type: string
 *                 description: Updated optional data field 3 for the event.
 *                 example: "Updated Option 3"
 *               option4:
 *                 type: string
 *                 description: Updated optional data field 4 for the event.
 *                 example: "Updated Option 4"
 *               option5:
 *                 type: string
 *                 description: Updated optional data field 5 for the event.
 *                 example: "Updated Option 5"
 *               option6:
 *                 type: string
 *                 description: Updated optional data field 6 for the event.
 *                 example: "Updated Option 6"
 *               option7:
 *                 type: string
 *                 description: Updated optional data field 7 for the event.
 *                 example: "Updated Option 7"
 *               option8:
 *                 type: string
 *                 description: Updated optional data field 8 for the event.
 *                 example: "Updated Option 8"
 *               option9:
 *                 type: string
 *                 description: Updated optional data field 9 for the event.
 *                 example: "Updated Option 9"
 *               option10:
 *                 type: string
 *                 description: Updated optional data field 10 for the event.
 *                 example: "Updated Option 10"
 *     responses:
 *       200:
 *         description: Event details updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "update event success"
 *       400:
 *         description: Missing required fields in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating missing field.
 *                   example: "Missing required field: {field}"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Can not update event"
 *                 err_note:
 *                   type: string
 *                   description: Error details.
 */
router.put('/org/event', edit_event)

/**
 * @swagger
 * /v1/api/storage/upload:
 *   post:
 *     summary: Upload a picture
 *     description: Uploads a picture file to Firebase Cloud Storage.
 *     tags:
 *       - Storage
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully uploaded the file.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fileName:
 *                   type: string
 *                 fileLocation:
 *                   type: string
 *       400:
 *         description: No file uploaded.
 *       500:
 *         description: Internal server error.
 */
router.post('/storage/upload', upload.single('file'), addpicture);

/**
 * @swagger
 * /v1/api/storage/read:
 *   get:
 *     summary: Read a picture
 *     description: Reads a picture file from Firebase Cloud Storage.
 *     tags:
 *       - Storage
 *     parameters:
 *       - in: query
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the file to read.
 *     responses:
 *       200:
 *         description: Successfully read the file.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       404:
 *         description: File not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/storage/read', readfile);

/**
 * @swagger
 * /v1/api/org/single_event:
 *   get:
 *     summary: Retrieve event information
 *     description: Fetches details of a single event based on the event name.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: query
 *         name: event_name
 *         required: true
 *         description: The name of the event to retrieve information for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   event_id:
 *                     type: string
 *                     description: ID of the event.
 *                     example: "def456"
 *                   detail:
 *                     type: string
 *                     description: Details of the event.
 *                     example: "Annual Conference"
 *                   event_type:
 *                     type: string
 *                     description: Type of the event.
 *                     example: "Conference"
 *                   location:
 *                     type: string
 *                     description: Location of the event.
 *                     example: "New York, USA"
 *                   bg:
 *                     type: null
 *                     description: Background option for the event (currently null).
 *                   banner:
 *                     type: null
 *                     description: Banner option for the event (currently null).
 *                   option1:
 *                     type: string
 *                     description: Optional data field 1 for the event.
 *                     example: "Option 1"
 *                   option2:
 *                     type: string
 *                     description: Optional data field 2 for the event.
 *                     example: "Option 2"
 *                   option3:
 *                     type: string
 *                     description: Optional data field 3 for the event.
 *                     example: "Option 3"
 *                   option4:
 *                     type: string
 *                     description: Optional data field 4 for the event.
 *                     example: "Option 4"
 *                   option5:
 *                     type: string
 *                     description: Optional data field 5 for the event.
 *                     example: "Option 5"
 *                   option6:
 *                     type: string
 *                     description: Optional data field 6 for the event.
 *                     example: "Option 6"
 *                   option7:
 *                     type: string
 *                     description: Optional data field 7 for the event.
 *                     example: "Option 7"
 *                   option8:
 *                     type: string
 *                     description: Optional data field 8 for the event.
 *                     example: "Option 8"
 *                   option9:
 *                     type: string
 *                     description: Optional data field 9 for the event.
 *                     example: "Option 9"
 *                   option10:
 *                     type: string
 *                     description:
 *                     example: "Option 10"
 *       400:
 *         description: Missing required field
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required field: event_name"
 *       404:
 *         description: Event information not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: event information not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cannot access event detail
 *                 err_note:
 *                   type: string
 *                   example: Detailed error message
 */
router.get('/org/single_event', event_info);


router.use((err, req, res, next) => {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          next();
        }
      });

module.exports = router