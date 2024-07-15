const express = require('express')
const router = express.Router()

const { create_event , allevent } = require('../CRUD/crud')

// end user PUBLIC checkin
router.post('/checkin_public', )

// end user PRIVATE checkin
router.get('/checkin_private', )

router.put('/update_private',)

// company register
router.post('/register', )

// company login
router.get('/login', )

// get company data 
router.get('/allevent', allevent)

// create new event
router.post('/create_event', create_event)

// edit event data
router.put('/edit_event', )




module.exports = router