/* 
  Corbel token verifier 
*/
var decoder = require('./src/tokenDecoder');
var TYPE_REFRESH_TOKEN = 'REFRESH'

function verifier(token){
  token = token ? token.replace('Bearer ', '') : null;

  if(!token){
    return false; 
  }
  
  var decoded = decoder(token);
  
  if(!decoded){
    return false;
  } else {
    return new TokenObject(token, decoded);
  }
}

function TokenObject(token, decoded){
  this.token = token;
  this.decoded = decoded;
}

TokenObject.prototype.getInfo = function(){
  return this.decoded.info;
}

TokenObject.prototype.getSignature = function(){
  return this.decoded.signature;
}

TokenObject.prototype.getExpire = function(){
  return this.decoded.expire;
}

TokenObject.prototype.getExpireTime = function(){
  return this.getInfo().state
}

TokenObject.prototype.hasExpired = function(){
  return this.getExpireTime() < Date.now()
}

TokenObject.prototype.isUser = function(){
  return this.getInfo().hasOwnProperty('userId')
}

TokenObject.prototype.isClient = function(){
  return !this.isUser() && this.getInfo().hasOwnProperty('clientId')
}

TokenObject.prototype.getUserId = function(){
  return this.getInfo().userId
}

TokenObject.prototype.getClientId = function(){
  return this.getInfo().clientId
}

TokenObject.prototype.getDeviceId = function(){
  return this.getInfo().deviceId
}

TokenObject.prototype.getDomainId = function(){
  return this.getInfo().domainId
}

TokenObject.prototype.getToken = function(){
  return this.token;
}

TokenObject.prototype.isRefreshToken = function(){
  return this.getInfo().type === TYPE_REFRESH_TOKEN
}

module.exports = verifier