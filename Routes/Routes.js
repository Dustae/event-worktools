const express = require('express')
const router = express.Router()

const { create_event , allevent , 
        login , register , checkin_private ,
         checkin_public , update_private } = require('../CRUD/crud')

// end user PUBLIC checkin
router.post('/checkin_public', checkin_public)

// end user PRIVATE g
router.get('/checkin_private', checkin_private)

// update status for private guest
router.put('/update_private', update_private)

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

// import participant data




module.exports = router