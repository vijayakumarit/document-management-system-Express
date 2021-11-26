const express = require('express');
const grpcController = require('../controllers/grpc');
const {protect} = require('../middleware/auth')

const router = express.Router();


router.post('/register', grpcController.register);
router.post('/login', grpcController.login);
router.post('/createDocument',protect,grpcController.createDocument);
router.get('/getList',protect,grpcController.getList)
router.put('/updateDocument/:documentId',protect,grpcController.updateDocuments);
router.delete('/removeDocument/:documentId',protect,grpcController.removeDocument);
router.put('/moveDocuments/:documentId',protect,grpcController.moveDocuments)


module.exports = router;