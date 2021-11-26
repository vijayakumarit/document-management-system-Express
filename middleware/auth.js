const jwt = require('jsonwebtoken');
const asyncMiddleware = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const { request } = require('express');

// Protect routes
exports.protect = asyncMiddleware(async (req, res, next) => {
  let token;
  const JWT_SECRET = "gRPCchecking";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
    // Set token from cookie
  }
 
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.owner = decoded.id;
    req.tenantId = decoded.tenantId;

console.log("JWT DECODE", decoded)

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

