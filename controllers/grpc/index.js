const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_FILE = 'dms.proto'


const packageDefinition = protoLoader.loadSync(PROTO_FILE, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const dmsPackageDefinition = grpc.loadPackageDefinition(packageDefinition).dmsPackage;

const client = new dmsPackageDefinition.DocumentManagement(
    'localhost:50055',
    grpc.credentials.createInsecure(),
);

//Desc Register a new User

const register = (req, res) => {
  client.register(req.body, (error, result) => {
      if (!error) {
          res.status(201).json(result);
      } else {
          res.status(400).json(error);
      }
  });
};

//Login
const login = (req, res) => {
  client.login(req.body, (error, result) => {
  
      if (!error) {
          res.status(201).json(result);
      } else {
          res.status(400).json(error);
      }
  });
};

// Create a Document
const createDocument = (req, res) => {
 
  req.body.owner = req.owner;
  req.body.tenantId = req.tenantId;
  client.createDocument(req.body, (error, result) => {
  //console.log("AFTER GRPC Result", result)
      if (!error) {
          res.status(201).json(result);
      } else {
          res.status(400).json(error);
      }
  });
};


const getList = (req, res) => {
  const reqObj = {
    owner: req.owner,
    tenantId: req.tenantId
  }
  if(req.query && req.query.parent){
    reqObj.parent = req.query.parent
  }
  client.getList(reqObj, (error, result) => {
 
      if (!error) {
          res.status(201).json(result);
      } else {
          res.status(400).json(error);
      }
  });
};

const updateDocuments = (req, res) => {
  const reqObj = {
    documentId: req.params.documentId,
    documentName: req.body.documentName,
    content: req.body.documentName
  }
  client.updateDocuments(reqObj, (error, result) => {
 
      if (!error) {
          res.status(201).json(result);
      } else {
          res.status(400).json(error);
      }
  });
};

const removeDocument = (req, res) => {
  const reqObj = {
    documentId: req.params.documentId
  }
  console.log("Req Data", reqObj)
  client.removeDocument(reqObj, (error, result) => {
  console.log("GET Result", result)
      if (!error) {
          res.status(201).json(result);
      } else {
          res.status(400).json(error);
      }
  });
};

//Move Documents
const moveDocuments = (req, res) => {
  const reqObj = {
    documentId: req.params.documentId,
    parent: req.body.parent,
    
  }
  client.moveDocuments(reqObj, (error, result) => {
 
      if (!error) {
          res.status(201).json(result);
      } else {
          res.status(400).json(error);
      }
  });
};


module.exports = {
  register,
  login,
  createDocument,
  getList,
  updateDocuments,
  removeDocument,
  moveDocuments
}