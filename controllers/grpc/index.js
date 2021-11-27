require('dotenv').config();
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_FILE = 'dms.proto'

/**
 * @description gPRC connect with Express
 * @param {object} protofile = protofile will contain PROTO_FILE.
 * @external grpc
 * @author Vijayakumar
 */
const packageDefinition = protoLoader.loadSync(PROTO_FILE, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const dmsPackageDefinition = grpc.loadPackageDefinition(packageDefinition).dmsPackage;
const client = new dmsPackageDefinition.DocumentManagement(
  `localhost:${process.env.gPRC_PORT}`,
  grpc.credentials.createInsecure(),
);

/**
 * @description Register user
 * @param {object} req - req object will contain tenantId, name, email and password.
 * @param {object} return - Success (or) Error response
 * @returns {object}
 */
const register = (req, res) => {
  client.register(req.body, (error, result) => {
    if (!error) {
      res.status(201).json(result);
    } else {
      res.status(400).json(error);
    }
  });
};

/**
 * @description Login user
 * @param {object} req - req object will email and password.
 * @param {object} return - Valid user (or) User not found
 * @returns {object}
 */
const login = (req, res) => {
  client.login(req.body, (error, result) => {
    if (!error) {
      res.status(201).json(result);
    } else {
      res.status(400).json(error);
    }
  });
};

/**
 * @description Create document
 * @param {object} req - req object will contain tenentId, owner, parent, documentType and documentName.
 * @param {object} return - Document created (or) Error response
 * @returns {object}
 */
const createDocument = (req, res) => {
  req.body.tenantId = req.tenantId;
  req.body.owner = req.owner;

  client.createDocument(req.body, (error, result) => {
    if (!error) {
      res.status(201).json(result);
    } else {
      res.status(400).json(error);
    }
  });
};


/**
 * @description Get document list
 * @param {object} req - req object will contain tenentId, owner, parent.
 * @param {object} return - Get document (or) Error response
 * @returns {object}
 */
const getList = (req, res) => {
  const reqObj = {
    tenantId: req.tenantId,
    owner: req.owner,
  }
  if (req.query && req.query.parent) {
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


/**
 * @description Update document
 * @param {object} req - req object will contain tenentId, owner, documentId, documentName, and content.
 * @param {object} return - Update document (or) Error response
 * @returns {object}
 */
const updateDocuments = (req, res) => {
  const reqObj = {
    tenantId: req.tenantId,
    owner: req.owner,
    documentId: req.params.documentId,
    documentName: req.body.documentName,
    content: req.body.content
  }
  client.updateDocuments(reqObj, (error, result) => {

    if (!error) {
      res.status(201).json(result);
    } else {
      res.status(400).json(error);
    }
  });
};


/**
 * @description Remove document
 * @param {object} req - req object will contain tenentId, owner, documentId.
 * @param {object} return - Remove document (or) Error response
 * @returns {object}
 */
const removeDocument = (req, res) => {
  const reqObj = {
    tenantId: req.tenantId,
    owner: req.owner,
    documentId: req.params.documentId
  }
  client.removeDocument(reqObj, (error, result) => {
    if (!error) {
      res.status(201).json(result);
    } else {
      res.status(400).json(error);
    }
  });
};


/**
 * @description Move document
 * @param {object} req - req object will contain tenentId, owner, documentId and parent.
 * @param {object} return - Move document (or) Error response
 * @returns {object}
 */
const moveDocuments = (req, res) => {
  const reqObj = {
    tenantId: req.tenantId,
    owner: req.owner,
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