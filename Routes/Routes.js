const express = require('express')
const router = express.Router()

const { create_event , allevent , login , register } = require('../CRUD/crud')

// end user PUBLIC checkin
router.post('/checkin_public', )

// end user PRIVATE checkin
router.get('/checkin_private', )

// update status for private guest
router.put('/update_private',)

// company register
router.post('/register', register)

// company login
router.post('/login', login)

// get company data 
router.get('/allevent', allevent)

// create new event
router.post('/create_event', create_event)

// edit event data
router.put('/edit_event', )




module.exports = router