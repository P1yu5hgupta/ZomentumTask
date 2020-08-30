const express = require('express');
const router = express.Router();

const { bookTickets } = require('../controllers/bookTicket');
const { viewUser } = require('../controllers/viewUser');
const { viewTickets } = require('../controllers/viewTickets');
const { deleteTicket } = require('../controllers/deleteTicket');
const { updateTicket } = require('../controllers/updateTicket');

router.post('/book', bookTickets ); // for booking the ticket

router.post('/viewUser', viewUser ); // for viewing the user's details based on ticket ID

router.post('/viewTickets', viewTickets ); //  for viewing the tickets of any particular time

router.post('/delete', deleteTicket ); //  cancelling/deleting the ticket 

router.post('/update', updateTicket ); // to update any particular ticket timing

module.exports = router;
