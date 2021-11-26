const express = require('express');
const grpcController = require('../controllers/grpc');


const router = express.Router();


router.post('/register', grpcController.register);


module.exports = router;