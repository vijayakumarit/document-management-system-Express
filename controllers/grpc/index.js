const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_FILE = '/Users/mohankarthikeyan/Desktop/document-management-system-gRPC/dms.proto'


const packageDefinition = protoLoader.loadSync(PROTO_FILE, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const dmsPackageDefinition = grpc.loadPackageDefinition(packageDefinition).dmsPackage;

const client = new dmsPackageDefinition.DocumentManagement(
    'localhost:50051',
    grpc.credentials.createInsecure(),
);

//Desc Register a new User
//Method POST /api/v1/auth/register
//Access public


const register = (req, res) => {
  console.log("REQBODY",req.body)
  client.register(req.body, (error, todo) => {
      if (!error) {
          res.status(201).json(todo);
      } else {
          res.status(400).json(error);
      }
  });
};

module.exports = {
  register
}